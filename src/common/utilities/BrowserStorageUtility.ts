import { Cookies } from "react-cookie"

export enum CookieKey {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
  USER_ID = "userId",
  USER_EMAIL = "userEmail",
  USER_NAME = "userName",
  USER_TYPE = "userType",
}

// export enum LocalStorageKey {
// }

export class BrowserStorageUtility {
  static setCookie({ key, value }: { key: CookieKey, value: string }): void {
    new Cookies().set(key, value, { path: "/" })
  }

  static getCookie(key: CookieKey): string {
    return new Cookies().get(key)
  }

  static removeCookie(key: CookieKey) {
    new Cookies().remove(key, { path: "/" })
  }

  static removeCookies(keys: CookieKey[]): void {
    keys.forEach(key => BrowserStorageUtility.removeCookie(key))
  }

  // static setLocalStorage({ key, value }: { key: LocalStorageKey, value: string }): void {
  //   localStorage.setItem(key, value)
  // }
  //
  // static getLocalStorage(key: LocalStorageKey): string | null {
  //   return localStorage.getItem(key)
  // }
  //
  // static removeLocalStorage(key: LocalStorageKey): void {
  //   localStorage.removeItem(key)
  // }
  //
  // static removeLocalStorages(keys: LocalStorageKey[]): void{
  //   keys.forEach(key => localStorage.removeItem(key))
  // }
}
