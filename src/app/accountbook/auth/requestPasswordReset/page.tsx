"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { RequestPasswordResetRequest } from "@/accountbook/apis/auth/AuthApiDomains"
import { AuthApi } from "@/accountbook/apis/auth/AuthApi"
import { MESSAGE } from "@/common/domains/Messages"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

export default function AccountBookRequestPasswordReset() {
  const router = useRouter()
  const [ formData, setFormData ] = useState<RequestPasswordResetRequest>({
    email: "",
  })
  const [ errorMessage, setErrorMessage ] = useState<string>("")

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => { return { ...prevData, [event.target.name]: event.target.value } })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData.email) {
      setErrorMessage(MESSAGE.getMessage(MESSAGE.FORM.INPUT_REQUIRED_EMAIL))
      return
    }
    setErrorMessage("")
    requestPasswordResetMutation.mutate()
  }

  const requestPasswordResetMutation = useMutation({
    mutationFn: () => AuthApi.requestPasswordReset({ request: formData }),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      alert("메일을 확인해주세요.")
      router.push("/accountbook/auth/login")
    },
  })

  return (
    <main>
      <h1>#requestPasswordReset#</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={formData.email}
          onChange={handleFormChange}
          name="email"
          type="email"
          placeholder="email"
        />
        <input type="submit"/>
      </form>
      <p>{errorMessage}</p>
    </main>
  )
}
