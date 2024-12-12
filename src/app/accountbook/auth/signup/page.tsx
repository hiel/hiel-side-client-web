"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthApi } from "@/accountbook/apis/auth/AuthApi"
import { MESSAGE } from "@/common/domains/Messages"
import { useMutation } from "@tanstack/react-query"
import { USER_PASSWORD_MINIMUM_LENGTH, USERNAME_MINIMUM_LENGTH } from "@/common/domains/UserDomains"

export default function Signup() {
  const router = useRouter()
  const [ formData, setFormData ] = useState<{
    email: string,
    password: string,
    confirmPassword: string,
    username: string,
  }>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
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
    if (formData.password.length < USER_PASSWORD_MINIMUM_LENGTH) {
      setErrorMessage(MESSAGE.getMessage(MESSAGE.FORM.LENGTH_TOO_SHORT_PASSWORD, USER_PASSWORD_MINIMUM_LENGTH))
      return
    }
    if (formData.confirmPassword !== formData.password) {
      setErrorMessage("확인 비밀번호가 일치하지 않습니다.")
      return
    }
    if (formData.username.length < USERNAME_MINIMUM_LENGTH) {
      setErrorMessage(MESSAGE.getMessage(MESSAGE.FORM.LENGTH_TOO_SHORT_NAME, USERNAME_MINIMUM_LENGTH))
      return
    }
    setErrorMessage("")
    signupMutation.mutate()
  }

  const signupMutation = useMutation({
    mutationFn: () => AuthApi.signup({
      request: {
        email: formData.email,
        password: formData.password,
        username: formData.username,
      },
    }),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      alert("가입 인증 메일을 확인해주세요.")
      router.push("/accountbook/auth/login")
    },
  })

  return (
    <main>
      <h1>#signUp#</h1>
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
        <input
          value={formData.confirmPassword}
          onChange={handleFormChange}
          name="confirmPassword"
          type="password"
          placeholder="confirmPassword"
        />
        <input
          value={formData.username}
          onChange={handleFormChange}
          name="username"
          type="text"
          placeholder="username"
        />
        <input type="submit" />
      </form>
      <p>{errorMessage}</p>
    </main>
  )
}
