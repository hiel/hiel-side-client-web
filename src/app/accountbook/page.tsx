"use client"

import AccountBookNavigation from "@/app/accountbook/AccountBookNavigation"
import Header from "@/app/accountbook/header/Header"
import { Image } from "@chakra-ui/react"
import Container from "@/components/Container"
import UserModal from "@/app/accountbook/UserModal"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { HomeApi } from "@/accountbook/apis/home/HomeApi"

export default function AccountBookHome() {
  const [ isModalOpen, setIsModalOpen ] = useState(false)

  const { data: home } = useQuery({
    queryKey: [HomeApi.QUERY_KEYS.GET],
    queryFn: () => HomeApi.get(),
    select: data => data.validateAndGetData(),
  })

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
        {home && (
          <main>
            {String(Object.entries(home))}
          </main>
        )}
      </Container>
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AccountBookNavigation />
    </div>
  )
}
