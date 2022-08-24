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
  Typography,
} from "@mui/material"
import { BoxCenter } from "app/core/components/BoxCenter"
import { ArrowForwardTwoTone } from "@mui/icons-material"
import EditIcon from "@mui/icons-material/Edit"
import ClearIcon from "@mui/icons-material/Clear"

const NewOrderPage = () => {
  const router = useRouter()
  const [createOrderMutation] = useMutation(createOrder)

  return (
    <SidebarLayout>
      <p>
        <Link href={Routes.OrdersPage()}>
          <a>Lista de Pedidos</a>
        </Link>
      </p>
      <BoxCenter>
        <h3>Cadastro de novo pedido</h3>
      </BoxCenter>
      <Grid container>
        <Grid item xs={12} md={8} lg={9} paddingBottom={1}>
          <Box minWidth="100%">
            <Grid container xs={12} spacing={1}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} xl={2} key={`produto-${index}`}>
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                      {/*
                                            <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread
                      </Typography>
                      */}
                    </CardContent>
                    <CardActions>
                      <Box width="100%" display="flex" justifyContent="right">
                        <Button size="small" color="success">
                          Adicionar
                        </Button>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Card sx={{ minHeight: { xs: 0, md: 242 } }}>
            <CardHeader title="Resumo do Pedido" subheader={" saved addresses"} />
            <Divider />
            <Box paddingBottom={1}>
              {[0, 1, 2, 3].map((item, index) => (
                <Box p={2} key={`item-${index}`}>
                  <Grid container>
                    <Grid item xs={11}>
                      <Typography variant="h5">Big Cheddar</Typography>
                      <Typography variant="subtitle2">+ Queijo</Typography>
                      <Typography variant="subtitle2">+ Presunto</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Box display="flex" flexDirection="column">
                        <IconButton aria-label="Editar item" size="small">
                          <EditIcon sx={{ fontSize: "15px" }} />
                        </IconButton>
                        <IconButton aria-label="Remover produto" size="small" color="error">
                          <ClearIcon sx={{ fontSize: "15px" }} />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" align="right" margin={0}>
                        R$ 12,20
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}

              <Divider />
              <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
                <Typography variant="h4">R$ 23,20</Typography>
                <Button variant="contained" color="success" endIcon={<ArrowForwardTwoTone />}>
                  Confirmar
                </Button>
              </Box>
            </Box>
          </Card>
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
