"use client"

import { useQuery } from "@tanstack/react-query"
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
import { defineStyle, Field, Input } from "@chakra-ui/react"
import { DateTimeUtility } from "@/common/utilities/DateTimeUtility"
import SelectBox from "@/common/components/SelectBox"
import RadioCard from "@/common/components/RadioCard"

interface TransactionRegisterRequestForm {
  price: string,
  title: string,
  transactionDate: string,
  budgetCategoryId: string,
  transactionCategoryId: string,
  incomeExpenseType: IncomeExpenseType,
  isWaste: boolean,
}

const floatingStyles = defineStyle({
  pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "fg.muted",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "fg",
    top: "-3",
    insetStart: "2",
  },
})

export default function RegisterTransaction() {
  const { register, handleSubmit, control, resetField } = useForm<TransactionRegisterRequestForm>({
    defaultValues: {
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
      resetField("budgetCategoryId", {
        defaultValue: String(category.id),
      })
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
      resetField("transactionCategoryId", {
        defaultValue: String(category.id),
      })
    }
  }, [transactionCategories, resetField])

  const onSubmit: SubmitHandler<TransactionRegisterRequestForm> = (data: TransactionRegisterRequestForm) => {
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field.Root>
          <Input
            {...register("price")}
            type="number"
            variant="outline"
            className="peer"
            placeholder=""
            width="180px"
            padding="10px"
            borderWidth="1px"
          />
          <Field.Label css={floatingStyles}>금액</Field.Label>
        </Field.Root>

        <Field.Root>
          <Input
            {...register("title")}
            type="number"
            variant="outline"
            className="peer"
            placeholder=""
            width="400px"
            padding="10px"
            borderWidth="1px"
          />
          <Field.Label css={floatingStyles}>내역</Field.Label>
        </Field.Root>

        <Controller
          name="transactionDate"
          control={control}
          render={({ field: { value, onChange }}) => (
            <DatePicker
              selected={dayjs(value).toDate()}
              onChange={v => onChange(DateTimeUtility.toString({ dayjs: dayjs(v) }))}
              minDate={dayjs().startOf("month").toDate()}
              maxDate={dayjs().endOf("month").toDate()}
              dateFormat="yyyy. MM. dd"
            />
          )}
        />

        <SelectBox
          name="budgetCategoryId"
          items={_.map(budgetCategories, (v) => {
            return {
              label: v.name,
              value: v.id,
            }
          })}
          placeholder="예산 타입을 등록해주세요"
          control={control}
          styles={{
            width: "180px",
          }}
        />

        <SelectBox
          name="transactionCategoryId"
          items={_.map(transactionCategories, (v) => {
            return {
              label: v.name,
              value: v.id,
            }
          })}
          placeholder="내역 타입을 등록해주세요"
          control={control}
          styles={{
            width: "180px",
          }}
        />

        <RadioCard
          name="incomeExpenseType"
          items={_.map(getSortedIncomeExpenseTypeExternal(), (v) => {
            return {
              label: v.name,
              value: String(v.type),
            }
          })}
          control={control}
        />

        <input
          {...register("isWaste")}
          type="checkbox"
          id="isWaste"
        />
        <label htmlFor="isWaste">
          낭비여부
        </label>

        <input type="submit" />
      </form>
    </main>
  )
}
