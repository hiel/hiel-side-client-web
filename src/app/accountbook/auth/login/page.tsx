"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { LoginRequest } from "@/accountbook/apis/auth/AuthApiDomains"
import { AuthApi } from "@/accountbook/apis/auth/AuthApi"
import { MESSAGE } from "@/common/domains/Messages"
import { useRouter } from "next/navigation"
import { AuthUtility } from "@/common/utilities/AuthUtility"
import { useMutation } from "@tanstack/react-query"
import AuthStore from "@/common/stores/AuthStore"

export default function Login() {
  const router = useRouter()
  const [ formData, setFormData ] = useState<LoginRequest>({
    email: "",
    password: "",
  })
  const [ errorMessage, setErrorMessage ] = useState<string>("")
  const setIsLogined = AuthStore((state) => state.setIsLogined)

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => { return { ...prevData, [event.target.name]: event.target.value } })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData.email) {
      setErrorMessage(MESSAGE.getMessage(MESSAGE.FORM.INPUT_REQUIRED_EMAIL))
      return
    }
    if (!formData.password) {
      setErrorMessage(MESSAGE.getMessage(MESSAGE.FORM.INPUT_REQUIRED_PASSWORD))
      return
    }
    setErrorMessage("")
    loginMutation.mutate()
  }

  const loginMutation = useMutation({
    mutationFn: () => AuthApi.login({ request: formData }),
    onSuccess: (data) => {
      if (!data.isSuccess() || !data.data) {
        alert(data.message)
        return
      }
      AuthUtility.issueToken({ response: data.data })
      setIsLogined(true)
      router.push("/accountbook/")
    },
  })

  return (
    <main>
      <h1>#login#</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={formData.email}
          onChange={handleFormChange}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          value={formData.password}
          onChange={handleFormChange}
          name="password"
          type="password"
          placeholder="password"
        />
        <input type="submit"/>
      </form>
      <p>{errorMessage}</p>
    </main>
  )
}
