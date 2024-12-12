"use client"

import Link from "next/link"
import AuthStore from "@/common/stores/AuthStore"
import { AuthUtility } from "@/common/utilities/AuthUtility"
import { useRouter } from "next/navigation"

export default function AccountBookNavigation() {
  const router = useRouter()
  const isLogined = AuthStore((state) => state.isLogined)
  const setIsLogined = AuthStore((state) => state.setIsLogined)

  const logout = () => {
    AuthUtility.logout()
    setIsLogined(false)
    router.push("/accountbook")
  }

  return (
    <div>
      <ul>
        <li>
          <Link href={"/accountbook"}>
            HOME
          </Link>
        </li>
        { isLogined ? ( <>
          <li>
            <button
              onClick={logout}
            >LOGOUT
            </button>
          </li>
        </> ) : (<>
          <li>
            <Link href={"/accountbook/auth/login"}>
              LOGIN
            </Link>
          </li>
          <li>
            <Link href={"/accountbook/auth/signup"}>
              SIGNUP
            </Link>
          </li>
        </>)}
      </ul>
    </div>
  )
}
