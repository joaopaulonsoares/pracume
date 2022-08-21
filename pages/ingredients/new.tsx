import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import SidebarLayout from "app/core/layouts/SidebarLayout"

import createIngredient from "app/ingredients/mutations/createIngredient"
import { IngredientForm, FORM_ERROR } from "app/ingredients/components/IngredientForm"
import { Box, Grid } from "@mui/material"

const NewIngredientPage = () => {
  const router = useRouter()
  const [createIngredientMutation] = useMutation(createIngredient)

  return (
    <SidebarLayout title={"Create New Ingredient"}>
      <Grid container>
        <Grid item xs={12}>
          <h1>Cadastro de ingrediente</h1>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" width="100%" height="100%" justifyContent="center">
            <IngredientForm
              submitText="Create Ingredient"
              // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              // schema={CreateIngredient}
              // initialValues={{}}
              onSubmit={async (values) => {
                try {
                  const ingredient = await createIngredientMutation(values)
                  router.push(Routes.ShowIngredientPage({ ingredientId: ingredient.id }))
                } catch (error: any) {
                  console.error(error)
                  return {
                    [FORM_ERROR]: error.toString(),
                  }
                }
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <p>
        <Link href={Routes.IngredientsPage()}>
          <a>Ingredients</a>
        </Link>
      </p>
    </SidebarLayout>
  )
}

NewIngredientPage.authenticate = true

export default NewIngredientPage
