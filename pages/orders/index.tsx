import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getOrders from "app/orders/queries/getOrders"
import SidebarLayout from "app/core/layouts/SidebarLayout"
import { Box, Button } from "@mui/material"

const ITEMS_PER_PAGE = 100

export const OrdersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ orders, hasMore }] = usePaginatedQuery(getOrders, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <Link href={Routes.ShowOrderPage({ orderId: order.id })}>
              <a>{order.id}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const OrdersPage = () => {
  return (
    <SidebarLayout>
      <Box margin={5}>
        <Head>
          <title>Orders</title>
        </Head>

        <Box width="100%" display="flex" justifyContent="right">
          <Link href={Routes.NewOrderPage()}>
            <Button variant="contained">Novo pedido</Button>
          </Link>
        </Box>

        <Suspense fallback={<div>Carregando...</div>}>
          <OrdersList />
        </Suspense>
      </Box>
    </SidebarLayout>
  )
}

export default OrdersPage
