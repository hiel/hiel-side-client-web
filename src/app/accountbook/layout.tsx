import "@/app/globals.css"
import { ReactNode } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import LoadSpinner from "@/common/components/LoadSpinner"
import AuthProvider from "@/common/providers/AuthProvider"
import { Provider } from "@/components/ui/provider"
import QueryProvider from "@/common/providers/QueryProvider"
import { Box } from "@chakra-ui/react"

export default function AccountBookRootLayout({children}: Readonly<{children: ReactNode}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <AuthProvider>
            <Provider defaultTheme={"light"}>
              <Box suppressHydrationWarning style={{width: "100%"}}>{children}</Box>
              <LoadSpinner />
            </Provider>
          </AuthProvider>
          <ReactQueryDevtools />
        </QueryProvider>
      </body>
    </html>
  )
}
