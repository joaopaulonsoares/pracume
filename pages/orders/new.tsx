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
import { mockedProducts, productsNewList } from "app/orders/mockedProducts"
import { v4 } from "uuid"
import Tooltip from "@mui/material/Tooltip"
import { Form, Field } from "react-final-form"
import { FieldArray } from "react-final-form-arrays"
import arrayMutators from "final-form-arrays"
import { MaterialTextField, SelectTextField } from "app/core/components/FormFields"
import { SandwichCard } from "app/orders/components/Products/Sandwich/SandwichCard"
import { ComboCard } from "app/orders/components/Products/Combo/ComboCard"

function SimpleDialog(props) {
  const { onClose, selectedValue, open, infos } = props
  console.log(infos)

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }
  // https://www.npmjs.com/package/react-final-form-arrays
  // https://codesandbox.io/s/react-final-form-field-arrays-vq9pz?file=/index.js:198-208

  console.log(infos.items)

  const castedInfos = {
    sandwich: infos.items[0].productId,
    beverage: infos.items[2].productId,
    additional: infos.items[1].productId,
  }
  console.log(castedInfos)

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          {infos.name}
          <IconButton aria-label="Editar item" size="small" onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Box padding={1}>
        <Form
          initialValues={castedInfos}
          onSubmit={(values) => {
            console.log(values)
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/*

                  <Field name="sandwich" component="select">
                    <option />
                    <option value="#ff0000">❤️ Red</option>
                    <option value="#00ff00">💚 Green</option>
                    <option value="#0000ff">💙 Blue</option>
                  </Field>
                  */}
                  <SelectTextField
                    name="sandwich"
                    label="Sanduíche"
                    placeholder="teste"
                    options={mockedProducts.sandwiches}
                  />
                </Grid>

                {infos.items.map((item, index) => (
                  <Grid item xs={12} key={`${item.type}-${index}`}>
                    <MaterialTextField name={item.type} label={item.type} placeholder="teste" />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  {" "}
                  <MaterialTextField
                    name="observations"
                    label="Observações"
                    placeholder="teste"
                    multiline
                    rows={4}
                  />{" "}
                </Grid>
              </Grid>

              <Grid item xs={12} paddingTop={1}>
                <Box width="100%" display="flex" justifyContent="center">
                  <Button type="submit" variant="outlined">
                    Salvar
                  </Button>
                </Box>
              </Grid>
            </form>
          )}
        />
      </Box>
    </Dialog>
  )
}

