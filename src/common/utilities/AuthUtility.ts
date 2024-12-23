import { IssueTokenResponse } from "@/accountbook/apis/auth/AuthApiDomains"
import { BrowserStorageUtility, CookieKey } from "@/common/utilities/BrowserStorageUtility"
import { ValidationUtility } from "@/common/utilities/ValidationUtility"
import { UserType, UserTypeExternal } from "@/common/domains/UserDomains"

export class AuthUtility {
  static issueToken(response: IssueTokenResponse): void {
    BrowserStorageUtility.setCookie({ key: CookieKey.ACCESS_TOKEN, value: response.accessToken })
    BrowserStorageUtility.setCookie({ key: CookieKey.REFRESH_TOKEN, value: response.refreshToken })
    BrowserStorageUtility.setCookie({ key: CookieKey.USER_ID, value: String(response.id) })
    BrowserStorageUtility.setCookie({ key: CookieKey.USER_EMAIL, value: response.email })
    BrowserStorageUtility.setCookie({ key: CookieKey.USER_NAME, value: response.name })
    BrowserStorageUtility.setCookie({ key: CookieKey.USER_TYPE, value: response.userType })
  }

  static logout() {
    BrowserStorageUtility.removeCookies([
      CookieKey.ACCESS_TOKEN, CookieKey.REFRESH_TOKEN, CookieKey.USER_ID, CookieKey.USER_EMAIL, CookieKey.USER_NAME, CookieKey.USER_TYPE,
    ])
  }

  static getAccessToken(): string | null {
    return BrowserStorageUtility.getCookie(CookieKey.ACCESS_TOKEN)
  }

  static getRefreshToken(): string | null {
    return BrowserStorageUtility.getCookie(CookieKey.REFRESH_TOKEN)
  }

  static getUserId(): number | null {
    const userId = BrowserStorageUtility.getCookie(CookieKey.USER_ID)
    return userId === null ? null : Number(userId)
  }

  static getUserType(): string | null {
    return BrowserStorageUtility.getCookie(CookieKey.USER_TYPE)
  }

  static getUserTypeExternal(): { type: UserType, name: string, containTypes: UserType[] } | null {
    if (AuthUtility.getUserType() === null) {
      return null
    }
    return UserTypeExternal[AuthUtility.getUserType() as keyof typeof UserTypeExternal]
  }

  static hasRole(userType: UserType): boolean {
    return AuthUtility.getUserTypeExternal() !== null && AuthUtility.getUserTypeExternal()!.containTypes.includes(userType)
  }

  static hasMasterRole(): boolean {
    return AuthUtility.hasRole(UserType.MASTER)
  }

  static hasAdminRole(): boolean {
    return AuthUtility.hasRole(UserType.ADMIN)
  }

  static hasUserRole(): boolean {
    return AuthUtility.hasRole(UserType.USER)
  }

  static isLogin(): boolean {
    return ValidationUtility.hasValue(AuthUtility.getAccessToken()) && ValidationUtility.hasValue(AuthUtility.getRefreshToken())
  }
}
