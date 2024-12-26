import "@/app/globals.css"
import { ReactNode } from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import LoadSpinner from "@/common/components/LoadSpinner"
import Link from "next/link"
import AuthProvider from "@/common/providers/AuthProvider"
import AccountBookNavigation from "@/app/accountbook/_AccountBookNavigation"
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
              <div suppressHydrationWarning style={{ maxWidth: "600px", margin: "0 auto" }}>
                <header
                  style={{
                    position: "sticky",
                    top: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "50px",
                    padding: "0 20px",
                  }}
                >
                  <Link href={ "/accountbook" }>
                    HOME
                  </Link>
                  <Link href={ "/accountbook/mypage" }>
                    MY
                  </Link>
                </header>
                <div>{ children }</div>
                <AccountBookNavigation />
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
