import { Range } from "@/common/domains/Range"

export interface HomeGetResponse {
  transactionMonthlyRange: Range<Date>,
  totalExpense: number,
  balance?: number,
  availableExpensePricePerDay?: number,
  isFine?: boolean,
  assetCategories: HomeGetResponseAssetCategoryDetail[],
  transactionCategories: HomeGetResponseTransactionCategoryDetail[],
  wastedPrice: number,
}

export interface HomeGetResponseAssetCategoryDetail {
  id: number,
  name: string,
  budget?: number,
  totalExpense: number,
  balance?: number,
  availableExpensePricePerDay?: number,
  isFine?: boolean,
}

interface HomeGetResponseTransactionCategoryDetail {
  id: number,
  name: string,
  totalExpense: number,
}
