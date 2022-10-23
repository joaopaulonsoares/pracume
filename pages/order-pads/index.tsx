import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getOrderPads from "app/order-pads/queries/getOrderPads"
import SidebarLayout from "app/core/layouts/SidebarLayout"

const ITEMS_PER_PAGE = 100

export const OrderPadsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ orderPads, hasMore }] = usePaginatedQuery(getOrderPads, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {orderPads.map((orderPad) => (
          <li key={orderPad.id}>
            <Link href={Routes.ShowOrderPadPage({ orderPadId: orderPad.id })}>
              <a>{orderPad.name}</a>
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

const OrderPadsPage = () => {
  return (
    <SidebarLayout>
      <Head>
        <title>OrderPads</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewOrderPadPage()}>
            <a>Create OrderPad</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <OrderPadsList />
        </Suspense>
      </div>
    </SidebarLayout>
  )
}

export default OrderPadsPage
