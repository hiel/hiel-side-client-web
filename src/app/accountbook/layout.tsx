import "@/app/globals.css"
import { ReactNode } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import LoadSpinner from "@/common/components/LoadSpinner"
import AuthProvider from "@/common/providers/AuthProvider"
import { Provider } from "@/components/ui/provider"
import QueryProvider from "@/common/providers/QueryProvider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "accountbook",
  description: "accountbook",
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <AuthProvider>
            <Provider defaultTheme={"light"}>
              <div suppressHydrationWarning style={{ width: "100%", padding: "20px" }}>
                <div>{ children }</div>
              </div>
              <LoadSpinner />
            </Provider>
          </AuthProvider>
          <ReactQueryDevtools />
        </QueryProvider>
      </body>
    </html>
  )
}
