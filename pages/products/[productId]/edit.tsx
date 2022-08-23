import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "app/core/layouts/Layout"
import getProduct from "app/products/queries/getProduct"
import updateProduct from "app/products/mutations/updateProduct"
import { ProductForm, FORM_ERROR } from "app/products/components/ProductForm"
import { convertNumberToIntegerWithScale } from "app/core/utils/convertNumberToIntegerWithScale"
import { convertNumberFromIntegerWithScaleToFloat } from "app/core/utils/convertNumberFromIntegerWithScaleToFloat"
import SidebarLayout from "app/core/layouts/SidebarLayout"
import { BoxCenter } from "app/core/components/BoxCenter"
import { Grid } from "@mui/material"

export const EditProduct = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [product, { setQueryData }] = useQuery(
    getProduct,
    { id: productId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateProductMutation] = useMutation(updateProduct)

  return (
    <>
      <Head>
        <title>Edit Product {product.id}</title>
      </Head>

      <div>
        <pre>{/*JSON.stringify(product, null, 2)*/}</pre>

        <ProductForm
          submitText="Atualizar produto"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateProduct}
          initialValues={{ ...product, price: product.price / 10 ** product.priceScale }}
          onSubmit={async (values) => {
            const convertedPrice = await convertNumberToIntegerWithScale(values.price, 2)
            try {
              const updated = await updateProductMutation({
                ...values,
                id: product.id,
                price: convertedPrice,
                isActive: values.isActive === "true" ? true : false,
              })
              await setQueryData(updated)

              // void router.push(Routes.ShowProductPage({ productId: updated.id }))
              void router.push(Routes.ProductsPage())
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

const EditProductPage = () => {
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
            <h1>Editar Produto</h1>
          </BoxCenter>
        </Grid>
        <Grid item xs={12}>
          <BoxCenter paddingTop={5}>
            <Suspense fallback={<div>Loading...</div>}>
              <EditProduct />
            </Suspense>
          </BoxCenter>
        </Grid>
      </Grid>
    </SidebarLayout>
  )
}

EditProductPage.authenticate = true
EditProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProductPage
