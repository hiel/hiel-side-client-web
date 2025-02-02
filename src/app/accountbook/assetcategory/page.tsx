"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import _ from "lodash"
import BackButton from "@/app/accountbook/header/BackButton"
import Title from "@/app/accountbook/header/Title"
import Header from "@/app/accountbook/header/Header"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import AssetCategoryForm from "@/app/accountbook/assetcategory/AssetCategoryForm"
import Container from "@/components/Container"
import { MESSAGE } from "@/common/domains/Messages"
import { AssetCategoryApi } from "@/accountbook/apis/assetcategory/AssetCategoryApi"
import { AssetCategoryGetAllResponseDetail } from "@/accountbook/apis/assetcategory/AssetCategoryApiDomains"
import InputBox from "@/common/components/InputBox"
import { Box } from "@chakra-ui/react"

interface RegisterForm {
  name: string,
  budgetPrice?: number,
}

export default function AssetCategory() {
  const queryClient = useQueryClient()
  const [isFocus, setIsFocus] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const {control, handleSubmit, setValue} = useForm<RegisterForm>({
    mode: "onChange",
    defaultValues: {
      name: "",
      budgetPrice: undefined,
    },
  })

  const {data: categories}: {data: AssetCategoryGetAllResponseDetail[] | undefined} = useQuery({
    queryKey: [AssetCategoryApi.QUERY_KEYS.GET_ALL],
    queryFn: () => AssetCategoryApi.getAll(),
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
    mutationFn: (data: RegisterForm) => AssetCategoryApi.register(data),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      setIsButtonClicked(false)
      setIsFocus(false)
      setValue("name", "")
      setValue("budgetPrice", undefined)
      queryClient.invalidateQueries({ queryKey: [AssetCategoryApi.QUERY_KEYS.GET_ALL] }).then()
    },
  })

  return (
    <Container backgroundColor="white">
      <Header backgroundColor="white">
        <BackButton />
        <Title title="자산 카테고리 관리" />
        <Box style={{ width: "33%", height: "100%" }}></Box>
      </Header>
      <Box style={{ marginTop: "10px" }}>
        <Box style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {categories && (<>
            {_.map(categories, category => (
              <AssetCategoryForm category={category} queryClient={queryClient} key={category.id} />
            ))}
          </>)}
          <form
            onFocus={() => setIsFocus(true)}
            onBlur={e => {
              if (!e.currentTarget.contains(e.relatedTarget as Node) && !isButtonClicked) {
                setIsFocus(false)
                setValue("name", "")
                setValue("budgetPrice", undefined)
              }
            }}
            style={{ flex: 1 }}
          >
            <InputBox
              name="name"
              type="text"
              control={ control }
              label={ isFocus ? "이름" : "추가" }
              styles={{ textAlign: "center" }}
            />
            {isFocus && (<>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <span
                  style={{
                    width: "20%",
                    minWidth: "40px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  예산
                </span>
                <InputBox
                  name="budgetPrice"
                  type="text"
                  control={ control }
                  label="선택 입력"
                  styles={{ flex: 1, textAlign: "center" }}
                />
              </Box>
              <Button
                onMouseDown={ () => setIsButtonClicked(true) }
                onClick={ handleSubmit(f => onRegisterSubmit(f)) }
                style={{ marginTop: "8px", width: "100%" }}
              >저장</Button>
            </>)}
          </form>
        </Box>
      </Box>
    </Container>
  )
}
