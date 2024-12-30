"use client"

import { useRouter } from "next/navigation"
import { Image } from "@chakra-ui/react"

export default function BackButton() {
  const router = useRouter()

  return (
    <Image src="/images/return-button.png" onClick={() => router.back()} style={{ position: "absolute", left: 0, width: "15px" }} />
  )
}
