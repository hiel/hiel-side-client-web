"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { TransactionApi } from "@/accountbook/apis/transaction/TransactionApi"
import InfiniteScroll from "react-infinite-scroll-component"
import dayjs from "dayjs"
import styled from "styled-components"
import { IncomeExpenseType } from "@/accountbook/domains/IncomeExpenseType"
import { QueryUtility } from "@/common/utilities/QueryUtility"
import _ from "lodash"
import BackButton from "@/app/accountbook/header/BackButton"
import Title from "@/app/accountbook/header/Title"
import Header from "@/app/accountbook/header/Header"
import { Box, Button, Image } from "@chakra-ui/react"
import { hasContent } from "@/common/apis/ApiDomains"
import { useRouter, useSearchParams } from "next/navigation"
import Container from "@/components/Container"
import { DATETIME_FORMAT, DateTimeUtility } from "@/common/utilities/DateTimeUtility"
import { TransactionUtility } from "@/accountbook/utilities/TransactionUtility"

const TransactionText = styled.span`
  display: inline-flex;
  align-items: baseline;
  font-size: 15px;
  font-weight: 500;
`
const TransactionSubText = styled.span`
  display: inline-flex;
  flex: 1;
  font-size: 13px;
  color: #A8A8A8;
`

export default function Transactions() {
  const router = useRouter()
  const date = useSearchParams().get("date")

  const { data: transactions, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [TransactionApi.QUERY_KEYS.GET_SLICE, date],
    queryFn: async ({ pageParam }) => {
      const response = await TransactionApi.getSlice({
        page: pageParam,
        pageSize: 30,
        ...(date !== null && { date: date }),
      })
      return response.validateAndGetData()
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage && lastPage.slice.hasNext ? allPages.length + 1 : undefined
    },
  })

  return (
    <Container>
      <Header>
        <BackButton url="/accountbook" />
        <Title title="내역" />
        <Box style={{width: "33%", height: "100%"}}></Box>
      </Header>
      <main>
        {transactions && QueryUtility.isInfiniteLoaded(transactions) && (<>
          <Box
            style={{
              position: "sticky",
              top: "50px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              height: "35px",
              fontSize: "14px",
            }}
          >
            <Image
              src="/images/left-arrow.png"
              style={{position: "absolute", left: 0, width: "15px"}}
              onClick={() => router.push(
                "/accountbook/transaction?date="
                + DateTimeUtility.toString({
                  dayjs: dayjs(transactions.pages[0]!.transactionMonthlyRange.start).subtract(1, "day"),
                  format: DATETIME_FORMAT.DATE,
                })
              )}
            />
            <h1 style={{textAlign: "center", flexGrow: 1}}>
              {DateTimeUtility.isBetween({ range: transactions.pages[0]!.transactionMonthlyRange })
                ? "이번달" : TransactionUtility.toTransactionMonthlyRangeStr(transactions.pages[0]!.transactionMonthlyRange)}
            </h1>
            <Image
              src="/images/right-arrow.png"
              style={{position: "absolute", right: 0, width: "15px"}}
              onClick={() => router.push(
                "/accountbook/transaction?date="
                + DateTimeUtility.toString({
                  dayjs: dayjs(transactions.pages[0]!.transactionMonthlyRange.end).add(1, "day"),
                  format: DATETIME_FORMAT.DATE,
                })
              )}
            />
          </Box>

          {hasContent(_.first(transactions.pages)!.slice) ? (
            <ul>
              <InfiniteScroll next={fetchNextPage} hasMore={hasNextPage} dataLength={transactions.pages.length} loader={<></>}>
                {_.map(transactions.pages, page => page && (
                  _.map(page.slice.content, (transaction, index) => (
                    <li
                      onClick={() => router.push(`/accountbook/transaction/${transaction.id}`)}
                      style={{
                        marginBottom: "5px",
                        padding: "15px",
                        backgroundColor: "white",
                        borderRadius: "var(--border-radius)",
                      }}
                      key={index}
                    >
                      <Box style={{display: "flex"}}>
                        <TransactionText style={{flex: 0.25}}>
                          {`${DateTimeUtility.toDate(transaction.date).month() + 1}.${DateTimeUtility.toDate(transaction.date).date()}`}
                        </TransactionText>
                        <TransactionText style={{flex: 0.8}}>{transaction.title}</TransactionText>
                        <TransactionText style={{flex: 0.1}}>
                          {(transaction.incomeExpenseType === IncomeExpenseType.INCOME ? "+" : "-")
                            + transaction.price.toLocaleString("ko")}
                        </TransactionText>
                      </Box>
                      <Box style={{display: "flex"}}>
                        <TransactionSubText>{transaction.transactionCategoryName}</TransactionSubText>
                        <TransactionSubText>{transaction.assetCategoryName}</TransactionSubText>
                        <TransactionSubText>{transaction.isWaste ? "낭비" : ""}</TransactionSubText>
                      </Box>
                    </li>
                  ))
                ))}
              </InfiniteScroll>
            </ul>
          ) : (
            <Box style={{marginTop: "100px", textAlign: "center", padding: "30px 0", color: "#A8A8A8", fontSize: "14px"}}>내역이 없습니다</Box>
          )}
          <Button
            onClick={() => router.push("/accountbook/transaction/register")}
            style={{ position: "fixed", bottom: 0, width: "calc(100% - 20px)", marginBottom: "10px" }}
          >내역 추가</Button>
        </>)}
      </main>
    </Container>
  )
}
