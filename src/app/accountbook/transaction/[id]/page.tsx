"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { AssetCategoryApi } from "@/accountbook/apis/assetcategory/AssetCategoryApi"
import { TransactionCategoryApi } from "@/accountbook/apis/transactioncategory/TransactionCategoryApi"
import dayjs from "dayjs"
import { getSortedIncomeExpenseTypeExternal, IncomeExpenseType } from "@/accountbook/domains/IncomeExpenseType"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useEffect } from "react"
import _ from "lodash"
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import { DateTimeUtility } from "@/common/utilities/DateTimeUtility"
import SelectBox from "@/common/components/SelectBox"
import RadioCard from "@/common/components/RadioCard"
import { Button } from "@/components/ui/button"
import InputBox from "@/common/components/InputBox"
import styled from "styled-components"
import { TransactionApi } from "@/accountbook/apis/transaction/TransactionApi"
import { TransactionRegisterRequest, TransactionUpdateRequest } from "@/accountbook/apis/transaction/TransactionApiDomains"
import { useRouter } from "next/navigation"
import ErrorMessage from "@/app/accountbook/transaction/[id]/ErrorMessage"
import { StringUtility } from "@/common/utilities/StringUtility"
import Header from "@/app/accountbook/header/Header"
import BackButton from "@/app/accountbook/header/BackButton"
import Title from "@/app/accountbook/header/Title"
import Container from "@/components/Container"
import { MESSAGE } from "@/common/domains/Messages"
import HielSwitch from "@/common/components/HielSwitch"
import { Text } from "@chakra-ui/react"

interface TransactionUpsertForm {
  price: string,
  title: string,
  transactionDate: string,
  assetCategoryId: string,
  transactionCategoryId: string,
  incomeExpenseType: IncomeExpenseType,
  isWaste: boolean,
}
function toRegisterRequest(form: TransactionUpsertForm): TransactionRegisterRequest {
  return {
    ...form,
    price: Number(form.price),
    transactionDate: dayjs(form.transactionDate).toDate(),
    assetCategoryId: Number(form.assetCategoryId),
    transactionCategoryId: Number(form.assetCategoryId),
  }
}
function toUpdateRequest({ form, id }: { form: TransactionUpsertForm, id: number }): TransactionUpdateRequest {
  return {
    ...form,
    price: Number(form.price),
    transactionDate: dayjs(form.transactionDate).toDate(),
    assetCategoryId: Number(form.assetCategoryId),
    transactionCategoryId: Number(form.assetCategoryId),
    id: id,
  }
}

const InputContainer = styled.div`
  margin-bottom: 13px;
`

