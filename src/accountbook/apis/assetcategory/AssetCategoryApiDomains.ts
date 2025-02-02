export interface AssetCategoryRegisterRequest {
  name: string,
  budgetPrice?: number | null,
}

export interface AssetCategoryUpdateRequest {
  id: number,
  name: string,
  budgetPrice?: number | null,
}

export interface AssetCategoryDeactivateRequest {
  id: number,
}

export interface AssetCategoryGetAllResponse {
  list: AssetCategoryGetAllResponseDetail[],
}

export interface AssetCategoryGetAllResponseDetail {
  id: number,
  name: string,
  budgetPrice: number | null,
}
