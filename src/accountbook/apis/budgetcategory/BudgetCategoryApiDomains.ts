export interface BudgetCategoryGetAllResponse {
  list: BudgetCategoryGetAllResponseDetail[],
}

interface BudgetCategoryGetAllResponseDetail {
  id: number,
  name: string,
}
