import { customApi } from "@/accountbook/apis/CustomApi"
import { ApiResponse } from "@/common/apis/ApiDomains"
import {
  ChangePasswordRequest, GetUserResponse,
  UpdateTransactionStartDayRequest,
  UpdateTransactionStartDayResponse,
} from "@/accountbook/apis/user/UserApiDomains"

export class UserApi {
  static URL_PREFIX = "/account-book/users"
  static QUERY_KEYS = {
    GET_USER: "UserApi.getUser",
  }

  static async changePassword(request: ChangePasswordRequest): Promise<ApiResponse> {
    return await customApi.put({url: `${this.URL_PREFIX}/password`, requestBody: {...request}})
  }

  static async updateTransactionStartDay(request: UpdateTransactionStartDayRequest):
      Promise<ApiResponse<UpdateTransactionStartDayResponse>> {
    return await customApi.put({url: `${this.URL_PREFIX}/transaction-start-day`, requestBody: {...request}})
  }

  static async getUser(): Promise<ApiResponse<GetUserResponse>> {
    return await customApi.get({url: this.URL_PREFIX})
  }
}
