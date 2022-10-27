import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getOrderPad from "app/order-pads/queries/getOrderPad"
import updateOrderPad from "app/order-pads/mutations/updateOrderPad"
import { OrderPadForm, FORM_ERROR } from "app/order-pads/components/OrderPadForm"

export const EditOrderPad = () => {
  const router = useRouter()
  const orderPadId = useParam("orderPadId", "number")
  const [orderPad, { setQueryData }] = useQuery(
    getOrderPad,
    { id: orderPadId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateOrderPadMutation] = useMutation(updateOrderPad)

  return (
    <>
      <Head>
        <title>Edit OrderPad {orderPad.id}</title>
      </Head>

      <div>
        <h1>Edit OrderPad {orderPad.id}</h1>
        <pre>{JSON.stringify(orderPad, null, 2)}</pre>

        <OrderPadForm
          submitText="Update OrderPad"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateOrderPad}
          initialValues={orderPad}
          onSubmit={async (values) => {
            try {
              const updated = await updateOrderPadMutation({
                id: orderPad.id,
                ...values,
              })
              await setQueryData(updated)
              void router.push(Routes.ShowOrderPadPage({ orderPadId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditOrderPadPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditOrderPad />
      </Suspense>

      <p>
        <Link href={Routes.OrderPadsPage()}>
          <a>OrderPads</a>
        </Link>
      </p>
    </div>
  )
}

EditOrderPadPage.authenticate = true
EditOrderPadPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditOrderPadPage
