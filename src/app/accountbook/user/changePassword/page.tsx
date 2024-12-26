"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { MESSAGE } from "@/common/domains/Messages"
import { USER_PASSWORD_MINIMUM_LENGTH } from "@/common/domains/UserDomains"
import { UserApi } from "@/accountbook/apis/user/UserApi"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

export default function AccountBookChangePassword() {
  const router = useRouter()
  const [ formData, setFormData ] = useState<{ currentPassword: string, updatePassword: string, confirmPassword: string }>(
    { currentPassword: "", updatePassword: "", confirmPassword: "" })
  const [ errorMessage, setErrorMessage ] = useState<string>("")

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => { return { ...prevData, [event.target.name]: event.target.value } })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formData.updatePassword.length < USER_PASSWORD_MINIMUM_LENGTH) {
      setErrorMessage(MESSAGE.getMessage(MESSAGE.FORM.LENGTH_TOO_SHORT_PASSWORD, USER_PASSWORD_MINIMUM_LENGTH))
      return
    }
    if (formData.confirmPassword !== formData.updatePassword) {
      setErrorMessage("확인 비밀번호가 일치하지 않습니다.")
      return
    }
    setErrorMessage("")
    changePasswordMutation.mutate()
  }

  const changePasswordMutation = useMutation({
    mutationFn: () => UserApi.changePassword({
      currentPassword: formData.currentPassword,
      updatePassword: formData.updatePassword,
    }),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      alert("비밀번호가 변경되었습니다.")
      router.push("/accountbook/user/mypage")
    },
  })

  return (
    <main>
      <h1>#changePassword#</h1>
      <form onSubmit={ handleSubmit }>
        <input
          value={ formData.currentPassword }
          onChange={ handleFormChange }
          name="currentPassword"
          type="password"
          placeholder="currentPassword"
        />
        <input
          value={ formData.updatePassword }
          onChange={ handleFormChange }
          name="updatePassword"
          type="password"
          placeholder="updatePassword"
        />
        <input
          value={ formData.confirmPassword }
          onChange={ handleFormChange }
          name="confirmPassword"
          type="password"
          placeholder="confirmPassword"
        />
        <input type="submit" />
      </form>
      <p>{ errorMessage }</p>
    </main>
  )
}
