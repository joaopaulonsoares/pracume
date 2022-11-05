import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import getCashRegister from "app/cash-registers/queries/getCashRegister"
import deleteCashRegister from "app/cash-registers/mutations/deleteCashRegister"
import SidebarLayout from "app/core/layouts/SidebarLayout"

export const CashRegister = () => {
  const router = useRouter()
  const cashRegisterId = useParam("cashRegisterId", "number")
  const [deleteCashRegisterMutation] = useMutation(deleteCashRegister)
  const [cashRegister] = useQuery(getCashRegister, { id: cashRegisterId })

  return (
    <>
      <Head>
        <title>CashRegister {cashRegister.id}</title>
      </Head>

      <div>
        <h1>CashRegister {cashRegister.id}</h1>
        <pre>{JSON.stringify(cashRegister, null, 2)}</pre>

        <Link
          href={Routes.EditCashRegisterPage({
            cashRegisterId: cashRegister.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCashRegisterMutation({ id: cashRegister.id })
              router.push(Routes.CashRegistersPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowCashRegisterPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CashRegistersPage()}>
          <a>CashRegisters</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <CashRegister />
      </Suspense>
    </div>
  )
}

ShowCashRegisterPage.authenticate = true
ShowCashRegisterPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>

export default ShowCashRegisterPage
