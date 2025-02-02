"use client"

import AccountBookNavigation from "@/app/accountbook/AccountBookNavigation"
import Header from "@/app/accountbook/header/Header"
import { Box, Collapsible, Image, Stack, Text } from "@chakra-ui/react"
import Container from "@/components/Container"
import UserModal from "@/app/accountbook/UserModal"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { HomeApi } from "@/accountbook/apis/home/HomeApi"
import TransactionStartDayFormModal from "@/app/accountbook/TransactionStartDayFormModal"
import { VictoryBar, VictoryPie, VictoryStack } from "victory"
import _ from "lodash"
import { useRouter } from "next/navigation"
import { HomeGetResponse, HomeGetResponseAssetCategoryDetail } from "@/accountbook/apis/home/HomeApiDomains"
import { TransactionUtility } from "@/accountbook/utilities/TransactionUtility"

type HomeDetail = Omit<HomeGetResponse, "balance" | "availableExpensePricePerDay" | "isFine"> & {
  balance: number
  availableExpensePricePerDay: number
  isFine: boolean
  assetCategories: Required<HomeGetResponseAssetCategoryDetail>[]
}
function withDefault(response: HomeGetResponse): HomeDetail {
  return {
    ...response,
    balance: response.balance ? response.balance : 0,
    availableExpensePricePerDay: response.availableExpensePricePerDay ? response.availableExpensePricePerDay : 0,
    isFine: response.isFine ? response.isFine : true,
    assetCategories: _.map(response.assetCategories, category => {
      return {
        ...category,
        budget: category.budget ? category.budget : 0,
        balance: category.balance ? category.balance : 0,
        availableExpensePricePerDay: category.availableExpensePricePerDay ? category.availableExpensePricePerDay : 0,
        isFine: category.isFine ? category.isFine : true,
      }
    }),
  }
}

function hasDataToDisplay(data: { totalExpense: number, balance: number }[]): boolean {
  return data.some(item => item.totalExpense + item.balance > 0)
}

function toGraphData (data: { totalExpense: number, balance: number }): { y: number }[] {
  return [
    { y: ( data.totalExpense / ( data.totalExpense + data.balance ) ) },
    ...( data.balance > 0 ? [{ y: ( data.balance / ( data.totalExpense + data.balance ) ) }] : [] ),
  ]
}

