"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TransactionCategoryApi } from "@/accountbook/apis/transactioncategory/TransactionCategoryApi"
import _ from "lodash"
import BackButton from "@/app/accountbook/header/BackButton"
import Title from "@/app/accountbook/header/Title"
import Header from "@/app/accountbook/header/Header"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import TransactionCategoryForm from "@/app/accountbook/transactioncategory/TransactionCategoryForm"
import Container from "@/components/Container"
import { MESSAGE } from "@/common/domains/Messages"
import { TransactionCategoryGetAllResponseDetail } from "@/accountbook/apis/transactioncategory/TransactionCategoryApiDomains"
import InputBox from "@/common/components/InputBox"
import { Box } from "@chakra-ui/react"

interface RegisterForm {
  name: string,
}

export default function TransactionCategory() {
  const queryClient = useQueryClient()
  const [isFocus, setIsFocus] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const {control, handleSubmit, setValue} = useForm<RegisterForm>({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  })

  const {data: categories}: {data: TransactionCategoryGetAllResponseDetail[] | undefined} = useQuery({
    queryKey: [TransactionCategoryApi.QUERY_KEYS.GET_ALL],
    queryFn: () => TransactionCategoryApi.getAll(),
    select: data => data.validateAndGetData()?.list,
  })

  const validate = (data: RegisterForm): boolean => {
    let isValid = true
    if (!data.name) {
      isValid = false
      alert(MESSAGE.getMessage(MESSAGE.FORM.INPUT_REQUIRED_NAME))
    }
    return isValid
  }
  const onRegisterSubmit = (data: RegisterForm) => {
    if (!validate(data)) { return }
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
      queryClient.invalidateQueries({queryKey: [TransactionCategoryApi.QUERY_KEYS.GET_ALL]}).then()
    },
  })

  return (
    <Container backgroundColor={"white"}>
      <Header backgroundColor={"white"}>
        <BackButton />
        <Title title="내역 카테고리 관리" />
        <Box style={{width: "33%", height: "100%"}}></Box>
      </Header>
      <Box style={{ marginTop: "10px" }}>
        <Box style={{display: "flex", flexDirection: "column", gap: "8px"}}>
          {categories && (<>
            {_.map(categories, category => (
              <TransactionCategoryForm category={ category } queryClient={ queryClient } key={ category.id } />
            ))}
          </>)}
          <form
            onFocus={() => setIsFocus(true)}
            onBlur={e => {
              if (!e.currentTarget.contains(e.relatedTarget as Node) && !isButtonClicked) {
                setIsFocus(false)
                setValue("name", "")
              }
            }}
            style={{flex: 1}}
          >
            <InputBox
              name="name"
              type="text"
              control={control}
              label={isFocus ? "이름" : "추가"}
              styles={{textAlign: "center"}}
            />
            {isFocus && (<Button
              onMouseDown={() => setIsButtonClicked(true)} onClick={handleSubmit(f => onRegisterSubmit(f))}
              style={{marginTop: "8px", width: "100%"}}>저장
            </Button>)}
          </form>
        </Box>
      </Box>
    </Container>
  )
}
