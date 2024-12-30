import { customApi } from "@/accountbook/apis/CustomApi"
import { ApiResponse } from "@/common/apis/ApiDomains"
import {
  BudgetCategoryDeleteRequest,
  BudgetCategoryGetAllResponse,
  BudgetCategoryRegisterRequest,
  BudgetCategoryUpdateRequest,
} from "@/accountbook/apis/budgetcategory/BudgetCategoryApiDomains"

export class BudgetCategoryApi {
  static URL_PREFIX = "/account-book/budget-categories"
  static QUERY_KEYS = {
    GET_ALL: "BudgetCategoryApi.getAll",
  }

  static async register(request: BudgetCategoryRegisterRequest) {
    return await customApi.post({ url: this.URL_PREFIX, requestBody: { ...request } })
  }

  static async update(request: BudgetCategoryUpdateRequest) {
    const { id, ...requestBody } = request
    return await customApi.put({ url: `${this.URL_PREFIX}/${id}`, requestBody: { ...requestBody } })
  }

  static async delete(request: BudgetCategoryDeleteRequest) {
    const { id, ...requestBody } = request
    return await customApi.delete({ url: `${this.URL_PREFIX}/${id}`, requestBody: { ...requestBody } })
  }

  static async getAll(): Promise<ApiResponse<BudgetCategoryGetAllResponse>> {
    return await customApi.get({
      url: `${this.URL_PREFIX}`,
    })
  }
}
