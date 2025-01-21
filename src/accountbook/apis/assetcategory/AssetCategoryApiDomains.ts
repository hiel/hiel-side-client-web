export interface AssetCategoryRegisterRequest {
  name: string,
}

export interface AssetCategoryUpdateRequest {
  id: number,
  name: string,
}

export interface AssetCategoryDeleteRequest {
  id: number,
}

export interface AssetCategoryGetAllResponse {
  list: AssetCategoryGetAllResponseDetail[],
}

export interface AssetCategoryGetAllResponseDetail {
  id: number,
  name: string,
}
