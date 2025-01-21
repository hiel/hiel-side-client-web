import { customApi } from "@/accountbook/apis/CustomApi"
import { ApiResponse } from "@/common/apis/ApiDomains"
import {
  AssetCategoryDeleteRequest,
  AssetCategoryGetAllResponse,
  AssetCategoryRegisterRequest,
  AssetCategoryUpdateRequest,
} from "@/accountbook/apis/assetcategory/AssetCategoryApiDomains"

export class AssetCategoryApi {
  static URL_PREFIX = "/account-book/asset-categories"
  static QUERY_KEYS = {
    GET_ALL: "AssetCategoryApi.getAll",
  }

  static async register(request: AssetCategoryRegisterRequest) {
    return await customApi.post({ url: this.URL_PREFIX, requestBody: { ...request } })
  }

  static async update(request: AssetCategoryUpdateRequest) {
    const { id, ...requestBody } = request
    return await customApi.put({ url: `${this.URL_PREFIX}/${id}`, requestBody: { ...requestBody } })
  }

  static async delete(request: AssetCategoryDeleteRequest) {
    const { id, ...requestBody } = request
    return await customApi.delete({ url: `${this.URL_PREFIX}/${id}`, requestBody: { ...requestBody } })
  }

  static async getAll(): Promise<ApiResponse<AssetCategoryGetAllResponse>> {
    return await customApi.get({
      url: `${this.URL_PREFIX}`,
    })
  }
}
