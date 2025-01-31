"use client"

import AccountBookNavigation from "@/app/accountbook/AccountBookNavigation"
import Header from "@/app/accountbook/header/Header"
import { Image, Stack, Text } from "@chakra-ui/react"
import Container from "@/components/Container"
import UserModal from "@/app/accountbook/UserModal"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { HomeApi } from "@/accountbook/apis/home/HomeApi"
import TransactionStartDayFormModal from "@/app/accountbook/TransactionStartDayFormModal"
import { VictoryPie } from "victory"
import { ValidationUtility } from "@/common/utilities/ValidationUtility"

export default function AccountBookHome() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isStartDayModalOpen, setIsStartDayModalOpen] = useState(false)
  const [hasBudget, setHasBudget] = useState(false)
  const [pieGraphData, setPieGraphData] = useState<{y: number;}[]>([])
  const [balance, setBalance] = useState<number>()
  const [totalExpense, setTotalExpense] = useState<number>()

  const {data: home} = useQuery({
    queryKey: [HomeApi.QUERY_KEYS.GET_HOME],
    queryFn: () => HomeApi.getHome(),
    select: data => data.validateAndGetData(),
  })

  useEffect(() => {
    if (!home) { return }
    setHasBudget(home.budget !== null && home.balance !== null)

    if (home?.budget && home?.balance) {
      setPieGraphData([
        { y: (home.totalExpense / home.budget) },
        { y: (home.balance / home.budget) },
      ])
      setBalance(home.balance)
      setTotalExpense(home.totalExpense)
    }
  }, [home])

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
            {hasBudget && (<>
              <svg viewBox="0 0 400 200" style={{marginBottom: "10px"}}>
                <VictoryPie
                  standalone={false}
                  startAngle={90}
                  endAngle={-90}
                  innerRadius={80}
                  padAngle={2}
                  cornerRadius={5}
                  labels={[]}
                  data={pieGraphData}
                  theme={{pie: {colorScale: ["pink", "green"]}}}
                />
              </svg>
              <Stack direction="row" style={{display: "flex", justifyContent: "space-between", padding: "0 30px"}}>
                <Text style={{fontSize: "14px"}}>잔액 {balance!.toLocaleString("ko")}원</Text>
                <Text style={{fontSize: "14px"}}>지출 {totalExpense!.toLocaleString("ko")}원</Text>
              </Stack>
            </>)}
          </main>
        )}
      </Container>
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        isStartDayModalOpenState={[isStartDayModalOpen, setIsStartDayModalOpen]}
      />
      <TransactionStartDayFormModal isOpen={isStartDayModalOpen} onClose={() => setIsStartDayModalOpen(false)}/>
      <AccountBookNavigation/>
    </div>
  )
}
