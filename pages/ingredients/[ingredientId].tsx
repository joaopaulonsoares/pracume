import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import SidebarLayout from "app/core/layouts/SidebarLayout"

import getIngredient from "app/ingredients/queries/getIngredient"
import deleteIngredient from "app/ingredients/mutations/deleteIngredient"

export const Ingredient = () => {
  const router = useRouter()
  const ingredientId = useParam("ingredientId", "number")
  const [deleteIngredientMutation] = useMutation(deleteIngredient)
  const [ingredient] = useQuery(getIngredient, { id: ingredientId })

  return (
    <>
      <Head>
        <title>Ingredient {ingredient.id}</title>
      </Head>

      <div>
        <h1>Ingredient {ingredient.id}</h1>
        <pre>{JSON.stringify(ingredient, null, 2)}</pre>

        <Link href={Routes.EditIngredientPage({ ingredientId: ingredient.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteIngredientMutation({ id: ingredient.id })
              router.push(Routes.IngredientsPage())
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

const ShowIngredientPage = () => {
  return (
    <SidebarLayout>
      <div>
        <p>
          <Link href={Routes.IngredientsPage()}>
            <a>Ingredients</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Ingredient />
        </Suspense>
      </div>
    </SidebarLayout>
  )
}

ShowIngredientPage.authenticate = true

export default ShowIngredientPage
