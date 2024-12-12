import { customApi } from "@/accountbook/apis/CustomApi"
import { ApiResponse } from "@/common/apis/ApiDomains"
import {
  CertificateSignupRequest,
  IssueTokenResponse,
  LoginRequest,
  RefreshTokenRequest, RequestPasswordResetRequest, ResetPasswordRequest, ResetPasswordResponse,
  SignupRequest,
} from "@/accountbook/apis/auth/AuthApiDomains"

export class AuthApi {
  static URL_PREFIX = "/account-book/auths"

  static async signup({
    request,
  }: {
    request: SignupRequest,
  }): Promise<ApiResponse> {
    return await customApi.post({
      url: `${this.URL_PREFIX}/signup`,
      requestBody: { ...request },
    })
  }

  static async certificateSignup({
    request,
  }: {
    request: CertificateSignupRequest,
  }): Promise<ApiResponse> {
    return await customApi.put({
      url: `${this.URL_PREFIX}/signup/certificate`,
      requestBody: { ...request },
    })
  }

  static async login({
    request,
  }: {
    request: LoginRequest,
  }): Promise<ApiResponse<IssueTokenResponse>> {
    return await customApi.post({
      url: `${this.URL_PREFIX}/login`,
      requestBody: { ...request },
    })
  }

  static async refresh({
    request,
  }: {
    request: RefreshTokenRequest,
  }): Promise<ApiResponse<IssueTokenResponse>> {
    return await customApi.post({
      url: `${this.URL_PREFIX}/refresh`,
      requestBody: { ...request },
    })
  }

  static async requestPasswordReset({
    request,
  }: {
    request: RequestPasswordResetRequest,
  }): Promise<ApiResponse> {
    return await customApi.post({
      url: `${this.URL_PREFIX}/password/reset/request`,
      requestBody: { ...request },
    })
  }

  static async resetPassword({
    request,
  }: {
    request: ResetPasswordRequest,
  }): Promise<ApiResponse<ResetPasswordResponse>> {
    return await customApi.put({
      url: `${this.URL_PREFIX}/password/reset`,
      requestBody: { ...request },
    })
  }
}
