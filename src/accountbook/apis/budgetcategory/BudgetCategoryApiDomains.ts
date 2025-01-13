export interface BudgetCategoryRegisterRequest {
  name: string,
}

export interface BudgetCategoryUpdateRequest {
  id: number,
  name: string,
}

export interface BudgetCategoryDeleteRequest {
  id: number,
}

export interface BudgetCategoryGetAllResponse {
  list: BudgetCategoryGetAllResponseDetail[],
}

export interface BudgetCategoryGetAllResponseDetail {
  id: number,
  name: string,
}
