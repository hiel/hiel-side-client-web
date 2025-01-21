import { NextRequest, NextResponse } from "next/server"
import { CookieKey } from "@/common/utilities/BrowserStorageUtility"
import { ValidationUtility } from "@/common/utilities/ValidationUtility"

export const AuthMiddleware = (request: NextRequest): NextResponse => {
  const PERMIT_URLS = [
    "/accountbook/auth",
    "/accountbook/auth/login",
    "/accountbook/auth/requestPasswordReset",
    "/accountbook/auth/resetPassword",
    "/accountbook/auth/signup",
    "/accountbook/auth/signup/certificate",
  ]
  if (PERMIT_URLS.some(url => request.nextUrl.pathname === url)) {
    return NextResponse.next()
  }
  if (
    ValidationUtility.hasNotValue(request.cookies.get(CookieKey.ACCESS_TOKEN))
    && ValidationUtility.hasNotValue(request.cookies.get(CookieKey.REFRESH_TOKEN))
  ) {
    return NextResponse.redirect(new URL("/accountbook/auth", request.url))
  }
  return NextResponse.next()
}
