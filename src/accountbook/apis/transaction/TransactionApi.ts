import { customApi } from "@/accountbook/apis/CustomApi"
import {
  TransactionDeleteRequest,
  TransactionGetDetailRequest,
  TransactionGetDetailResponse,
  TransactionGetSliceRequest,
  TransactionGetSliceResponse,
  TransactionRegisterRequest,
  TransactionUpdateRequest,
} from "@/accountbook/apis/transaction/TransactionApiDomains"
import { ApiResponse } from "@/common/apis/ApiDomains"

export class TransactionApi {
  static URL_PREFIX = "/account-book/transactions"
  static QUERY_KEYS = {
    GET_DETAIL: "TransactionApi.getDetail",
    GET_SLICE: "TransactionApi.getSlice",
  }

  static async register(request: TransactionRegisterRequest) {
    return await customApi.post({ url: this.URL_PREFIX, requestBody: { ...request } })
  }

  static async update(request: TransactionUpdateRequest) {
    const { id, ...requestBody } = request
    return await customApi.put({ url: `${this.URL_PREFIX}/${id}`, requestBody: { ...requestBody } })
  }

  static async delete(request: TransactionDeleteRequest) {
    const { id, ...requestBody } = request
    return await customApi.delete({ url: `${this.URL_PREFIX}/${id}`, requestBody: { ...requestBody } })
  }

  static async getDetail(request: TransactionGetDetailRequest): Promise<ApiResponse<TransactionGetDetailResponse>> {
    return await customApi.get({ url: `${this.URL_PREFIX}/${request.id}` })
  }

  static async getSlice(request: TransactionGetSliceRequest): Promise<ApiResponse<TransactionGetSliceResponse>> {
    return await customApi.get({ url: this.URL_PREFIX, queryParams: { ...request } })
  }
}
