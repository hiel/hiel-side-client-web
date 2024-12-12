import { NextRequest } from "next/server"
import { AuthMiddleware } from "@/common/middlewares/AuthMiddleware"

export function middleware(request: NextRequest) {
  return AuthMiddleware(request)
}

export const config = {
  matcher: ["/((?!.*\\.).*)"],
}
