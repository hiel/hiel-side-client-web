"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { BudgetCategoryApi } from "@/accountbook/apis/budgetcategory/BudgetCategoryApi"
import { TransactionCategoryApi } from "@/accountbook/apis/transactioncategory/TransactionCategoryApi"
import dayjs from "dayjs"
import { getSortedIncomeExpenseTypeExternal, IncomeExpenseType } from "@/accountbook/domains/IncomeExpenseType"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useEffect } from "react"
import _ from "lodash"
import { BudgetCategoryGetAllResponse } from "@/accountbook/apis/budgetcategory/BudgetCategoryApiDomains"
import { TransactionCategoryGetAllResponse } from "@/accountbook/apis/transactioncategory/TransactionCategoryApiDomains"
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import { DateTimeUtility } from "@/common/utilities/DateTimeUtility"
import SelectBox from "@/common/components/SelectBox"
import RadioCard from "@/common/components/RadioCard"
import ChckboxCard from "@/common/components/ChckboxCard"
import { Button } from "@/components/ui/button"
import InputBox from "@/common/components/InputBox"
import styled from "styled-components"
import { TransactionApi } from "@/accountbook/apis/transaction/TransactionApi"
import { TransactionRegisterRequest, TransactionUpdateRequest } from "@/accountbook/apis/transaction/TransactionApiDomains"
import { useRouter } from "next/navigation"
import Link from "next/link"
import ErrorMessage from "@/app/accountbook/transaction/[id]/ErrorMessage"
import { StringUtility } from "@/common/utilities/StringUtility"
import Header from "@/app/accountbook/header/Header"
import BackButton from "@/app/accountbook/header/BackButton"
import Title from "@/app/accountbook/header/Title"

interface TransactionUpsertRequestForm {
  price: string,
  title: string,
  transactionDate: string,
  budgetCategoryId: string,
  transactionCategoryId: string,
  incomeExpenseType: IncomeExpenseType,
  isWaste: boolean,
}
function toRegisterRequest(form: TransactionUpsertRequestForm): TransactionRegisterRequest {
  return {
    ...form,
    price: Number(form.price),
    transactionDate: dayjs(form.transactionDate).toDate(),
    budgetCategoryId: Number(form.budgetCategoryId),
    transactionCategoryId: Number(form.budgetCategoryId),
  }
}
function toUpdateRequest({ form, id }: { form: TransactionUpsertRequestForm, id: number }): TransactionUpdateRequest {
  return {
    ...form,
    price: Number(form.price),
    transactionDate: dayjs(form.transactionDate).toDate(),
    budgetCategoryId: Number(form.budgetCategoryId),
    transactionCategoryId: Number(form.budgetCategoryId),
    id: id,
  }
}

const InputContainer = styled.div`
  margin-top: 10px;
`

