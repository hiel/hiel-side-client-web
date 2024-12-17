export interface TransactionCategoryGetAllResponse {
  list: TransactionCategoryGetAllResponseDetail[],
}

interface TransactionCategoryGetAllResponseDetail {
  id: number,
  name: string,
}
