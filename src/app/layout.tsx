import type { Metadata } from "next"
import "@/app/globals.css"
import { ReactNode } from "react"
import QueryProvider from "@/app/QueryProvider"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import LoadSpinner from "@/app/LoadSpinner"
import Navigation from "@/app/Navigation"
import Link from "next/link"
import AuthProvider from "@/app/AuthProvider"

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
            <Link href={"/"}>
              home
            </Link>
            <Navigation />
            {children}
            <LoadSpinner />
            <ReactQueryDevtools />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
