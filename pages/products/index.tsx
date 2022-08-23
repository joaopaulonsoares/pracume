import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getProducts from "app/products/queries/getProducts"
import SidebarLayout from "app/core/layouts/SidebarLayout"
import { Box, Button } from "@mui/material"
import BasicTable from "app/core/components/BasicTable"
import { formatScaledPrice } from "app/core/utils/formatScaledPrice"

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
    name: "Descrição",
    key: "description",
  },
  {
    name: "Preço",
    key: "formattedPrice",
  },
]

export const ProductsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ products, hasMore }] = usePaginatedQuery(getProducts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const formattedProducts = products.map((product) => {
    return {
      ...product,
      formattedPrice: `R$ ${formatScaledPrice(product.price, product.priceScale)}`,
    }
  })

  function redirectToEditPageFunction(id: number) {
    return Routes.EditProductPage({ productId: id })
  }

  function redirectToShowPageFunction(id: number) {
    return Routes.ShowProductPage({ productId: id })
  }

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <Box paddingTop={5}>
      <BasicTable
        title="Produtos"
        subTitle="Lista de produtos cadastrados"
        headers={tableHeader}
        content={formattedProducts}
        editAction={redirectToEditPageFunction}
        showAction={redirectToShowPageFunction}
      />
    </Box>
  )

  /*
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={Routes.ShowProductPage({ productId: product.id })}>
              <a>{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
  */
}

const ProductsPage = () => {
  return (
    <SidebarLayout>
      <Box margin={5}>
        <Head>
          <title>Products</title>
        </Head>

        <Box width="100%" display="flex" justifyContent="right">
          <Link href={Routes.NewProductPage()}>
            <Button variant="contained">Cadastrar Produtos</Button>
          </Link>
        </Box>

        <Suspense fallback={<div>Loading...</div>}>
          <ProductsList />
        </Suspense>
      </Box>
    </SidebarLayout>
  )
}

export default ProductsPage
