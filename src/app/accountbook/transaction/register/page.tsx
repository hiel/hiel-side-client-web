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
import ErrorMessage from "@/app/accountbook/transaction/register/_ErrorMessage"
import { TransactionApi } from "@/accountbook/apis/transaction/TransactionApi"
import { TransactionRegisterRequest } from "@/accountbook/apis/transaction/TransactionApiDomains"
import { useRouter } from "next/navigation"

interface TransactionRegisterRequestForm {
  price: string,
  title: string,
  transactionDate: string,
  budgetCategoryId: string,
  transactionCategoryId: string,
  incomeExpenseType: IncomeExpenseType,
  isWaste: boolean,
}
const _toRequest = (form: TransactionRegisterRequestForm): TransactionRegisterRequest => {
  return {
    ...form,
    price: Number(form.price),
    transactionDate: dayjs(form.transactionDate).toDate(),
    budgetCategoryId: Number(form.budgetCategoryId),
    transactionCategoryId: Number(form.budgetCategoryId),
  }
}

const InputContainer = styled.div`
  margin-bottom: 10px;
`

export default function RegisterTransaction() {
  const router = useRouter()
  const { handleSubmit, control, resetField, setError, formState: { errors } } = useForm<TransactionRegisterRequestForm>({
    mode: "onChange",
    defaultValues: {
      price: "",
      title: "",
      transactionDate: DateTimeUtility.toString({ dayjs: dayjs() }),
      incomeExpenseType: IncomeExpenseType.EXPENSE,
      isWaste: false,
    },
  })

  const { data: budgetCategories } = useQuery({
    queryKey: ["BudgetCategoryApi.getAll"],
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

  useEffect(() => {
    const category = _.first(transactionCategories)
    if (category) {
      resetField("transactionCategoryId", { defaultValue: String(category.id) })
    }
  }, [transactionCategories, resetField])

  const validate= (data: TransactionRegisterRequestForm): boolean => {
    let isValid = true
    if (data.price.trim().length < 1) {
      isValid = false
      setError("price", { type: "required", message: "금액을 입력해주세요" })
    }
    if (data.title.trim().length < 1) {
      isValid = false
      setError("title", { type: "required", message: "내역을 입력해주세요" })
    }
    return isValid
  }

  const onSubmit: SubmitHandler<TransactionRegisterRequestForm> = (data: TransactionRegisterRequestForm) => {
    if (!validate(data)) { return }
    const submitData = {
      ...data,
      price: data.price.trim(),
      title: data.title.trim(),
    }

    registerMutation.mutate(submitData)
  }

  const registerMutation = useMutation({
    mutationFn: (data: TransactionRegisterRequestForm) => TransactionApi.register(_toRequest(data)),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      router.push("/accountbook/transaction")
    },
  })

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <InputBox
            name="price"
            control={control}
            type="number"
            label="금액"
          />
          <ErrorMessage message={errors.price?.message} />
        </InputContainer>

        <InputContainer>
          <InputBox
            name="title"
            control={control}
            type="text"
            label="내역"
          />
          <ErrorMessage message={errors.title?.message} />
        </InputContainer>

        <InputContainer>
          <Controller
            name="transactionDate"
            control={control}
            render={({ field: { value, onChange }}) => (
              <DatePicker
                selected={dayjs(value).toDate()}
                onChange={v => onChange(DateTimeUtility.toString({ dayjs: dayjs(v) }))}
                maxDate={dayjs().add(1, "month").endOf("month").toDate()}
                dateFormat="yyyy. MM. dd"
              />
            )}
          />
        </InputContainer>

        <InputContainer
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <SelectBox
            name="budgetCategoryId"
            items={_.map(budgetCategories, v => {
              return { label: v.name, value: v.id }
            })}
            placeholder="예산 타입을 등록해주세요"
            wrapperStyles={{
              flex: 1,
            }}
            control={control}
          />
          <Button
            style={{
              width: "50px",
            }}
          >
            관리
          </Button>
        </InputContainer>

        <InputContainer
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <SelectBox
            name="transactionCategoryId"
            items={_.map(transactionCategories, v => {
              return { label: v.name, value: v.id }
            })}
            placeholder="내역 타입을 등록해주세요"
            wrapperStyles={{
              flex: 1,
            }}
            control={control}
          />
          <Button
            style={{
              width: "50px",
            }}
          >
            관리
          </Button>
        </InputContainer>

        <InputContainer>
          <RadioCard
            name="incomeExpenseType"
            items={_.map(getSortedIncomeExpenseTypeExternal(), v => {
              return { label: v.name, value: String(v.type), styles: { color: v.color } }
            })}
            control={control}
          />
        </InputContainer>

        <InputContainer>
          <ChckboxCard
            name="isWaste"
            label="낭비"
            control={control}
          />
        </InputContainer>

        <InputContainer>
          <Button
            type="submit"
            background={"#265A61"}
            width="100%"
            padding="20px"
          >
            등록
          </Button>
        </InputContainer>
      </form>
    </main>
  )
}
