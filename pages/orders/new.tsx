import { Key, useState } from "react"
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
  Dialog,
  DialogTitle,
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
import CloseIcon from "@mui/icons-material/Close"
import { formatScaledPriceToPtBr } from "app/core/utils/formatScaledPriceToPtBr"
import { productsNewList } from "app/orders/mockedProducts"
import { v4 } from "uuid"
import Tooltip from "@mui/material/Tooltip"
import { Form, Field } from "react-final-form"
import { FieldArray } from "react-final-form-arrays"
import arrayMutators from "final-form-arrays"
import { MaterialTextField, SelectTextField } from "app/core/components/FormFields"
import { DefaultCard } from "app/orders/components/Products/Default/DefaultCard"
import { ComboCard } from "app/orders/components/Products/Combo/ComboCard"
import { OrderResume } from "app/orders/components/OrderResume/Resume/OrderResume"
import { calculateTotalSelectedItemsPrice } from "app/core/utils/calculateTotalSelectedItemsPrice"

function NewOrderPage(): JSX.Element {
  const router = useRouter()
  const [createOrderMutation] = useMutation(createOrder)

  const [selectedProducts, setSelectedProducts] = useState<Array<any>>([])
  const [searchString, setSearchString] = useState<String>("")

  const combosList = productsNewList.filter((p) => p.category === "combo")
  const sandwichesList = productsNewList.filter((p) => p.category === "sandwich")
  const customBeverageList = productsNewList.filter((p) => p.category === "customBeverage")
  const beverageList = productsNewList.filter((p) => p.category === "beverage")

  function addSelectedProduct(info: any) {
    const generatedUuid = v4()
    setSelectedProducts((oldArray: any) => [
      ...oldArray,
      { uuid: generatedUuid, totalAmount: info.amount, ...info },
    ])
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

  return (
    <SidebarLayout>
      <p>
        <Link href={Routes.OrdersPage()}>
          <a>Lista de Pedidos</a>
        </Link>
      </p>

      <Grid container padding={2}>
        <Grid item xs={12} md={8} lg={9} paddingBottom={1}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                paddingBottom={1}
              >
                <Grid container alignItems="center">
                  <Grid item xs={9}>
                    <Typography gutterBottom variant="h2" component="div">
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
                      value={searchString}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                maxHeight="700px" // fixed the height: ;
                style={{
                  overflow: "auto",
                  padding: "10px",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="h3" component="div" paddingBottom={1}>
                      Combos
                    </Typography>
                  </Grid>
                  {combosList.map((item, index) => (
                    <ComboCard
                      key={`product-combo-${item.name}-${index}`}
                      info={item}
                      handleSelection={addSelectedProduct}
                    />
                  ))}
                </Grid>
                <Grid container spacing={1} paddingTop={3}>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="h3" component="div" paddingBottom={1}>
                      Sanduíches
                    </Typography>
                  </Grid>
                  {sandwichesList.map((item, index) => (
                    <DefaultCard
                      key={`product-sandwiches-${item.name}-${index}`}
                      info={item}
                      handleSelection={addSelectedProduct}
                    />
                  ))}
                </Grid>
                <Grid container spacing={1} paddingTop={3}>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="h3" component="div" paddingBottom={1}>
                      Bebidas
                    </Typography>
                  </Grid>
                  {beverageList.map((item, index) => (
                    <DefaultCard
                      key={`product-beverage-${index}-${index}`}
                      info={item}
                      handleSelection={addSelectedProduct}
                    />
                  ))}
                </Grid>

                {/*                <Grid container spacing={1} paddingTop={3}>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="h3" component="div" paddingBottom={1}>
                      Sucos e cremes
                    </Typography>
                  </Grid>
                  {productsList.juices.map((item, index) => (
                    <CustomBeverageProductCard key={`custom-beverage-${index}`} info={item} />
                  ))}
                </Grid> */}
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Box paddingTop="60px">
            <Card sx={{ minHeight: { xs: 0, md: 0 } }}>
              <CardHeader title="Resumo do Pedido" />
              <Divider />
              <Box display="flex" flexDirection="column" justifyContent="space-between">
                <OrderResume
                  selectedProducts={selectedProducts}
                  handleSelectedRemove={removeSelectedProduct}
                />
                <Divider />
                <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
                  <Typography variant="h4">
                    R$ {calculateTotalSelectedItemsPrice(selectedProducts)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    endIcon={<ArrowForwardTwoTone />}
                    disabled={selectedProducts.length === 0}
                  >
                    Confirmar
                  </Button>
                </Box>
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
