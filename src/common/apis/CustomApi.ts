import { Api } from "@/common/utilities/Api"
import { AuthUtility } from "@/common/utilities/AuthUtility"
import { ApiResultCode } from "@/common/apis/ApiResultCode"
import { AuthApi } from "@/accountbook/apis/auth/AuthApi"
import { MESSAGE } from "@/common/domains/Messages"
import { AxiosRequestConfig, AxiosResponse } from "axios"

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

function handleError(message: string): Promise<never> {
  alert(message)
  AuthUtility.logout()
  window.location.href = "/"
  return Promise.reject(new Error(message))
}

customApi.axiosInstance.interceptors.response.use(
  async (response: AxiosResponse): Promise<AxiosResponse> => {
    if (response.data.resultCode === ApiResultCode.EXPIRED_ACCESS_TOKEN) {
      try {
        const config = response.config as CustomAxiosRequestConfig
        if (config._retry) {
          return handleError(MESSAGE.AUTH.AUTHENTICATION_EXPIRED)
        }

        config._retry = true
        const refreshToken = AuthUtility.getRefreshToken()
        if (!refreshToken) {
          return handleError(MESSAGE.AUTH.AUTHENTICATION_EXPIRED)
        }

        const refreshResponse = await AuthApi.refresh({ request: { refreshToken: refreshToken } })
        if (!refreshResponse.isSuccess() || !refreshResponse.data) {
          return handleError(refreshResponse.message || MESSAGE.COMMON.REQUEST_FAIL)
        }

        AuthUtility.issueToken({ response: refreshResponse.data })
        return customApi.axiosInstance(config)

      } catch (error) {
        return handleError(MESSAGE.COMMON.REQUEST_FAIL)
      }
    }

    return response
  },
  error => {
    alert(MESSAGE.COMMON.REQUEST_FAIL)
    return Promise.reject(error)
  },
)
