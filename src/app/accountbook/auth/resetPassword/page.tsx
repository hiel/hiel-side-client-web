"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { MESSAGE } from "@/common/domains/Messages"
import { AuthApi } from "@/accountbook/apis/auth/AuthApi"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

export default function AccountBookResetPassword() {
  const router = useRouter()
  const token = useSearchParams().get("token")
  const [password, setPassword] = useState<string>("")

  const resetPasswordMutation = useMutation({
    mutationFn: (resetPasswordToken: string) =>
      AuthApi.resetPassword({ request: { resetPasswordToken: resetPasswordToken } }),
    onSuccess: (data) => {
      if (!data.isSuccess() || !data.data) {
        alert(data.message)
        router.back()
        return
      }
      setPassword(data.data.password)
    },
  })

  if (!token) {
    alert(MESSAGE.COMMON.INVALID_ACCESS)
    router.back()
  } else {
    resetPasswordMutation.mutate(token)
  }

  return (
    <main>
      <h1>#resetPassword#</h1>
      <p>password : {password}</p>
    </main>
  )
}
