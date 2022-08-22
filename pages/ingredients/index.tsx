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
import { Box } from "@mui/material"

const ITEMS_PER_PAGE = 100

const tableHeader = [
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

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  console.log(ingredients)

  return (
    <div>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <Link href={Routes.ShowIngredientPage({ ingredientId: ingredient.id })}>
              <a>{ingredient.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Anterior
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Próximo
      </button>

      <BasicTable />
    </div>
  )
}

const IngredientsPage = () => {
  return (
    <SidebarLayout>
      <Box margin={5}>
        <Head>
          <title>Ingredientes</title>
        </Head>

        <p>
          <Link href={Routes.NewIngredientPage()}>
            <a>Cadastrar ingrediente</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <IngredientsList />
        </Suspense>
      </Box>
    </SidebarLayout>
  )
}

export default IngredientsPage
