import { CollectionUtility } from "@/common/utilities/CollectionUtility"

export enum IncomeExpenseType {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
}

type IncomeExpenseTypeExternalValueType = {
  type: IncomeExpenseType,
  name: string,
  order: number,
}

export const IncomeExpenseTypeExternal: Record<"INCOME" | "EXPENSE", IncomeExpenseTypeExternalValueType> = {
  EXPENSE: { type: IncomeExpenseType.EXPENSE, name: "지출", order: 1 },
  INCOME: { type: IncomeExpenseType.INCOME, name: "수입", order: 2 },
}

export const getSortedIncomeExpenseTypeExternal = () => {
  return Object.values(IncomeExpenseTypeExternal).sort(
    function (a: IncomeExpenseTypeExternalValueType, b: IncomeExpenseTypeExternalValueType) {
      return CollectionUtility.orderAsc(a.order, b.order)
    }
  )
}
