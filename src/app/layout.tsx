import type { Metadata } from "next"
import "@/app/globals.css"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "hiel-side-client-web",
  description: "hiel-side-client-web",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode,
}>) {
  return (<>{children}</>)
}
