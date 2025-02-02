"use client"

import { MESSAGE } from "@/common/domains/Messages"
import { USER_PASSWORD_MINIMUM_LENGTH } from "@/common/domains/UserDomains"
import { UserApi } from "@/accountbook/apis/user/UserApi"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import Header from "@/app/accountbook/header/Header"
import BackButton from "@/app/accountbook/header/BackButton"
import Title from "@/app/accountbook/header/Title"
import { Box, Input } from "@chakra-ui/react"
import ErrorMessage from "@/app/accountbook/transaction/[id]/ErrorMessage"
import { Button } from "@/components/ui/button"
import Container from "@/components/Container"
import { ChangePasswordRequest } from "@/accountbook/apis/user/UserApiDomains"
import { SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"

interface ChangePasswordForm {
  currentPassword: string,
  updatePassword: string,
  confirmPassword: string,
}
function toChangePasswordRequest(form: ChangePasswordForm): ChangePasswordRequest {
  return {
    currentPassword: form.currentPassword,
    updatePassword: form.updatePassword,
  }
}

const InputContainer = styled.div`
  margin-bottom: 13px;
`

export default function AccountBookChangePassword() {
  const router = useRouter()
  const { register, handleSubmit, setError, formState: { errors } } = useForm<ChangePasswordForm>({
    mode: "onChange",
  })

  const validate = (data: ChangePasswordForm): boolean => {
    let isValid = true
    if (data.updatePassword.length < USER_PASSWORD_MINIMUM_LENGTH) {
      isValid = false
      setError("updatePassword",
        { type: "minLength", message: MESSAGE.getMessage(MESSAGE.FORM.LENGTH_TOO_SHORT_PASSWORD, USER_PASSWORD_MINIMUM_LENGTH) })
    } else {
      if (data.confirmPassword !== data.updatePassword) {
        isValid = false
        setError("confirmPassword",
          { type: "validate", message: MESSAGE.getMessage(MESSAGE.getMessage(MESSAGE.AUTH.CONFIRM_PASSWORD_NOT_MATCHED))})
      }
    }
    return isValid
  }

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data: ChangePasswordForm) => {
    if (!validate(data)) { return }
    changePasswordMutation.mutate(data)
  }

  const changePasswordMutation = useMutation({
    mutationFn: (data: ChangePasswordForm) => UserApi.changePassword(toChangePasswordRequest(data)),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      alert("비밀번호가 변경되었습니다.")
      router.push("/accountbook")
    },
  })

  return (
    <Container>
      <Header>
        <BackButton />
        <Title title="비밀번호 변경" />
        <Box style={{width: "33%", height: "100%"}}></Box>
      </Header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Input
              type="password"
              autoComplete="off"
              placeholder="현재 비밀번호"
              {...register("currentPassword")}
            />
            <ErrorMessage message={errors.currentPassword?.message}/>
          </InputContainer>

          <InputContainer>
            <Input
              type="password"
              autoComplete="off"
              placeholder="변경 비밀번호"
              {...register("updatePassword")}
            />
            <ErrorMessage message={errors.updatePassword?.message}/>
          </InputContainer>

          <InputContainer>
            <Input
              type="password"
              autoComplete="off"
              placeholder="비밀번호 확인"
              {...register("confirmPassword")}
            />
            <ErrorMessage message={errors.confirmPassword?.message}/>
          </InputContainer>

          <InputContainer>
            <Button type="submit" style={{width: "100%"}}>변경</Button>
          </InputContainer>
        </form>
      </main>
    </Container>
  )
}
