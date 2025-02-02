export interface TransactionCategoryRegisterRequest {
  name: string,
}

export interface TransactionCategoryUpdateRequest {
  id: number,
  name: string,
}

export interface TransactionCategoryDeactivateRequest {
  id: number,
}

export interface TransactionCategoryGetAllResponse {
  list: TransactionCategoryGetAllResponseDetail[],
}

export interface TransactionCategoryGetAllResponseDetail {
  id: number,
  name: string,
}
