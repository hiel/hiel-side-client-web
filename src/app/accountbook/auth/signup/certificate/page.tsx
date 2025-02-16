"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { AuthApi } from "@/accountbook/apis/auth/AuthApi"
import { MESSAGE } from "@/common/domains/Messages"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"

export default function AccountBookSignupCertificate() {
  const router = useRouter()
  const token = useSearchParams().get("token")

  const certificateSignupMutation = useMutation({
    mutationFn: (signupToken: string) => AuthApi.certificateSignup({ signupToken: signupToken }),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        router.back()
      }
      alert("인증이 완료되었습니다.")
      router.push("/accountbook/auth/login")
    },
  })

  useEffect(() => {
    if (!token) {
      alert(MESSAGE.COMMON.INVALID_ACCESS)
      router.back()
    } else {
      certificateSignupMutation.mutate(token)
    }
  }, [])

  return ( <></> )
}
