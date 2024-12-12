import { SliceResponseData } from "@/common/apis/ApiDomains"
import { IncomeExpenseType } from "@/accountbook/domains/IncomeExpenseType"

export interface TransactionGetSliceRequest {
  page: number,
  pageSize: number,
  transactionDatetime?: Date,
}

export interface TransactionGetSliceResponse {
  slice: SliceResponseData<TransactionGetSliceResponseDetail>,
  transactionDatetime: string,
}

interface TransactionGetSliceResponseDetail {
  id: number,
  date: string,
  budgetCategoryId: number,
  budgetCategoryName: string,
  transactionCategoryId: number,
  transactionCategoryName: string,
  title: string,
  price: number,
  incomeExpenseType: IncomeExpenseType,
  isWaste: boolean,
}
