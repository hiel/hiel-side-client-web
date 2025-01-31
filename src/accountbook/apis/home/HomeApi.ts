import { customApi } from "@/accountbook/apis/CustomApi"
import { ApiResponse } from "@/common/apis/ApiDomains"
import { HomeGetResponse } from "@/accountbook/apis/home/HomeApiDomains"

export class HomeApi {
  static URL_PREFIX = "/account-book/home"
  static QUERY_KEYS = {
    GET: "HomeApi.get",
  }

  static async get(): Promise<ApiResponse<HomeGetResponse>> {
    return await customApi.get({ url: this.URL_PREFIX })
  }
}