export default function TransactionDetail({ params }: { params: { id: string | undefined } }) {
  const pageType: "REGISTER" | "UPDATE" = params.id === "register" ? "REGISTER" : "UPDATE"
  const router = useRouter()
  const { handleSubmit, control, reset, resetField, setError, formState: { errors } } = useForm<TransactionUpsertRequestForm>({
    mode: "onChange",
    defaultValues: { price: "", title: "", transactionDate: DateTimeUtility.toString({ dayjs: dayjs() }),
      incomeExpenseType: IncomeExpenseType.EXPENSE, isWaste: false },
  })

  const { data: budgetCategories } = useQuery({
    queryKey: [TransactionCategoryApi.QUERY_KEYS.GET_ALL],
    queryFn: () => BudgetCategoryApi.getAll(),
    select: (data) => {
      if (!data.isSuccessAndHasData()) {
        alert(data.message)
        return
      }
      return (data.data as BudgetCategoryGetAllResponse).list
    },
  })
  useEffect(() => {
    const category = _.first(budgetCategories)
    if (category) {
      resetField("budgetCategoryId", { defaultValue: String(category.id) })
    }
  }, [budgetCategories, resetField])

  const { data: transactionCategories } = useQuery({
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
  useEffect(() => {
    const category = _.first(transactionCategories)
    if (category) {
      resetField("transactionCategoryId", { defaultValue: String(category.id) })
    }
  }, [transactionCategories, resetField])

  const { data: transactionDetail } = useQuery({
    queryKey: [TransactionApi.QUERY_KEYS.GET_DETAIL, params.id],
    queryFn: () => TransactionApi.getDetail({ id: Number(params.id) }),
    select: (data) => {
      if (!data.isSuccessAndHasData()) {
        alert(data.message)
        return
      }
      return data.data
    },
    enabled: pageType === "UPDATE",
  })
  useEffect(() => {
    if (pageType !== "UPDATE" || !transactionDetail) { return }
    reset({
      price: String(transactionDetail.price),
      title: transactionDetail.title,
      transactionDate: DateTimeUtility.toString({ dayjs: dayjs(transactionDetail.date) }),
      budgetCategoryId: String(transactionDetail.budgetCategoryId),
      transactionCategoryId: String(transactionDetail.transactionCategoryId),
      incomeExpenseType: transactionDetail.incomeExpenseType,
      isWaste: transactionDetail.isWaste,
    })
  }, [pageType, transactionDetail, reset])

  const validate = (data: TransactionUpsertRequestForm): boolean => {
    let isValid = true
    if (StringUtility.isBlank(data.price)) {
      isValid = false
      setError("price", { type: "required", message: "금액을 입력해주세요" })
    }
    if (StringUtility.isBlank(data.title)) {
      isValid = false
      setError("title", { type: "required", message: "내역을 입력해주세요" })
    }
    return isValid
  }

  const onSubmit: SubmitHandler<TransactionUpsertRequestForm> = (data: TransactionUpsertRequestForm) => {
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
    mutationFn: (data: TransactionUpsertRequestForm) => TransactionApi.register(toRegisterRequest(data)),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      alert("수정되었습니다")
      router.push("/accountbook/transaction")
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: TransactionUpsertRequestForm) =>
      TransactionApi.update(toUpdateRequest({ id: Number(params.id), form: data })),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      router.push("/accountbook/transaction")
    },
  })

  return ( <>
    <Header>
      <BackButton />
      <Title title="내역 등록" />
      <div></div>
    </Header>
    <main>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <InputContainer>
          <InputBox name="price" type="number" label="금액" control={ control } />
          <ErrorMessage message={ errors.price?.message } />
        </InputContainer>

        <InputContainer>
          <InputBox name="title" type="text" label="내역" control={ control } />
          <ErrorMessage message={ errors.title?.message } />
        </InputContainer>

        <InputContainer>
          <Controller
            name="transactionDate"
            control={ control }
            render={({ field: { value, onChange }}) => (
              <DatePicker
                selected={ dayjs(value).toDate() }
                onChange={ v => onChange(DateTimeUtility.toString({ dayjs: dayjs(v) })) }
                maxDate={ dayjs().add(1, "month").endOf("month").toDate() }
                dateFormat="yyyy. MM. dd"
              />
            )}
          />
        </InputContainer>

        <InputContainer style={{ display: "flex", gap: "10px" }}>
          <SelectBox
            name="budgetCategoryId"
            items={ _.map(budgetCategories, v => ({ label: v.name, value: v.id })) }
            placeholder="예산 타입을 등록해주세요"
            wrapperStyles={{ flex: 1 }}
            control={ control }
          />
          <Button style={{ width: "50px" }}>
            <Link href="/accountbook/transactioncategory">관리</Link>
          </Button>
        </InputContainer>

        <InputContainer style={{ display: "flex", gap: "10px" }}>
          <SelectBox
            name="transactionCategoryId"
            items={ _.map(transactionCategories, v => ({ label: v.name, value: v.id })) }
            placeholder="내역 타입을 등록해주세요"
            wrapperStyles={{ flex: 1 }}
            control={ control }
          />
          <Button style={{ width: "50px" }}>
            <Link href="/accountbook/budgetcategory">관리</Link>
          </Button>
        </InputContainer>

        <InputContainer>
          <RadioCard
            name="incomeExpenseType"
            items={ _.map(getSortedIncomeExpenseTypeExternal(),
              v => ({ label: v.name, value: String(v.type), styles: { color: v.color } })) }
            control={ control }
          />
        </InputContainer>

        <InputContainer>
          <ChckboxCard name="isWaste" label="낭비" control={ control } />
        </InputContainer>

        <InputContainer
          style={{
            position: "fixed",
            bottom: 0,
            width: "calc(100% - 40px)",
            marginBottom: "20px",
          }}
        >
          <Button type="submit" style={{ background: "#265A61", width: "100%" }}>
            { pageType === "REGISTER" ? "등록" : "수정" }
          </Button>
        </InputContainer>
      </form>
    </main>
  </> )
}
