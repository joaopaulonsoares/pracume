import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getIngredients from "app/ingredients/queries/getIngredients"
import Blitz from "pages/api/rpc/[[...blitz]]"
import SidebarLayout from "app/core/layouts/SidebarLayout"
import { BasicTable } from "app/core/components/BasicTable"
import { Box, Button } from "@mui/material"

const ITEMS_PER_PAGE = 100

const tableHeader = [
  {
    name: "Id",
    key: "id",
  },
  {
    name: "Nome",
    key: "name",
  },
  {
    name: "Quantidade",
    key: "quantity",
  },
  {
    name: "Unidade de Medida",
    key: "unitMeasurement",
  },
]

export const IngredientsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ ingredients, hasMore }] = usePaginatedQuery(getIngredients, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  // const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  // const goToNextPage = () => router.push({ query: { page: page + 1 } })

  function redirectToEditPageFunction(id: number) {
    return Routes.EditIngredientPage({ ingredientId: id })
  }

  function redirectToShowPageFunction(id: number) {
    return Routes.ShowIngredientPage({ ingredientId: id })
  }

  return (
    <Box paddingTop={5}>
      <BasicTable
        title="Ingredientes"
        subTitle="Lista de ingredientes cadastrados"
        headers={tableHeader}
        content={ingredients}
        editAction={redirectToEditPageFunction}
        showAction={redirectToShowPageFunction}
      />
    </Box>
  )
}

const IngredientsPage = () => {
  return (
    <SidebarLayout>
      <Box margin={5}>
        <Head>
          <title>Ingredientes</title>
        </Head>

        <Box width="100%" display="flex" justifyContent="right">
          <Link href={Routes.NewIngredientPage()}>
            <Button variant="contained">Cadastrar Ingrediente</Button>
          </Link>
        </Box>

        <Suspense fallback={<div>Loading...</div>}>
          <IngredientsList />
        </Suspense>
      </Box>
    </SidebarLayout>
  )
}

export default IngredientsPage
