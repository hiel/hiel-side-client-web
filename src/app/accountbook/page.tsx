"use client"

import AccountBookNavigation from "@/app/accountbook/AccountBookNavigation"
import Header from "@/app/accountbook/header/Header"
import { Image } from "@chakra-ui/react"
import Container from "@/components/Container"
import UserModal from "@/app/accountbook/UserModal"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { HomeApi } from "@/accountbook/apis/home/HomeApi"
import TransactionStartDayFormModal from "@/app/accountbook/TransactionStartDayFormModal"

export default function AccountBookHome() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isStartDayModalOpen, setIsStartDayModalOpen] = useState(false)

  const {data: home} = useQuery({
    queryKey: [HomeApi.QUERY_KEYS.GET_HOME],
    queryFn: () => HomeApi.getHome(),
    select: data => data.validateAndGetData(),
  })

  return (
    <div>
      <Container>
        <Header>
          <Image
            onClick={() => {
              if (!isStartDayModalOpen) {
                setIsUserModalOpen(!isUserModalOpen)
              }
            }}
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
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        isStartDayModalOpenState={[isStartDayModalOpen, setIsStartDayModalOpen]}
      />
      <TransactionStartDayFormModal isOpen={isStartDayModalOpen} onClose={() => setIsStartDayModalOpen(false)} />
      <AccountBookNavigation />
    </div>
  )
}
