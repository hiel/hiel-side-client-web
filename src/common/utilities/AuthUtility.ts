import { IssueTokenResponse } from "@/accountbook/apis/auth/AuthApiDomains"
import { BrowserStorageUtility, CookieKey } from "@/common/utilities/BrowserStorageUtility"
import { ValidationUtility } from "@/common/utilities/ValidationUtility"
import { UserType, UserTypeExternal } from "@/common/domains/UserDomains"

export const AuthUtility = {
  issueToken: ({
    response,
  }: {
    response: IssueTokenResponse,
  }): void => {
    BrowserStorageUtility.setCookie({ key: CookieKey.ACCESS_TOKEN, value: response.accessToken })
    BrowserStorageUtility.setCookie({ key: CookieKey.REFRESH_TOKEN, value: response.refreshToken })
    BrowserStorageUtility.setCookie({ key: CookieKey.USER_ID, value: String(response.id) })
    BrowserStorageUtility.setCookie({ key: CookieKey.USER_EMAIL, value: response.email })
    BrowserStorageUtility.setCookie({ key: CookieKey.USER_NAME, value: response.name })
    BrowserStorageUtility.setCookie({ key: CookieKey.USER_TYPE, value: response.userType })
  },
  logout: () => {
    BrowserStorageUtility.removeCookies({ keys: [
      CookieKey.ACCESS_TOKEN,
      CookieKey.REFRESH_TOKEN,
      CookieKey.USER_ID,
      CookieKey.USER_EMAIL,
      CookieKey.USER_NAME,
      CookieKey.USER_TYPE,
    ] })
  },
  getAccessToken: (): string | null => {
    return BrowserStorageUtility.getCookie({ key: CookieKey.ACCESS_TOKEN })
  },
  getRefreshToken: (): string | null => {
    return BrowserStorageUtility.getCookie({ key: CookieKey.REFRESH_TOKEN })
  },
  getUserId: (): number | null => {
    const userId = BrowserStorageUtility.getCookie({ key: CookieKey.USER_ID })
    return userId === null ? null : Number(userId)
  },
  getUserType: (): string | null => {
    return BrowserStorageUtility.getCookie({ key: CookieKey.USER_TYPE })
  },
  getUserTypeExternal: (): { type: UserType, name: string, containTypes: UserType[] } | null => {
    if (AuthUtility.getUserType() === null) {
      return null
    }
    return UserTypeExternal[AuthUtility.getUserType() as keyof typeof UserTypeExternal]
  },
  hasRole: (userType: UserType): boolean => {
    return AuthUtility.getUserTypeExternal() !== null && AuthUtility.getUserTypeExternal()!.containTypes.includes(userType)
  },
  hasMasterRole: (): boolean => {
    return AuthUtility.hasRole(UserType.MASTER)
  },
  hasAdminRole: (): boolean => {
    return AuthUtility.hasRole(UserType.ADMIN)
  },
  hasUserRole: (): boolean => {
    return AuthUtility.hasRole(UserType.USER)
  },
  isLogin: (): boolean => {
    return ValidationUtility.hasValue(AuthUtility.getAccessToken()) && ValidationUtility.hasValue(AuthUtility.getRefreshToken())
  },
}
