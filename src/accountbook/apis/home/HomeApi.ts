import { customApi } from "@/accountbook/apis/CustomApi"
import { ApiResponse } from "@/common/apis/ApiDomains"
import { HomeGetResponse } from "@/accountbook/apis/home/HomeApiDomains"

export class HomeApi {
  static URL_PREFIX = "/account-book/home"
  static QUERY_KEYS = {
    GET_HOME: "HomeApi.getHome",
  }

  static async getHome(): Promise<ApiResponse<HomeGetResponse>> {
    return await customApi.get({ url: this.URL_PREFIX })
  }
}
