"use client"

import { useQuery } from "@tanstack/react-query"
import { TransactionCategoryApi } from "@/accountbook/apis/transactioncategory/TransactionCategoryApi"
import { TransactionCategoryGetAllResponse } from "@/accountbook/apis/transactioncategory/TransactionCategoryApiDomains"
import _ from "lodash"
import { Box } from "@chakra-ui/react"

export default function TransactionCategory() {
  const { data: transactionCategories } = useQuery({
    queryKey: ["TransactionCategoryApi.getAll"],
    queryFn: () => TransactionCategoryApi.getAll(),
    select: (data) => {
      if (!data.isSuccessAndHasData()) {
        alert(data.message)
        return
      }
      return (data.data as TransactionCategoryGetAllResponse).list
    },
  })

  return (
    <main>
      { transactionCategories && _.map(transactionCategories, (transactionCategory, index) => (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            height: "50px",
            paddingLeft: "10px",
            ...(index <= transactionCategories.length ? { borderBottom: "1px #D6D6D6 solid" } : {}),
          }}
          key={index}
        >{ transactionCategory.name }</Box>
      ))}
    </main>
  )
}
