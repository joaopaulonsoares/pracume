import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import SidebarLayout from "app/core/layouts/SidebarLayout"

import Layout from "app/core/layouts/Layout"
import getIngredient from "app/ingredients/queries/getIngredient"
import updateIngredient from "app/ingredients/mutations/updateIngredient"
import { IngredientForm, FORM_ERROR } from "app/ingredients/components/IngredientForm"
import { Grid } from "@mui/material"
import { BoxCenter } from "app/core/components/BoxCenter"

export const EditIngredient = () => {
  const router = useRouter()
  const ingredientId = useParam("ingredientId", "number")
  const [ingredient, { setQueryData }] = useQuery(
    getIngredient,
    { id: ingredientId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateIngredientMutation] = useMutation(updateIngredient)

  return (
    <>
      <Head>
        <title>Editar Ingrediente {ingredient.name}</title>
      </Head>

      <div>
        <pre>{JSON.stringify(ingredient, null, 2)}</pre>

        <IngredientForm
          submitText="Atualizar ingredientes"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateIngredient}
          initialValues={ingredient}
          onSubmit={async (values) => {
            try {
              const updated = await updateIngredientMutation({
                id: ingredient.id,
                ...values,
              })
              await setQueryData(updated)
              void router.push(Routes.ShowIngredientPage({ ingredientId: updated.id }))
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

const EditIngredientPage = () => {
  return (
    <SidebarLayout>
      <p>
        <Link href={Routes.IngredientsPage()}>
          <a>Ingredients</a>
        </Link>
      </p>
      <Grid container>
        <Grid item xs={12}>
          <BoxCenter>
            <h1>Editar Ingrediente</h1>
          </BoxCenter>
        </Grid>
        <Grid item xs={12}>
          <BoxCenter paddingTop={5}>
            <Suspense fallback={<div>Loading...</div>}>
              <EditIngredient />
            </Suspense>
          </BoxCenter>
        </Grid>
      </Grid>
    </SidebarLayout>
  )
}

EditIngredientPage.authenticate = true
EditIngredientPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditIngredientPage
