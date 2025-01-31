export interface HomeGetResponse {
  budget?: number,
  totalExpense: number,
  balance?: number,
  availableExpensePricePerDay?: number,
  isFine?: boolean,
  assetCategories: HomeGetResponseAssetCategoryDetail[],
  transactionCategories: HomeGetResponseTransactionCategoryDetail[],
  wastedPrice: number,
}

interface HomeGetResponseAssetCategoryDetail {
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
  budget?: number,
  totalExpense: number,
  balance?: number,
  availableExpensePricePerDay?: number,
  isFine?: boolean,
}
