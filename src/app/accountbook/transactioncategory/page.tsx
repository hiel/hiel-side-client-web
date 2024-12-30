"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TransactionCategoryApi } from "@/accountbook/apis/transactioncategory/TransactionCategoryApi"
import { TransactionCategoryGetAllResponse } from "@/accountbook/apis/transactioncategory/TransactionCategoryApiDomains"
import _ from "lodash"
import BackButton from "@/app/accountbook/header/BackButton"
import Title from "@/app/accountbook/header/Title"
import Header from "@/app/accountbook/header/Header"
import { useForm } from "react-hook-form"
import { Input } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import CategoryForm from "@/app/accountbook/transactioncategory/CategoryForm"

interface RegisterForm {
  name: string,
}

export default function TransactionCategory() {
  const queryClient = useQueryClient()
  const [ isFocus, setIsFocus ] = useState(false)
  const [ isButtonClicked, setIsButtonClicked ] = useState(false)
  const { register, handleSubmit, setValue } = useForm<RegisterForm>({ mode: "onChange" })

  const { data: categories } = useQuery({
    queryKey: [TransactionCategoryApi.QUERY_KEYS.GET_ALL],
    queryFn: () => TransactionCategoryApi.getAll(),
    select: (data) => {
      if (!data.isSuccessAndHasData()) {
        alert(data.message)
        return
      }
      return (data.data as TransactionCategoryGetAllResponse).list
    },
  })

  const onRegisterSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data)
  }
  const registerMutation = useMutation({
    mutationFn: (data: RegisterForm) => TransactionCategoryApi.register(data),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      setIsButtonClicked(false)
      setIsFocus(false)
      setValue("name", "")
      queryClient.invalidateQueries({ queryKey: [TransactionCategoryApi.QUERY_KEYS.GET_ALL] }).then()
    },
  })

  return ( <>
    <Header>
      <BackButton />
      <Title title="내역 카테고리 관리" />
      <div style={{ position: "absolute", right: 0 }}></div>
    </Header>
    <main style={{ padding: "2px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        { categories && ( <>
          {_.map(categories, category => (
            <CategoryForm category={ category } queryClient={queryClient} key={ category.id } />
          ))}
        </> )}
        <form style={{ flex: 1 }}>
          <Input
            type="text"
            onFocus={ () => setIsFocus(true) }
            { ...register("name", {
              onBlur: () => {
                if (!isButtonClicked) {
                  setIsFocus(false)
                }
              },
            })}
            placeholder="추가"
            style={{ textAlign: "center" }}
            autoComplete="off"
          />
          { isFocus && <div style={{ marginTop: "8px" }}>
            <Button
              onMouseDown={ () => setIsButtonClicked(true) }
              onClick={ handleSubmit(f => onRegisterSubmit(f)) }
              style={{ width: "100%" }}
            >저장</Button>
          </div> }
        </form>
      </div>
    </main>
  </>
)
}
