"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import _ from "lodash"
import BackButton from "@/app/accountbook/header/BackButton"
import Title from "@/app/accountbook/header/Title"
import Header from "@/app/accountbook/header/Header"
import { useForm } from "react-hook-form"
import { Input } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import AssetCategoryForm from "@/app/accountbook/assetcategory/AssetCategoryForm"
import Container from "@/components/Container"
import { MESSAGE } from "@/common/domains/Messages"
import { AssetCategoryApi } from "@/accountbook/apis/assetcategory/AssetCategoryApi"

interface RegisterForm {
  name: string,
  budgetPrice?: number,
}

export default function AssetCategory() {
  const queryClient = useQueryClient()
  const [ isFocus, setIsFocus ] = useState(false)
  const [ isButtonClicked, setIsButtonClicked ] = useState(false)
  const { register, handleSubmit, setValue } = useForm<RegisterForm>({ mode: "onChange" })

  const { data: categories } = useQuery({
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
    <Container>
      <Header>
        <BackButton />
        <Title title="자산 카테고리 관리" />
        <div style={{width: "33%", height: "100%"}}></div>
      </Header>
      <main style={{padding: "2px"}}>
        <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
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
            style={{flex: 1}}
          >
            <Input
              type="text"
              {...register("name")}
              placeholder={isFocus ? "이름" : "추가"}
              style={{textAlign: "center"}}
              autoComplete="off"
            />
            {isFocus && (<>
              <div style={{display: "flex", alignItems: "center", marginTop: "8px"}}>
                <span style={{width: "20%", minWidth: "40px", textAlign: "center", fontSize: "14px"}}>예산</span>
                <Input
                  type="text"
                  {...register("budgetPrice")}
                  placeholder="선택 입력"
                  style={{flex: 1, textAlign: "center"}}
                  autoComplete="off"
                />
              </div>
              <Button
                onMouseDown={() => setIsButtonClicked(true)}
                onClick={handleSubmit(f => onRegisterSubmit(f))}
                style={{marginTop: "8px", width: "100%"}}
              >저장</Button>
            </>)}
          </form>
        </div>
      </main>
    </Container>
  )
}
