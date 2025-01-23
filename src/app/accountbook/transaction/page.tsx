"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { TransactionApi } from "@/accountbook/apis/transaction/TransactionApi"
import InfiniteScroll from "react-infinite-scroll-component"
import dayjs from "dayjs"
import styled from "styled-components"
import { IncomeExpenseType } from "@/accountbook/domains/IncomeExpenseType"
import { QueryUtility } from "@/common/utilities/QueryUtility"
import { TransactionGetSliceResponse } from "@/accountbook/apis/transaction/TransactionApiDomains"
import _ from "lodash"
import BackButton from "@/app/accountbook/header/BackButton"
import Title from "@/app/accountbook/header/Title"
import Header from "@/app/accountbook/header/Header"
import { Button, Image } from "@chakra-ui/react"
import { hasContent } from "@/common/apis/ApiDomains"
import { useRouter, useSearchParams } from "next/navigation"
import Container from "@/app/accountbook/Container"
import { DATETIME_FORMAT, DateTimeUtility } from "@/common/utilities/DateTimeUtility"

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
      if (!response.isSuccessAndHasData()) {
        alert(response.message)
        return
      }
      return response.data as TransactionGetSliceResponse
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage && lastPage.slice.hasNext ? allPages.length + 1 : undefined
    },
  })

  return (
    <Container>
      <Header>
        <BackButton url="/accountbook"/>
        <Title title="내역"/>
        {transactions && QueryUtility.isInfiniteLoaded(transactions) && (
          <div style={{ width: "33%", height: "100%", fontSize: "14px" }}>시작일: {transactions.pages[0]!.transactionStartDay}</div>
        )}
      </Header>
      <main>
        {transactions && QueryUtility.isInfiniteLoaded(transactions) && (<>
          <div
            style={{
              position: "sticky",
              top: "50px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "35px",
              fontSize: "14px",
              background: "white",
            }}
          >
            <Image
              src="/images/left-arrow.png"
              onClick={() => router.push(
                "/accountbook/transaction?date="
                + DateTimeUtility.toString({
                  dayjs: DateTimeUtility.toDate(transactions.pages[0]!.transactionMonthlyRange[0]).subtract(1, "day"),
                  format: DATETIME_FORMAT.DATE,
                })
              )}
              style={{position: "absolute", left: 0, width: "15px"}}
            />
            <h1 style={{textAlign: "center", flexGrow: 1}}>
              {dayjs(transactions.pages[0]!.transactionMonthlyRange[0]).format("YY.MM.DD")
                + " ~ " + dayjs(transactions.pages[0]!.transactionMonthlyRange[1]).format("MM.DD")}
            </h1>
            <Image
              src="/images/right-arrow.png"
              onClick={() => router.push(
                "/accountbook/transaction?date="
                + DateTimeUtility.toString({
                  dayjs: DateTimeUtility.toDate(transactions.pages[0]!.transactionMonthlyRange[1]).add(1, "day"),
                  format: DATETIME_FORMAT.DATE,
                })
              )}
              style={{position: "absolute", right: 0, width: "15px"}}
            />
          </div>

          {hasContent(_.first(transactions.pages)!.slice) ? (
            <ul>
              <InfiniteScroll
                next={fetchNextPage}
                hasMore={hasNextPage}
                dataLength={transactions.pages.length}
                loader={<></>}
              >
                {_.map(transactions.pages, page => page && (
                  _.map(page.slice.content, (transaction, index) => (
                    <li
                      onClick={() => router.push(`/accountbook/transaction/${transaction.id}`)}
                      style={{
                        marginBottom: "5px",
                        padding: "10px",
                        ...(index <= page.slice.content.length ? {borderBottom: "1px #D6D6D6 solid"} : {}),
                      }}
                      key={index}
                    >
                      <div style={{display: "flex"}}>
                        <TransactionText style={{flex: 0.25}}>
                          {`${DateTimeUtility.toDate(transaction.date).month() + 1}.${DateTimeUtility.toDate(transaction.date).date()}`}
                        </TransactionText>
                        <TransactionText style={{flex: 0.8}}>{transaction.title}</TransactionText>
                        <TransactionText style={{flex: 0.1}}>
                          {(transaction.incomeExpenseType === IncomeExpenseType.INCOME ? "+" : "-")
                            + transaction.price.toLocaleString("ko")}
                        </TransactionText>
                      </div>
                      <div style={{display: "flex"}}>
                        <TransactionSubText>{transaction.transactionCategoryName}</TransactionSubText>
                        <TransactionSubText>{transaction.assetCategoryName}</TransactionSubText>
                        <TransactionSubText>{transaction.isWaste ? "낭비" : ""}</TransactionSubText>
                      </div>
                    </li>
                  ))
                ))}
              </InfiniteScroll>
            </ul>
          ) : (
            <div style={{ textAlign: "center", padding: "30px 0", color: "#A8A8A8", fontSize: "14px" }}>내역이 없습니다</div>
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
