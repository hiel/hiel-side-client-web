"use client"

import { useRouter } from "next/navigation"
import { Box, Image } from "@chakra-ui/react"

export default function BackButton({ url }: { url?: string }) {
  const router = useRouter()

  return (
    <Box style={{ display: "flex", alignItems: "center", width: "33%", height: "100%" }}>
      <Image
        src="/images/back-arrow.png"
        onClick={ () => url ? router.push(url) : router.back() }
        style={{ width: "15px" }}
      />
    </Box>
  )
}
