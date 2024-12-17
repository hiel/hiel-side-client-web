import { Api } from "@/common/utilities/Api"
import { AuthUtility } from "@/common/utilities/AuthUtility"
import { ApiResultCode } from "@/common/apis/ApiResultCode"
import { AuthApi } from "@/accountbook/apis/auth/AuthApi"
import { MESSAGE } from "@/common/domains/Messages"
import { AxiosRequestConfig, AxiosResponse } from "axios"
import { IssueTokenResponse } from "@/accountbook/apis/auth/AuthApiDomains"

export const customApi = new Api({ url: process.env.NEXT_PUBLIC_API_URL!, timeoutSecond: 10 })

customApi.axiosInstance.interceptors.request.use((config) => {
  if (AuthUtility.isLogin()) {
    config.headers["Authorization"] = `Bearer ${AuthUtility.getAccessToken()}`
  }
  return config
})

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean,
}

function handleError(): Promise<never> {
  alert(MESSAGE.AUTH.RETRY_LOGIN)
  AuthUtility.logout()
  window.location.href = "/accountbook/auth/login"
  return Promise.reject()
}

customApi.axiosInstance.interceptors.response.use(
  async (response: AxiosResponse): Promise<AxiosResponse> => {
    try {
      if (response.data.resultCode === ApiResultCode.EXPIRED_ACCESS_TOKEN) {
        const config = response.config as CustomAxiosRequestConfig
        if (config._retry) {
          return handleError()
        }

        config._retry = true
        const refreshToken = AuthUtility.getRefreshToken()
        if (!refreshToken) {
          return handleError()
        }

        const refreshResponse = await AuthApi.refresh({ request: { refreshToken: refreshToken } })
        if (!refreshResponse.isSuccessAndHasData()) {
          return handleError()
        }

        AuthUtility.issueToken({ response: refreshResponse.data as IssueTokenResponse })
        return customApi.axiosInstance(config)

      } else if (response.data.resultCode === ApiResultCode.INVALID_TOKEN) {
        return handleError()
      }
    } catch (error) {
      return handleError()
    }

    return response
  },
  error => {
    alert(MESSAGE.COMMON.REQUEST_FAIL)
    return Promise.reject(error)
  },
)
