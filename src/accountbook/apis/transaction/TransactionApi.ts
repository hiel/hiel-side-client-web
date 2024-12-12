import { customApi } from "@/accountbook/apis/CustomApi"
import { TransactionGetSliceRequest, TransactionGetSliceResponse } from "@/accountbook/apis/transaction/TransactionApiDomains"
import { ApiResponse } from "@/common/apis/ApiDomains"

export class TransactionApi {
  static URL_PREFIX = "/account-book/transactions"

  static async getSlice({
    request,
  }: {
    request: TransactionGetSliceRequest,
  }): Promise<ApiResponse<TransactionGetSliceResponse>> {
    return await customApi.get({
      url: `${this.URL_PREFIX}`,
      queryParams: { ...request },
    })
  }
}
