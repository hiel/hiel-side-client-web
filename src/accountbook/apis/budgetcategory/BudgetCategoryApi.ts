import { customApi } from "@/accountbook/apis/CustomApi"
import { ApiResponse } from "@/common/apis/ApiDomains"
import { BudgetCategoryGetAllResponse } from "@/accountbook/apis/budgetcategory/BudgetCategoryApiDomains"

export class BudgetCategoryApi {
  static URL_PREFIX = "/account-book/budget-categories"

  static async getAll(): Promise<ApiResponse<BudgetCategoryGetAllResponse>> {
    return await customApi.get({
      url: `${this.URL_PREFIX}`,
    })
  }
}
