import { customApi } from "@/accountbook/apis/CustomApi"
import { ApiResponse } from "@/common/apis/ApiDomains"
import { ChangePasswordRequest } from "@/accountbook/apis/user/UserApiDomains"

export class UserApi {
  static URL_PREFIX = "/account-book/users"

  static async changePassword(request: ChangePasswordRequest): Promise<ApiResponse> {
    return await customApi.put({
      url: `${this.URL_PREFIX}/password`,
      requestBody: { ...request },
    })
  }
}
