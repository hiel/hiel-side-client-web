export interface TransactionCategoryRegisterRequest {
  name: string,
  budgetPrice?: number | null,
}

export interface TransactionCategoryUpdateRequest {
  id: number,
  name: string,
  budgetPrice?: number | null,
}

export interface TransactionCategoryDeleteRequest {
  id: number,
}

export interface TransactionCategoryGetAllResponse {
  list: TransactionCategoryGetAllResponseDetail[],
}

export interface TransactionCategoryGetAllResponseDetail {
  id: number,
  name: string,
  budgetPrice: number | null,
}
