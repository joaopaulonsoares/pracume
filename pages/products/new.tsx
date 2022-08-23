import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createProduct from "app/products/mutations/createProduct"
import { ProductForm, FORM_ERROR } from "app/products/components/ProductForm"
import { convertNumberToScale } from "app/core/utils/convertNumberToScaleTwo"
import SidebarLayout from "app/core/layouts/SidebarLayout"
import { Grid } from "@mui/material"
import { BoxCenter } from "app/core/components/BoxCenter"

const NewProductPage = () => {
  const router = useRouter()
  const [createProductMutation] = useMutation(createProduct)

  return (
    <SidebarLayout>
      <p>
        <Link href={Routes.ProductsPage()}>
          <a>Lista de Produtos</a>
        </Link>
      </p>
      <Grid container>
        <Grid item xs={12}>
          <BoxCenter>
            <h1>Cadastro de produtos</h1>
          </BoxCenter>
        </Grid>
        <Grid item xs={12}>
          <BoxCenter paddingTop={5}>
            <ProductForm
              submitText="Cadastrar produto"
              // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              // schema={CreateProduct}
              // initialValues={{}}
              onSubmit={async (values) => {
                const convertedPrice = await convertNumberToScale(values.price, 2)
                try {
                  const product = await createProductMutation({
                    ...values,
                    price: convertedPrice,
                  })
                  void router.push(Routes.ShowProductPage({ productId: product.id }))
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

NewProductPage.authenticate = true

export default NewProductPage
