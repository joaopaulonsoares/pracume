import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createOrderPad from "app/order-pads/mutations/createOrderPad"
import { OrderPadForm, FORM_ERROR } from "app/order-pads/components/OrderPadForm"
import SidebarLayout from "app/core/layouts/SidebarLayout"
import { useCashRegister } from "app/contexts/CashRegister"

const NewOrderPadPage = () => {
  const router = useRouter()
  const [createOrderPadMutation] = useMutation(createOrderPad)
  const cashRegisterContext = useCashRegister()

  return (
    <SidebarLayout>
      <h1>Create New OrderPad</h1>

      <OrderPadForm
        submitText="Create OrderPad"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateOrderPad}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const orderPad = await createOrderPadMutation({
              ...values,
              cashRegisterId: cashRegisterContext.cashRegisterId,
            })
            void router.push(Routes.ShowOrderPadPage({ orderPadId: orderPad.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.OrderPadsPage()}>
          <a>OrderPads</a>
        </Link>
      </p>
    </SidebarLayout>
  )
}

NewOrderPadPage.authenticate = true

export default NewOrderPadPage
