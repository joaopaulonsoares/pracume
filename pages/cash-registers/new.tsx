import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createCashRegister from "app/cash-registers/mutations/createCashRegister"
import { CashRegisterForm, FORM_ERROR } from "app/cash-registers/components/CashRegisterForm"
import SidebarLayout from "app/core/layouts/SidebarLayout"

const NewCashRegisterPage = () => {
  const router = useRouter()
  const [createCashRegisterMutation] = useMutation(createCashRegister)

  return (
    <SidebarLayout>
      <h1>Create New CashRegister</h1>

      <CashRegisterForm
        submitText="Create CashRegister"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCashRegister}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const cashRegister = await createCashRegisterMutation(values)
            void router.push(Routes.ShowCashRegisterPage({ cashRegisterId: cashRegister.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CashRegistersPage()}>
          <a>CashRegisters</a>
        </Link>
      </p>
    </SidebarLayout>
  )
}

NewCashRegisterPage.authenticate = true

export default NewCashRegisterPage