export default function AccountBookHome() {
  const router = useRouter()
  const [ isUserModalOpen, setIsUserModalOpen ] = useState(false)
  const [ isStartDayModalOpen, setIsStartDayModalOpen ] = useState(false)
  const [ isAssetCategoryCollapsibleOpen, setIsAssetCategoryCollapsibleOpen ] = useState(false)
  const [ isTransactionCategoryCollapsibleOpen, setIsTransactionCollapsibleOpen ] = useState(false)

  const { data: home }: { data: HomeDetail | undefined } = useQuery({
    queryKey: [ HomeApi.QUERY_KEYS.GET_HOME ],
    queryFn: () => HomeApi.getHome(),
    select: data => {
      const response = data.validateAndGetData()
      if (response !== undefined) {
        return withDefault(response)
      }
    },
  })

  return (<>
    <Container>
      <Header>
        <Image
          src="/images/user.png"
          style={{ position: "absolute", right: 0, height: "calc(100% - 20px)" }}
          onClick={() => {
            if (!isStartDayModalOpen) {
              setIsUserModalOpen(!isUserModalOpen)
            }
          }}
        />
      </Header>

      {home && (
        <Box style={{ marginBottom: "30px" }}>
          <Box style={{ display: "flex", alignItems: "center", height: "35px", marginBottom: "5px" }}>
            <h1 style={{ textAlign: "center", flexGrow: 1, fontSize: "14px" }}>
              {TransactionUtility.toTransactionMonthlyRangeStr(home.transactionMonthlyRange)}
            </h1>
          </Box>

          {hasDataToDisplay([home]) ? (
            <Box style={{ paddingBottom: "15px", backgroundColor: "white", borderRadius: "var(--border-radius)" }}>
              <svg viewBox="0 0 400 200" style={{ marginBottom: "10px" }}>
                <VictoryPie
                  standalone={ false }
                  startAngle={ 90 }
                  endAngle={ -90 }
                  innerRadius={ 80 }
                  padAngle={ home.totalExpense > 0 ? 2 : 0 }
                  cornerRadius={ 5 }
                  labels={ [] }
                  data={ toGraphData(home) }
                  theme={{ pie: { colorScale: ["pink", "green"] } }}
                />
              </svg>
              <Stack
                direction="row"
                style={{ display: "flex", justifyContent: "space-between", padding: "0 30px 10px 30px" }}
              >
                <Text style={{ fontSize: "14px" }}>잔액 ₩{ home.balance.toLocaleString("ko") }</Text>
                <Text style={{ fontSize: "14px" }}>지출 ₩{ home.totalExpense.toLocaleString("ko") }</Text>
              </Stack>
              <Box
                style={{
                  textAlign: "center",
                  fontSize: "13px",
                  color: home.isFine ? "inherit" : "red",
                }}
              >
                하루에 ₩${home.availableExpensePricePerDay.toLocaleString("ko")} 씩 쓸 수 있어요
              </Box>
            </Box>
          ) : (<p>로고(TODO)</p>)}

          {!_.isEmpty(home.assetCategories) && (
            <Collapsible.Root
              open={ isAssetCategoryCollapsibleOpen }
            >
              <Collapsible.Trigger
                onClick={() => setIsAssetCategoryCollapsibleOpen(!isAssetCategoryCollapsibleOpen)}
                style={{ display: "flex", alignItems: "center", height: "50px", marginLeft: "10px" }}
              >
                <span style={{ marginRight: "5px" }}>자산</span>
                <Image
                  src={ "/images/" + (isAssetCategoryCollapsibleOpen ? "up-arrow.png" : "down-arrow.png") }
                  style={{ display: "inline", width: "20px" }}
                />
              </Collapsible.Trigger>
              <Collapsible.Content
                onClick={() => router.push("/accountbook/assetcategory")}
              >
                { _.map(home.assetCategories, (category, index) => {
                  return hasDataToDisplay([category]) ? (
                    <Box
                      style={{
                        marginTop: index !== 0 ? "10px" : "0",
                        padding: "5px",
                        backgroundColor: "white",
                        borderRadius: "var(--border-radius)",
                      }}
                      key={ category.id }
                    >
                      <h1 style={{ paddingLeft: "25px" }}>{ category.name }</h1>
                      <VictoryStack
                        horizontal
                        colorScale={ ["pink", "green"] }
                        height={ 50 }
                        padding={ 25 }
                      >
                        {_.map(_.reverse(toGraphData(category)), (graphData, i) => (
                          <VictoryBar
                            data={ [graphData] }
                            barWidth={ 30 }
                            key={ `${category.id}-${i}` }
                          />
                        ))}
                      </VictoryStack>
                      <Stack
                        direction="row"
                        style={{ display: "flex", justifyContent: "space-between", padding: "0 30px" }}
                      >
                        <Text style={{ fontSize: "14px" }}>잔액 ₩{ category.balance.toLocaleString("ko") }</Text>
                        <Text style={{ fontSize: "14px" }}>지출 ₩{ category.totalExpense.toLocaleString("ko") }</Text>
                      </Stack>
                    </Box>
                  ) : (
                    <Box
                      style={{
                        display: "flex",
                        marginTop: index !== 0 ? "10px" : "0",
                        padding: "5px 30px",
                        backgroundColor: "white",
                        borderRadius: "var(--border-radius)",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      key={ category.id }
                    >
                      <h1>{ category.name }</h1>
                      <Text style={{ fontSize: "14px" }}>₩{ category.totalExpense.toLocaleString("ko") }</Text>
                    </Box>
                  )
                })}
              </Collapsible.Content>
            </Collapsible.Root>
          )}

          {!_.isEmpty(home.transactionCategories) && (
            <Collapsible.Root
              open={ isTransactionCategoryCollapsibleOpen }
            >
              <Collapsible.Trigger
                onClick={() => setIsTransactionCollapsibleOpen(!isTransactionCategoryCollapsibleOpen)}
                style={{ display: "flex", alignItems: "center", height: "50px", marginLeft: "10px" }}
              >
                <span style={{ marginRight: "5px" }}>내역</span>
                <Image
                  src={ "/images/" + (isTransactionCategoryCollapsibleOpen ? "up-arrow.png" : "down-arrow.png") }
                  style={{ display: "inline", width: "20px" }}
                />
              </Collapsible.Trigger>
              <Collapsible.Content
                onClick={() => router.push("/accountbook/transactioncategory")}
              >
                { _.map(home.transactionCategories, (category, index) => (
                  <Box
                    style={{
                      display: "flex",
                      marginTop: index !== 0 ? "10px" : "0",
                      padding: "5px 30px",
                      backgroundColor: "white",
                      borderRadius: "var(--border-radius)",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    key={ category.id }
                  >
                    <h1>{ category.name }</h1>
                    <Text style={{ fontSize: "14px" }}>₩{ category.totalExpense.toLocaleString("ko") }</Text>
                  </Box>
                )) }
              </Collapsible.Content>
            </Collapsible.Root>
          )}
        </Box>
      )}
    </Container>
    <UserModal
      isOpen={ isUserModalOpen }
      onClose={() => setIsUserModalOpen(false)}
      isStartDayModalOpenState={ [isStartDayModalOpen, setIsStartDayModalOpen] }
    />
    <TransactionStartDayFormModal
      isOpen={ isStartDayModalOpen }
      onClose={() => setIsStartDayModalOpen(false)}
    />
    <AccountBookNavigation />
  </>)
}
