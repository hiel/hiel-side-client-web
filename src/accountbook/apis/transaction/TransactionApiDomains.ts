import { SliceResponseData } from "@/common/apis/ApiDomains"
import { IncomeExpenseType } from "@/accountbook/domains/IncomeExpenseType"

export interface TransactionRegisterRequest {
  title: string,
  price: number,
  transactionDate: Date,
  assetCategoryId: number,
  transactionCategoryId: number,
  incomeExpenseType: IncomeExpenseType,
  isWaste: boolean,
}

export interface TransactionUpdateRequest {
  id: number,
  title: string,
  price: number,
  transactionDate: Date,
  assetCategoryId: number,
  transactionCategoryId: number,
  incomeExpenseType: IncomeExpenseType,
  isWaste: boolean,
}

export interface TransactionDeleteRequest {
  id: number,
}

export interface TransactionGetDetailRequest {
  id: number,
}

export interface TransactionGetDetailResponse {
  id: number,
  date: string,
  price: number,
  title: string,
  assetCategoryId: number,
  assetCategoryName: string,
  assetCategoryBudgetPrice: number | null,
  transactionCategoryId: number,
  transactionCategoryName: string,
  transactionCategoryBudgetPrice: number | null,
  incomeExpenseType: IncomeExpenseType,
  isWaste: boolean,
}

export interface TransactionGetSliceRequest {
  page: number,
  pageSize: number,
  date?: string,
}

export interface TransactionGetSliceResponse {
  slice: SliceResponseData<TransactionGetSliceResponseDetail>,
  transactionMonthlyRange: string[],
  transactionStartDay: number,
}

interface TransactionGetSliceResponseDetail {
  id: number,
  date: string,
  price: number,
  title: string,
  assetCategoryId: number,
  assetCategoryName: string,
  transactionCategoryId: number,
  transactionCategoryName: string,
  incomeExpenseType: IncomeExpenseType,
  isWaste: boolean,
}
