import type { Metadata } from "next"
import "@/app/globals.css"
import { ReactNode } from "react"
import QueryProvider from "@/app/QueryProvider"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import LoadSpinner from "@/app/LoadSpinner"
import Link from "next/link"
import AuthProvider from "@/app/AuthProvider"
import AccountBookNavigation from "@/app/accountbook/AccountBookNavigation"

export const metadata: Metadata = {
  title: "hiel-side-client-web",
  description: "hiel-side-client-web",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode,
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <AuthProvider>
            <div
              style={{
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <header
                style={{
                  position: "sticky",
                  top: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "50px",
                  padding: "0 20px",
                  background: "white",
                }}
              >
                <Link href={"/accountbook"}>
                  HOME
                </Link>
                <Link href={"/accountbook/mypage"}>
                  MY
                </Link>
              </header>
              <div>
                {children}
              </div>
              <AccountBookNavigation />
            </div>
            <LoadSpinner />
            <ReactQueryDevtools />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
