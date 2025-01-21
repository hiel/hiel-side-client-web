import { UserType } from "@/common/domains/UserDomains"

export interface SignupRequest {
  email: string,
  password: string,
  name: string,
}

export interface CertificateSignupRequest {
  signupToken: string,
}

export interface LoginRequest {
  email: string,
  password: string,
}

export interface RefreshTokenRequest {
  refreshToken: string,
}

export interface IssueTokenResponse {
  accessToken: string,
  refreshToken: string,
  id: number,
  email: string,
  name: string,
  userType: UserType,
}

export interface RequestPasswordResetRequest {
  email: string,
}

export interface ResetPasswordRequest {
  resetPasswordToken: string,
}

export interface ResetPasswordResponse {
  password: string,
}
