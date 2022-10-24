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
import { Container } from "@mui/material"

export const OrderPad = () => {
  const router = useRouter()
  const orderPadId = useParam("orderPadId", "number")
  const [deleteOrderPadMutation] = useMutation(deleteOrderPad)
  const [orderPad] = useQuery(getOrderPad, { id: orderPadId })

  return (
    <Container>
      <Head>
        <title>Comanda #{orderPad.id}</title>
      </Head>

      <div>
        <h1>
          Comanda #{orderPad.id} - {orderPad.holderName}
        </h1>
        <pre>{JSON.stringify(orderPad, null, 2)}</pre>

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

        {!orderPad ? <div>Loading</div> : <CollapsibleTable orderPadInfo={orderPad} />}
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
