import { SliceResponseData } from "@/common/apis/ApiDomains"
import { IncomeExpenseType } from "@/accountbook/domains/IncomeExpenseType"

export interface TransactionRegisterRequest {
  title: string,
  price: number,
  transactionDate: Date,
  budgetCategoryId: number,
  transactionCategoryId: number,
  incomeExpenseType: IncomeExpenseType,
  isWaste: boolean,
}

export interface TransactionUpdateRequest {
  id: number,
  title: string,
  price: number,
  transactionDate: Date,
  budgetCategoryId: number,
  transactionCategoryId: number,
  incomeExpenseType: IncomeExpenseType,
  isWaste: boolean,
}

export interface TransactionGetDetailRequest {
  id: number,
}

export interface TransactionGetDetailResponse {
  id: number,
  date: string,
  price: number,
  title: string,
  budgetCategoryId: number,
  budgetCategoryName: string,
  transactionCategoryId: number,
  transactionCategoryName: string,
  incomeExpenseType: IncomeExpenseType,
  isWaste: boolean,
}

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
  price: number,
  title: string,
  budgetCategoryId: number,
  budgetCategoryName: string,
  transactionCategoryId: number,
  transactionCategoryName: string,
  incomeExpenseType: IncomeExpenseType,
  isWaste: boolean,
}
