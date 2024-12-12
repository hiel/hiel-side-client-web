"use client"

import { useSearchParams } from "next/navigation"
import { useInfiniteQuery } from "@tanstack/react-query"
import { TransactionApi } from "@/accountbook/apis/transaction/TransactionApi"
import InfiniteScroll from "react-infinite-scroll-component"
import Link from "next/link"
import dayjs from "dayjs"
import { DateTimeUtility } from "@/common/utilities/DateTimeUtility"
import styled from "styled-components"
import { IncomeExpenseType } from "@/accountbook/domains/IncomeExpenseType"
import { QueryUtility } from "@/common/utilities/QueryUtility"

export default function Transactions() {
  const yearMonth = useSearchParams().get("yearMonth")

  const {
    data: transactions,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["TransactionApi.getSlice", yearMonth],
    queryFn: async ({ pageParam }) => {
      const response = await TransactionApi.getSlice({
        request: {
          page: pageParam,
          pageSize: 30,
          ...(yearMonth !== null && { transactionDateTime: new Date(yearMonth) }),
        },
      })
      if (!response.isSuccess() || !response.data) {
        alert(response.message)
        return
      }
      return response.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage && lastPage.slice.hasNext ? allPages.length + 1 : undefined
    },
  })

  const getYearMonth = () => {
    return dayjs(transactions!.pages[0]!.transactionDatetime)
  }

  const isFutureAfter = ({
    month,
  }: {
    month: number,
  }) => {
    return DateTimeUtility.initializeTime({ datetime: dayjs() }).add(month, "month").date(1)
      .isAfter(DateTimeUtility.initializeTime({ datetime: getYearMonth() }).date(1))
  }

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

  return (
    <main>
      { transactions && QueryUtility.isInfiniteLoaded({ data: transactions }) && ( <>
        <div
          style={{
            position: "sticky",
            top: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "35px",
            fontSize: "14px",
            color: "#A8A8A8",
            background: "white",
          }}
        >
          <Link
            href={`/accountbook/transactions?yearMonth=${getYearMonth().add(-1, "month").format("YYYY-MM")}`}
            style={{
              textAlign: "left",
            }}
          >
            {"<"}
          </Link>
          <h1
            style={{
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            {dayjs(transactions.pages[0]!.transactionDatetime).format("YY년 MM월")}
          </h1>
          { isFutureAfter({ month: 1 }) ? (
            <Link
              href={`/accountbook/transactions?yearMonth=${getYearMonth().add(1, "month").format("YYYY-MM")}`}
              style={{
                textAlign: "right",
              }}
            >
              {">"}
            </Link>
          ) : <></> }
        </div>
        <ul>
          <InfiniteScroll
            next={fetchNextPage}
            hasMore={hasNextPage}
            dataLength={transactions.pages.length}
            loader={<></>}
          >
            { transactions.pages.map(page => page && (
              page.slice.content.map((transaction, index) => (
                <li
                  style={{
                    marginBottom: "5px",
                    padding: "5px",
                    borderBottom: "1px #D6D6D6 solid",
                  }}
                  key={index}
                >
                  <div>
                    <TransactionText
                      style={{
                        marginRight: "40px",
                      }}
                    >
                      {transaction.date.substring(6, 8)}
                    </TransactionText>
                    <TransactionText
                      style={{
                        width: "400px",
                      }}
                    >
                      {transaction.title}
                    </TransactionText>
                    <TransactionText
                      style={ transaction.incomeExpenseType === IncomeExpenseType.INCOME ? {
                        color: "#6C78E0",
                      } : {
                        color: "#E06C6C",
                      }}
                    >
                      {transaction.price.toLocaleString("ko")}
                    </TransactionText>
                  </div>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <TransactionSubText>{transaction.budgetCategoryName}</TransactionSubText>
                    <TransactionSubText>{transaction.transactionCategoryName}</TransactionSubText>
                    <TransactionSubText>{transaction.isWaste ? "낭비" : ""}</TransactionSubText>
                  </div>
                </li>
              ))
            ))}
          </InfiniteScroll>
        </ul>
      </> )}
    </main>
  )
}
