import { useState } from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import createOrder from "app/orders/mutations/createOrder"
import SidebarLayout from "app/core/layouts/SidebarLayout"
import { Box, Button, Card, CardHeader, Divider, Grid, TextField, Typography } from "@mui/material"
import { ArrowForwardTwoTone } from "@mui/icons-material"

import { productsNewList } from "app/orders/mockedProducts"
import { v4 } from "uuid"
import { DefaultCard } from "app/orders/components/Products/Default/DefaultCard"
import { ComboCard } from "app/orders/components/Products/Combo/ComboCard"
import { OrderResume } from "app/orders/components/OrderResume/Resume/OrderResume"
import { calculateTotalSelectedItemsPrice } from "app/core/utils/calculateTotalSelectedItemsPrice"

import toast from "react-hot-toast"

function NewOrderPage(): JSX.Element {
  const router = useRouter()
  const [createOrderMutation] = useMutation(createOrder)

  const [selectedProducts, setSelectedProducts] = useState<Array<any>>([])
  const [searchString, setSearchString] = useState<String>("")

  const combosList = productsNewList.filter((p) => p.category === "combo")
  const sandwichesList = productsNewList.filter((p) => p.category === "sandwich")
  const beverageList = productsNewList.filter((p) => p.category === "beverage")

  function formatNormalSelectedItem(info: any) {
    return {
      productInformations: {
        ...info,
      },
      selectedInfos: {
        itemId: info.item,
        itemName: info.name,
        observations: "",
        standardObservations: [],
      },
      category: info.category,
      totalPrice: info.amount,
    }
  }

  async function formatComboSelectedItem(info: any) {
    return {
      productInformations: {
        ...info,
      },
      selectedInfos: {
        sandwich: {
          itemId: info.defaultOptions.main,
          observations: [],
        },
        beverage: {
          itemId: info.defaultOptions.beverage,
          observations: [],
        },
        extra: {
          itemId: info.defaultOptions.extra,
          observations: [],
        },
        observations: "",
      },
      category: info.category,
      totalPrice: info.amount,
    }
  }

  async function addSelectedProduct(info: any) {
    const generatedUuid = v4()

    if (info.category === "combo") {
      const tempSelect = await formatComboSelectedItem(info)
      setSelectedProducts((oldArray: any) => [
        ...oldArray,
        { uuid: generatedUuid, totalAmount: info.amount, ...info, ...tempSelect },
      ])
    } else {
      const tempSelect = formatNormalSelectedItem(info)
      setSelectedProducts((oldArray: any) => [
        ...oldArray,
        { uuid: generatedUuid, totalAmount: info.amount, ...info, ...tempSelect },
      ])
    }
  }

  function removeSelectedProduct(itemUuid: string) {
    setSelectedProducts((prevState: any) => {
      return prevState.filter((data) => data.uuid != itemUuid)
    })
  }

  async function handleSubmitButtonClick() {
    console.log(selectedProducts)
    try {
      const orderCreated = await createOrderMutation(selectedProducts)
      toast.success(`Pedido #${orderCreated.id} criado com sucesso`)
      void router.push(Routes.OrdersPage())
    } catch (e) {
      console.log(e.message)
    }
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
                    onClick={() => handleSubmitButtonClick()}
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
