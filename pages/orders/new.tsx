import { useState } from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createOrder from "app/orders/mutations/createOrder"
import { OrderForm, FORM_ERROR } from "app/orders/components/OrderForm"
import SidebarLayout from "app/core/layouts/SidebarLayout"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material"
import { BoxCenter } from "app/core/components/BoxCenter"
import { ArrowForwardTwoTone } from "@mui/icons-material"
import EditIcon from "@mui/icons-material/Edit"
import ClearIcon from "@mui/icons-material/Clear"
import { formatScaledPriceToPtBr } from "app/core/utils/formatScaledPriceToPtBr"
import { mockedProducts } from "app/orders/mockedProducts"
import { v4 } from "uuid"

function NewOrderPage(): JSX.Element {
  const router = useRouter()
  const [createOrderMutation] = useMutation(createOrder)
  const productsList = mockedProducts
  const [selectedProducts, setSelectedProducts] = useState<Array<any>>([])
  const filteredProductsList = selectedProducts
  //console.log(selectedProducts)

  function addSelectedProduct(info: any) {
    //const generateUUid = uuid()
    console.log(v4())

    setSelectedProducts((oldArray: any) => [...oldArray, { uuid: v4(), ...info }])
  }

  function removeSelectedProduct(itemUuid: string) {
    setSelectedProducts((prevState: any) => {
      return prevState.filter((data) => data.uuid != itemUuid)
    })
  }

  function ProductCard({ info }: any) {
    const { name, amount, extraItems, observations } = info
    return (
      <Grid item xs={12} sm={6} md={6} lg={4} xl={2}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
          </CardContent>
          <CardActions>
            <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontWeight="bold"
                fontSize="14px"
              >
                R$ {formatScaledPriceToPtBr(amount.value, amount.scale)}
              </Typography>
              <Button size="small" color="success" onClick={() => addSelectedProduct(info)}>
                Adicionar
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    )
  }

  function BeverageProductCard() {
    return (
      <Grid item xs={12} sm={6} md={6} lg={4} xl={2}>
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom variant="h5" component="div">
              Suco de acerola
            </Typography>
            <Typography sx={{ fontSize: 12 }} variant="h5" component="div" color="text.secondary">
              R$ 14,90
            </Typography>
          </CardContent>

          <CardActions>
            <Box width="100%" display="flex" justifyContent="space-around" alignItems="center">
              <Button size="small" color="success" variant="outlined">
                300
              </Button>
              <Button size="small" color="success" variant="outlined">
                500
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Grid>
    )
  }

  function OrderResumeProduct({ orderProduct, itemUuid }: any) {
    const { id, name, amount, items, observations } = orderProduct
    return (
      <Box p={2}>
        <Grid container>
          <Grid item xs={11}>
            <Typography variant="h5">{name}</Typography>

            {items.length > 0 &&
              items.map((item, index) => (
                <Typography key={`order-${itemUuid}-${index}-id`} variant="subtitle2">
                  + {item.name}
                </Typography>
              ))}
          </Grid>
          <Grid item xs={1}>
            <Box display="flex" flexDirection="column">
              <IconButton aria-label="Editar item" size="small">
                <EditIcon sx={{ fontSize: "15px" }} />
              </IconButton>
              <IconButton
                aria-label="Remover produto"
                size="small"
                color="error"
                onClick={() => removeSelectedProduct(itemUuid)}
              >
                <ClearIcon sx={{ fontSize: "15px" }} />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="right" margin={0}>
              R$ {formatScaledPriceToPtBr(amount.value, amount.scale)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  }

  function calculateTotalSelectedItemsPrice(listToSum: any) {
    const sum = listToSum.reduce(
      (previousValue, currentItem) => previousValue + currentItem.amount.value,
      0
    )
    return formatScaledPriceToPtBr(sum, 2)
  }

  return (
    <SidebarLayout>
      <p>
        <Link href={Routes.OrdersPage()}>
          <a>Lista de Pedidos</a>
        </Link>
      </p>

      <Grid container padding={2}>
        <Grid item xs={12} md={8} lg={9} paddingBottom={1} height="60px">
          <Box>
            <Grid container xs={12} spacing={1}>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  paddingBottom={1}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={9}>
                      <Typography gutterBottom variant="h3" component="div">
                        Novo pedido
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        id="standard-search"
                        label="Pesquisar produto"
                        type="search"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  height="700px" // fixed the height
                  style={{
                    //border: "2px solid black",
                    overflow: "hidden",
                    overflowY: "scroll",
                    padding: "10px",
                  }}
                >
                  <Grid container spacing={1}>
                    {productsList.combos.map((item, index) => (
                      <ProductCard key={`product-combo-${index}`} info={item} />
                    ))}
                  </Grid>
                  <Grid container spacing={1} paddingTop={4}>
                    {productsList.sandwiches.map((item, index) => (
                      <ProductCard key={`product-sandwiches-${index}`} info={item} />
                    ))}
                  </Grid>
                  <Grid container spacing={1} paddingTop={4}>
                    {productsList.beverages.map((item, index) => (
                      <ProductCard key={`product-beverage-${index}`} info={item} />
                    ))}
                  </Grid>

                  {/*
                  <Grid container spacing={1} paddingTop={1}>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                      <BeverageProductCard key={`produto-bebida-${index}`} info={productTwo} />
                    ))}
                  </Grid>
                  */}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Box paddingTop="60px">
            <Card sx={{ minHeight: { xs: 0, md: 700 } }}>
              <CardHeader title="Resumo do Pedido" />
              <Divider />
              <Box
                paddingBottom={1}
                height="500px" // fixed the height
                style={{
                  //border: "2px solid black",
                  overflow: "hidden",
                  overflowY: "scroll",
                  padding: "10px",
                }}
              >
                {filteredProductsList.map((item, index) => (
                  <OrderResumeProduct
                    key={`order-resume-product-${item.uuid}`}
                    orderProduct={item}
                    itemUuid={item.uuid}
                  />
                ))}
                <Divider />
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
                <Typography variant="h4">
                  R$ {calculateTotalSelectedItemsPrice(selectedProducts)}
                </Typography>
                <Button variant="contained" color="success" endIcon={<ArrowForwardTwoTone />}>
                  Confirmar
                </Button>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </SidebarLayout>
  )
}

NewOrderPage.authenticate = true

export default NewOrderPage

/*

            <OrderForm
              submitText="Create Order"
              // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              // schema={CreateOrder}
              // initialValues={{}}
              onSubmit={async (values) => {
                try {
                  const order = await createOrderMutation(values)
                  void router.push(Routes.ShowOrderPage({ orderId: order.id }))
                } catch (error: any) {
                  console.error(error)
                  return {
                    [FORM_ERROR]: error.toString(),
                  }
                }
              }}
            />

          */

/*                 sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: 800,
                    overflow: "hidden",
                    overflowY: "scroll",
                    // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                  }}*/
