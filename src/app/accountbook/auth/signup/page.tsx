"use client"

import { useRouter } from "next/navigation"
import { AuthApi } from "@/accountbook/apis/auth/AuthApi"
import { MESSAGE } from "@/common/domains/Messages"
import { useMutation } from "@tanstack/react-query"
import { USER_PASSWORD_MINIMUM_LENGTH, USERNAME_MINIMUM_LENGTH } from "@/common/domains/UserDomains"
import { SubmitHandler, useForm } from "react-hook-form"
import { SignupRequest } from "@/accountbook/apis/auth/AuthApiDomains"
import ErrorMessage from "@/app/accountbook/transaction/[id]/ErrorMessage"
import { Button } from "@/components/ui/button"
import styled from "styled-components"
import { Box, Input } from "@chakra-ui/react"
import Container from "@/components/Container"
import BackButton from "@/app/accountbook/header/BackButton"
import Title from "@/app/accountbook/header/Title"
import Header from "@/app/accountbook/header/Header"

interface SignupForm {
  email: string,
  password: string,
  confirmPassword: string,
  name: string,
}
function toSignupRequest(form: SignupForm): SignupRequest {
  return {
    email: form.email,
    password: form.password,
    name: form.name,
  }
}

const InputContainer = styled.div`
  margin-bottom: 13px;
`

export default function AccountBookSignup() {
  const router = useRouter()
  const { register, handleSubmit, setError, formState: { errors } } = useForm<SignupForm>({
    mode: "onChange",
  })

  const validate = (data: SignupForm): boolean => {
    let isValid = true
    if (!data.email) {
      isValid = false
      setError("email", { type: "required", message: MESSAGE.getMessage(MESSAGE.FORM.INPUT_REQUIRED_EMAIL) })
    }
    if (data.password.length < USER_PASSWORD_MINIMUM_LENGTH) {
      isValid = false
      setError("password",
        { type: "minLength", message: MESSAGE.getMessage(MESSAGE.FORM.LENGTH_TOO_SHORT_PASSWORD, USER_PASSWORD_MINIMUM_LENGTH) })
    } else {
      if (data.confirmPassword !== data.password) {
        isValid = false
        setError("confirmPassword",
          { type: "validate", message: MESSAGE.getMessage(MESSAGE.getMessage(MESSAGE.AUTH.CONFIRM_PASSWORD_NOT_MATCHED))})
      }
    }
    if (data.name.length < USERNAME_MINIMUM_LENGTH) {
      isValid = false
      setError("name", { type: "minLength", message: MESSAGE.getMessage(MESSAGE.FORM.LENGTH_TOO_SHORT_NAME, USERNAME_MINIMUM_LENGTH) })
    }
    return isValid
  }

  const onSubmit: SubmitHandler<SignupForm> = (data: SignupForm) => {
    if (!validate(data)) { return }
    signupMutation.mutate(data)
  }

  const signupMutation = useMutation({
    mutationFn: (data: SignupForm) => AuthApi.signup(toSignupRequest(data)),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      alert("가입 인증 메일을 확인해주세요.")
      router.push("/accountbook/auth")
    },
  })

  return (
    <Container>
      <Header>
        <BackButton url="/accountbook/auth" />
        <Title title="회원가입" />
        <Box style={{width: "33%", height: "100%"}}></Box>
      </Header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Input
              type="email"
              autoComplete="off"
              placeholder="이메일"
              {...register("email")}
            />
            <ErrorMessage message={errors.email?.message}/>
          </InputContainer>

          <InputContainer>
            <Input
              type="password"
              autoComplete="off"
              placeholder="비밀번호"
              {...register("password")}
            />
            <ErrorMessage message={errors.password?.message}/>
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
            <Input
              type="text"
              autoComplete="off"
              placeholder="이름"
              {...register("name")}
            />
            <ErrorMessage message={errors.name?.message}/>
          </InputContainer>

          <InputContainer>
            <Button type="submit" style={{width: "100%"}}>가입</Button>
          </InputContainer>
        </form>
      </main>
    </Container>
  )
}
