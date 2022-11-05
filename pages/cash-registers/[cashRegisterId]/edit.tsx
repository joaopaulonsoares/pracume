import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getCashRegister from "app/cash-registers/queries/getCashRegister"
import updateCashRegister from "app/cash-registers/mutations/updateCashRegister"
import { CashRegisterForm, FORM_ERROR } from "app/cash-registers/components/CashRegisterForm"
import SidebarLayout from "app/core/layouts/SidebarLayout"

export const EditCashRegister = () => {
  const router = useRouter()
  const cashRegisterId = useParam("cashRegisterId", "number")
  const [cashRegister, { setQueryData }] = useQuery(
    getCashRegister,
    { id: cashRegisterId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCashRegisterMutation] = useMutation(updateCashRegister)

  return (
    <>
      <Head>
        <title>Edit CashRegister {cashRegister.id}</title>
      </Head>

      <div>
        <h1>Edit CashRegister {cashRegister.id}</h1>
        <pre>{JSON.stringify(cashRegister, null, 2)}</pre>

        <CashRegisterForm
          submitText="Update CashRegister"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCashRegister}
          initialValues={cashRegister}
          onSubmit={async (values) => {
            try {
              const updated = await updateCashRegisterMutation({
                id: cashRegister.id,
                ...values,
              })
              await setQueryData(updated)
              void router.push(Routes.ShowCashRegisterPage({ cashRegisterId: updated.id }))
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

const EditCashRegisterPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCashRegister />
      </Suspense>

      <p>
        <Link href={Routes.CashRegistersPage()}>
          <a>CashRegisters</a>
        </Link>
      </p>
    </div>
  )
}

EditCashRegisterPage.authenticate = true
EditCashRegisterPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>

export default EditCashRegisterPage
