export enum IncomeExpenseType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export const IncomeExpenseTypeExternal: Record<"INCOME" | "EXPENSE", { type: IncomeExpenseType, name: string }> = {
  INCOME: { type: IncomeExpenseType.INCOME, name: "수입" },
  EXPENSE: { type: IncomeExpenseType.EXPENSE, name: "지출" },
}
