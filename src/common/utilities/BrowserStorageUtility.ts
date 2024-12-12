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

export const BrowserStorageUtility = {
  setCookie: ({
    key,
    value,
  }: {
    key: CookieKey,
    value: string,
  }): void => {
    new Cookies().set(key, value, { path: "/" })
  },
  getCookie: ({
    key,
  }: {
    key: CookieKey,
  }): string => {
    return new Cookies().get(key)
  },
  removeCookie: ({
    key,
  }: {
    key: CookieKey,
  }) => {
    new Cookies().remove(key, { path: "/" })
  },
  removeCookies: ({
    keys,
  }: {
    keys: CookieKey[],
  }): void => {
    keys.forEach(key => BrowserStorageUtility.removeCookie({ key: key }))
  },
  // setLocalStorage: ({
  //   key,
  //   value,
  // }: {
  //   key: LocalStorageKey,
  //   value: string,
  // }): void => {
  //   localStorage.setItem(key, value)
  // },
  // getLocalStorage: ({
  //   key,
  // }: {
  //   key: LocalStorageKey,
  // }): string | null => {
  //   return localStorage.getItem(key)
  // },
  // removeLocalStorage: ({
  //   key,
  // }: {
  //   key: LocalStorageKey,
  // }): void => {
  //   localStorage.removeItem(key)
  // },
  // removeLocalStorages: ({
  //   keys,
  // }: {
  //   keys: LocalStorageKey[],
  // }): void => {
  //   keys.forEach(key => localStorage.removeItem(key))
  // },
}
