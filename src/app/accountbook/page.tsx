"use client"

import AccountBookNavigation from "@/app/accountbook/AccountBookNavigation"
import Header from "@/app/accountbook/header/Header"
import { Image } from "@chakra-ui/react"
import Container from "@/app/accountbook/Container"
import { useRouter } from "next/navigation"

export default function AccountBookHome() {
  const router = useRouter()

  return (
    <div>
      <Container>
        <Header>
          <Image
            onClick={ () => router.push("/accountbook/user/mypage") }
            src="/images/user.png"
            style={{ position: "absolute", right: 0, width: "40px" }}
          />
        </Header>
      </Container>
      <AccountBookNavigation />
    </div>
  )
}
