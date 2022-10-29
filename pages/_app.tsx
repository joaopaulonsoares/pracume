import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import { HelmetProvider } from "react-helmet-async"
import React, { ReactNode, useEffect, useState } from "react"
import { withBlitz } from "app/blitz-client"
import ThemeProvider from "app/theme/ThemeProvider"
import { SidebarProvider } from "app/contexts/SidebarContext"
import { Toaster } from "react-hot-toast"
import { useRouter } from "next/router"
import { Backdrop, CircularProgress } from "@mui/material"
import { CashRegisterProvider } from "app/contexts/CashRegister"

function Loading(): ReactNode {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true)
    const handleComplete = (url) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false)
      }, 1000)

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  })

  return (
    loading && (
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  )
}
function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <ThemeProvider>
        <HelmetProvider>
          <CashRegisterProvider>
            <SidebarProvider>
              <Loading />
              <Toaster />
              <Component {...pageProps} />
            </SidebarProvider>
          </CashRegisterProvider>
        </HelmetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
