import { customApi } from "@/accountbook/apis/CustomApi"
import {
  TransactionGetSliceRequest,
  TransactionGetSliceResponse,
  TransactionRegisterRequest,
} from "@/accountbook/apis/transaction/TransactionApiDomains"
import { ApiResponse } from "@/common/apis/ApiDomains"

export class TransactionApi {
  static URL_PREFIX = "/account-book/transactions"

  static async register(request: TransactionRegisterRequest) {
    return await customApi.post({ url: this.URL_PREFIX, requestBody: { ...request } })
  }

  static async getSlice(request: TransactionGetSliceRequest): Promise<ApiResponse<TransactionGetSliceResponse>> {
    return await customApi.get({ url: `${this.URL_PREFIX}`, queryParams: { ...request } })
  }
}
