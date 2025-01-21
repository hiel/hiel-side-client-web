"use client"

import AccountBookNavigation from "@/app/accountbook/AccountBookNavigation"
import Header from "@/app/accountbook/header/Header"
import { Image } from "@chakra-ui/react"
import Container from "@/app/accountbook/Container"
import UserModal from "@/app/accountbook/UserModal"
import { useState } from "react"

export default function AccountBookHome() {
  const [ isModalOpen, setIsModalOpen ] = useState(false)

  return (
    <div>
      <Container>
        <Header>
          <Image
            onClick={() => setIsModalOpen(!isModalOpen)}
            src="/images/user.png"
            style={{position: "absolute", right: 0, width: "40px"}}
          />
        </Header>
      </Container>
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AccountBookNavigation />
    </div>
  )
}
