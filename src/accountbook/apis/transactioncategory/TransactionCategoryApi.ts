import { customApi } from "@/accountbook/apis/CustomApi"
import { ApiResponse } from "@/common/apis/ApiDomains"
import {
  TransactionCategoryDeactivateRequest,
  TransactionCategoryGetAllResponse,
  TransactionCategoryRegisterRequest,
  TransactionCategoryUpdateRequest,
} from "@/accountbook/apis/transactioncategory/TransactionCategoryApiDomains"

export class TransactionCategoryApi {
  static URL_PREFIX = "/account-book/transaction-categories"
  static QUERY_KEYS = {
    GET_ALL: "TransactionCategoryApi.getAll",
  }

  static async register(request: TransactionCategoryRegisterRequest) {
    return await customApi.post({ url: this.URL_PREFIX, requestBody: { ...request } })
  }

  static async update(request: TransactionCategoryUpdateRequest) {
    const { id, ...requestBody } = request
    return await customApi.put({ url: `${this.URL_PREFIX}/${id}`, requestBody: { ...requestBody } })
  }

  static async deactivate(request: TransactionCategoryDeactivateRequest) {
    const { id, ...requestBody } = request
    return await customApi.put({ url: `${this.URL_PREFIX}/${id}/deactivate`, requestBody: { ...requestBody } })
  }

  static async getAll(): Promise<ApiResponse<TransactionCategoryGetAllResponse>> {
    return await customApi.get({
      url: `${this.URL_PREFIX}`,
    })
  }
}
