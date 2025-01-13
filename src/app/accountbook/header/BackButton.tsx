"use client"

import { useRouter } from "next/navigation"
import { Image } from "@chakra-ui/react"

export default function BackButton({ url }: { url?: string }) {
  const router = useRouter()

  return (
    <div style={{ display: "flex", alignItems: "center", width: "33%", height: "100%" }}>
      <Image
        src="/images/back-arrow.png"
        onClick={ () => url ? router.push(url) : router.back() }
        style={{ width: "15px" }}
      />
    </div>
  )
}