export default function TransactionDetail({ params }: { params: { id: string | undefined } }) {
  const pageType: "REGISTER" | "UPDATE" = params.id === "register" ? "REGISTER" : "UPDATE"
  const router = useRouter()
  const { handleSubmit, control, reset, resetField, setError, watch, formState: { errors } } = useForm<TransactionUpsertForm>({
    mode: "onChange",
    defaultValues: { price: "", title: "", transactionDate: DateTimeUtility.toString({ dayjs: dayjs() }),
      incomeExpenseType: IncomeExpenseType.EXPENSE, isWaste: false },
  })

  const incomeExpenseType = watch("incomeExpenseType")

  const { data: transactionCategories } = useQuery({
    queryKey: [TransactionCategoryApi.QUERY_KEYS.GET_ALL],
    queryFn: () => TransactionCategoryApi.getAll(),
    select: data => data.validateAndGetData()?.list,
  })
  useEffect(() => {
    const category = _.first(transactionCategories)
    if (category) {
      resetField("transactionCategoryId", { defaultValue: String(category.id) })
    }
  }, [transactionCategories, resetField])

  const { data: assetCategories } = useQuery({
    queryKey: [AssetCategoryApi.QUERY_KEYS.GET_ALL],
    queryFn: () => AssetCategoryApi.getAll(),
    select: data => data.validateAndGetData()?.list,
  })
  useEffect(() => {
    const category = _.first(assetCategories)
    if (category) {
      resetField("assetCategoryId", { defaultValue: String(category.id) })
    }
  }, [assetCategories, resetField])

  const { data: transactionDetail } = useQuery({
    queryKey: [TransactionApi.QUERY_KEYS.GET_DETAIL, params.id],
    queryFn: () => TransactionApi.getDetail({ id: Number(params.id) }),
    select: data => data.validateAndGetData(),
    enabled: pageType === "UPDATE",
  })
  useEffect(() => {
    if (pageType !== "UPDATE" || !transactionDetail) { return }
    reset({
      price: String(transactionDetail.price),
      title: transactionDetail.title,
      transactionDate: DateTimeUtility.toString({ dayjs: dayjs(transactionDetail.date) }),
      assetCategoryId: String(transactionDetail.assetCategoryId),
      transactionCategoryId: String(transactionDetail.transactionCategoryId),
      incomeExpenseType: transactionDetail.incomeExpenseType,
      isWaste: transactionDetail.isWaste,
    })
  }, [pageType, transactionDetail, reset])

  const validate = (data: TransactionUpsertForm): boolean => {
    let isValid = true
    if (StringUtility.isBlank(data.price)) {
      isValid = false
      setError("price", { type: "required", message: MESSAGE.getMessage(MESSAGE.TRANSACTION.INPUT_REQUIRED_PRICE) })
    }
    if (StringUtility.isBlank(data.title)) {
      isValid = false
      setError("title", { type: "required", message: MESSAGE.getMessage(MESSAGE.TRANSACTION.INPUT_REQUIRED_TITLE) })
    }
    return isValid
  }

  const onSubmit: SubmitHandler<TransactionUpsertForm> = (data: TransactionUpsertForm) => {
    if (!validate(data)) { return }
    const submitData = { ...data, price: data.price.trim(), title: data.title.trim() }
    if (pageType === "REGISTER") {
      registerMutation.mutate(submitData)
    } else {
      if (confirm("수정하시겠습니까?")) {
        updateMutation.mutate(submitData)
      }
    }
  }

  const registerMutation = useMutation({
    mutationFn: (data: TransactionUpsertForm) => TransactionApi.register(toRegisterRequest(data)),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      alert("등록되었습니다")
      router.back()
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: TransactionUpsertForm) =>
      TransactionApi.update(toUpdateRequest({ id: Number(params.id), form: data })),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      alert("수정되었습니다")
      router.back()
    },
  })

  return (
    <Container>
      <Header>
        <BackButton />
        <Title title={pageType === "REGISTER" ? "내역 등록" : "내역 수정"} />
        <div style={{width: "33%", height: "100%"}}></div>
      </Header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer style={{marginTop: "10px"}}>
            <InputBox name="price" type="number" label="금액" control={ control } />
            <ErrorMessage message={ errors.price?.message }/>
          </InputContainer>

          <InputContainer>
            <InputBox name="title" type="text" label="내역" control={ control } />
            <ErrorMessage message={ errors.title?.message }/>
          </InputContainer>

          <InputContainer>
            <Controller
              name="transactionDate"
              control={ control }
              render={({field: { value, onChange }}) => (
                <DatePicker
                  selected={ dayjs(value).toDate() }
                  onChange={ v => onChange(DateTimeUtility.toString({dayjs: dayjs(v)})) }
                  maxDate={ dayjs().add(1, "month").endOf("month").toDate() }
                  dateFormat="yyyy. MM. dd"
                />
              )}
            />
          </InputContainer>

          {transactionCategories && (
            <InputContainer style={{ display: "flex", gap: "10px" }}>
              <SelectBox
                name="transactionCategoryId"
                items={_.map(
                  (pageType === "UPDATE" && transactionDetail)
                    ? _.uniqBy(
                      _.concat({
                        id: transactionDetail.transactionCategoryId,
                        name: transactionDetail.transactionCategoryName,
                        budgetPrice: transactionDetail.transactionCategoryBudgetPrice,
                      }, transactionCategories),
                      "id",
                    )
                    : transactionCategories,
                  v => ({ label: v.name, value: v.id }),
                )}
                placeholder="내역 타입을 등록해주세요"
                wrapperStyles={{ flex: 1 }}
                control={ control }
              />
              <Button onClick={() => router.push("/accountbook/transactioncategory")} style={{ width: "50px" }}>관리</Button>
            </InputContainer>
          )}

          {assetCategories && (
            <InputContainer style={{display: "flex", gap: "10px"}}>
              <SelectBox
                name="assetCategoryId"
                items={_.map(
                  (pageType === "UPDATE" && transactionDetail)
                    ? _.uniqBy(
                      _.concat({
                        id: transactionDetail.assetCategoryId,
                        name: transactionDetail.assetCategoryName,
                        budgetPrice: transactionDetail.assetCategoryBudgetPrice,
                      }, assetCategories),
                      "id",
                    )
                    : assetCategories,
                  v => ({ label: v.name, value: v.id }),
                )}
                placeholder="자산 타입을 등록해주세요"
                wrapperStyles={{ flex: 1 }}
                control={ control }
              />
              <Button onClick={ () => router.push("/accountbook/assetcategory") } style={{ width: "50px" }}>관리</Button>
            </InputContainer>
          )}

          <InputContainer>
            <RadioCard
              name="incomeExpenseType"
              items={_.map(getSortedIncomeExpenseTypeExternal(),
                v => ({label: v.name, value: String(v.type), styles: {color: v.color}}))}
              control={control}
            />
          </InputContainer>

          {incomeExpenseType === IncomeExpenseType.EXPENSE && (
            <InputContainer style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 10px"}}>
              <Text style={{fontSize: "14px"}}>낭비</Text>
              <HielSwitch name="isWaste" control={control} />
            </InputContainer>
          )}

          <InputContainer
            style={{
              position: "fixed",
              bottom: 0,
              width: "calc(100% - 20px)",
              marginBottom: "10px",
            }}
          >
            <Button type="submit" style={{width: "100%"}}>
              {pageType === "REGISTER" ? "등록" : "수정"}
            </Button>
          </InputContainer>
        </form>
      </main>
    </Container>
  )
}
