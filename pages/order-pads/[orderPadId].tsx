import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import getOrderPad from "app/order-pads/queries/getOrderPad"
import deleteOrderPad from "app/order-pads/mutations/deleteOrderPad"
import { CollapsibleTable } from "app/order-pads/components/CollapsibleTable"

import SidebarLayout from "app/core/layouts/SidebarLayout"
import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material"
import { formatScaledPriceToPtBr } from "app/core/utils/formatScaledPriceToPtBr"

export const OrderPad = () => {
  const router = useRouter()
  const orderPadId = useParam("orderPadId", "number")
  const [deleteOrderPadMutation] = useMutation(deleteOrderPad)
  const [orderPad] = useQuery(getOrderPad, { id: orderPadId })

  const orderPadGrossValueSum = orderPad.orders.reduce(
    (previousValue, currentItem) => previousValue + currentItem.amount,
    0
  )

  return (
    <Container>
      <Head>
        <title>Comanda #{orderPad.id}</title>
      </Head>

      <div>
        <h1>
          Comanda #{orderPad.id} - {orderPad.holderName}
        </h1>
        {/*<pre>{JSON.stringify(orderPad, null, 2)}</pre>*/}

        <Link href={Routes.EditOrderPadPage({ orderPadId: orderPad.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteOrderPadMutation({ id: orderPad.id })
              void router.push(Routes.OrderPadsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>

        <Link
          href={Routes.NewOrderPage({
            type: "place",
            table: orderPad.tableReference,
            orderPad: orderPad.id,
          })}
        >
          <Button variant="contained">Novo pedido</Button>
        </Link>

        {!orderPad ? <div>Loading</div> : <CollapsibleTable orderPadInfo={orderPad} />}

        <Box paddingTop={1} display="flex" justifyContent="right" alignItems="center">
          <Paper style={{ width: "350px" }}>
            <Box width="100%" display="flex" justifyContent="space-between">
              <Typography align="left" style={{ fontSize: "1.2rem" }}>
                Total bruto:{" "}
              </Typography>
              <Typography style={{ fontSize: "1.2rem" }}>
                R$ {formatScaledPriceToPtBr(orderPadGrossValueSum)}{" "}
              </Typography>
            </Box>
            <Box width="100%" display="flex" justifyContent="space-between">
              <Typography align="left" style={{ fontSize: "1.2rem" }}>
                Descontos:{" "}
              </Typography>
              <Typography style={{ fontSize: "1.2rem" }}>
                R$ {formatScaledPriceToPtBr(orderPadGrossValueSum)}{" "}
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Box width="100%" display="flex" justifyContent="space-between">
              <Typography align="left" style={{ fontSize: "1.4rem" }} fontWeight="bold">
                Total:{" "}
              </Typography>
              <Typography style={{ fontSize: "1.4rem" }} fontWeight="bold">
                R$ {formatScaledPriceToPtBr(orderPadGrossValueSum)}{" "}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </div>
    </Container>
  )
}

const ShowOrderPadPage = () => {
  return (
    <SidebarLayout>
      <div>
        <p>
          <Link href={Routes.OrderPadsPage()}>
            <a>Ver comandas em aberto</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <OrderPad />
        </Suspense>
      </div>
    </SidebarLayout>
  )
}

ShowOrderPadPage.authenticate = true
//ShowOrderPadPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>

export default ShowOrderPadPage
