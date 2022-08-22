import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import SidebarLayout from "app/core/layouts/SidebarLayout"

import createIngredient from "app/ingredients/mutations/createIngredient"
import { IngredientForm, FORM_ERROR } from "app/ingredients/components/IngredientForm"
import { Box, Grid } from "@mui/material"
import { BoxCenter } from "app/core/components/BoxCenter"

const NewIngredientPage = () => {
  const router = useRouter()
  const [createIngredientMutation] = useMutation(createIngredient)

  return (
    <SidebarLayout>
      <p>
        <Link href={Routes.IngredientsPage()}>
          <a>Lista de ingredientes cadastrados</a>
        </Link>
      </p>
      <Grid container>
        <Grid item xs={12}>
          <BoxCenter>
            <h1>Cadastro de ingrediente</h1>
          </BoxCenter>
        </Grid>
        <Grid item xs={12}>
          <BoxCenter paddingTop={5}>
            <IngredientForm
              submitText="Cadastrar"
              // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              // schema={CreateIngredient}
              // initialValues={{}}
              onSubmit={async (values) => {
                try {
                  const ingredient = await createIngredientMutation(values)
                  void router.push(Routes.ShowIngredientPage({ ingredientId: ingredient.id }))
                } catch (error: any) {
                  console.error(error)
                  return {
                    [FORM_ERROR]: error.toString(),
                  }
                }
              }}
            />
          </BoxCenter>
        </Grid>
      </Grid>
    </SidebarLayout>
  )
}

NewIngredientPage.authenticate = true

export default NewIngredientPage