function NewOrderPage(): JSX.Element {
  const router = useRouter()
  const [createOrderMutation] = useMutation(createOrder)
  const productsList = mockedProducts
  const [selectedProducts, setSelectedProducts] = useState<Array<any>>([])
  const [searchString, setSearchString] = useState<String>("")

  const combosList = productsNewList.filter((p) => p.category === "combo")
  const sandwichesList = productsNewList.filter((p) => p.category === "sandwich")
  const customBeverageList = productsNewList.filter((p) => p.category === "customBeverage")
  const beverageList = productsNewList.filter((p) => p.category === "beverage")

  function addSelectedProduct(info: any) {
    const generatedUuid = v4()
    setSelectedProducts((oldArray: any) => [...oldArray, { uuid: generatedUuid, ...info }])
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

  function CustomBeverageProductCard({ info }: any) {
    const { name, amount, productId, sizeOptions } = info

    function handleBeverageClick(beverageInfos: any) {
      addSelectedProduct({
        ...info,
        productId,
        amount: beverageInfos.amount,
        items: [{ name: `${beverageInfos.name} ml`, type: beverageInfos.type }],
      })
    }

    return (
      <Grid item xs={12} sm={6} md={6} lg={4} xl={2}>
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <>
              {sizeOptions.length > 0 ? (
                <Box width="100%" display="flex" justifyContent="space-around" alignItems="center">
                  {sizeOptions.map((sizeItem, index) => (
                    <Typography
                      key={`${index}-bebida-${name}-${sizeItem.name}`}
                      sx={{ fontSize: 12 }}
                      variant="h5"
                      component="div"
                      color="text.secondary"
                    >
                      {sizeItem.name} - R${" "}
                      {formatScaledPriceToPtBr(sizeItem.amount.value, sizeItem.amount.scale)}
                    </Typography>
                  ))}
                </Box>
              ) : (
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  fontWeight="bold"
                  fontSize="14px"
                >
                  R$ {formatScaledPriceToPtBr(amount.value, amount.scale)}
                </Typography>
              )}
            </>
          </CardContent>

          <CardActions>
            {sizeOptions.length > 0 ? (
              <Box width="100%" display="flex" justifyContent="space-around" alignItems="center">
                {sizeOptions.map((sizeItem, index) => (
                  <Button
                    size="small"
                    color="success"
                    variant="outlined"
                    key={`${name}-size-${sizeItem.size}`}
                    onClick={() => handleBeverageClick(sizeItem)}
                  >
                    {sizeItem.name}
                  </Button>
                ))}
              </Box>
            ) : (
              <button>teste</button>
            )}
          </CardActions>
        </Card>
      </Grid>
    )
  }

  function OrderResumeProduct({ orderProduct, itemUuid, index }: any) {
    const { productId, name, amount, items, observations } = orderProduct
    const listPosition = index + 1
    const [openEdit, setOpenEdit] = useState(false)

    const handleClickEditOpen = () => {
      setOpenEdit(true)
    }

    const handleCloseEditOpen = () => {
      setOpenEdit(false)
      //setSelectedValue(value);
    }

    return (
      <Box p={1}>
        <Grid container>
          <Grid item xs={11}>
            <Typography variant="h5">
              {listPosition} - {name}
            </Typography>

            {items.length > 0 &&
              items.map((item, index) => (
                <Typography key={`order-${itemUuid}-${index}-id`} variant="subtitle2">
                  + {item.name}
                </Typography>
              ))}
          </Grid>
          <Grid item xs={1}>
            <Box display="flex" flexDirection="column">
              <Tooltip
                title={`Editar/Adicionar item no produto ${listPosition}`}
                placement="left-start"
              >
                <IconButton
                  aria-label="Editar item"
                  size="small"
                  onClick={() => handleClickEditOpen()}
                >
                  <EditIcon sx={{ fontSize: "15px" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={`Remover produto ${listPosition}`} placement="left-start">
                <IconButton
                  aria-label="Remover produto"
                  size="small"
                  color="error"
                  onClick={() => removeSelectedProduct(itemUuid)}
                >
                  <ClearIcon sx={{ fontSize: "15px" }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="right" margin={0}>
              R$ {formatScaledPriceToPtBr(amount.value, amount.scale)}
            </Typography>
          </Grid>
        </Grid>
        <SimpleDialog open={openEdit} onClose={handleCloseEditOpen} infos={orderProduct} />
        <Divider />
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
        <Grid item xs={12} md={8} lg={9} paddingBottom={1}>
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
                      key={`product-combo-${index}`}
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
                    <SandwichCard
                      key={`product-sandwiches-${index}`}
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
                    <ProductCard key={`product-beverage-${index}`} info={item} />
                  ))}
                </Grid>

                <Grid container spacing={1} paddingTop={3}>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="h3" component="div" paddingBottom={1}>
                      Sucos e cremes
                    </Typography>
                  </Grid>
                  {productsList.juices.map((item, index) => (
                    <CustomBeverageProductCard key={`custom-beverage-${index}`} info={item} />
                  ))}
                </Grid>
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
                <Box
                  paddingBottom={1}
                  maxHeight="580px" // fixed the height: ;
                  style={{
                    //border: "2px solid black",
                    overflow: "hidden",
                    overflowY: "auto",
                    padding: "10px",
                  }}
                >
                  {selectedProducts.length === 0 ? (
                    <Box
                      width="100%"
                      height="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      padding={1}
                    >
                      <Typography variant="subtitle1">Nenhum produto escolhido</Typography>
                    </Box>
                  ) : (
                    selectedProducts.map((item, index) => (
                      <OrderResumeProduct
                        key={`order-resume-product-${item.uuid}`}
                        orderProduct={item}
                        itemUuid={item.uuid}
                        index={index}
                      />
                    ))
                  )}
                </Box>
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
