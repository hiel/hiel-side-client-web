"use client"

import { LoginRequest } from "@/accountbook/apis/auth/AuthApiDomains"
import { AuthApi } from "@/accountbook/apis/auth/AuthApi"
import { MESSAGE } from "@/common/domains/Messages"
import { useRouter } from "next/navigation"
import { AuthUtility } from "@/common/utilities/AuthUtility"
import { useMutation } from "@tanstack/react-query"
import AuthStore from "@/common/stores/AuthStore"
import { SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"
import Container from "@/components/Container"
import BackButton from "@/app/accountbook/header/BackButton"
import Title from "@/app/accountbook/header/Title"
import Header from "@/app/accountbook/header/Header"
import { Input } from "@chakra-ui/react"
import ErrorMessage from "@/app/accountbook/transaction/[id]/ErrorMessage"
import { Button } from "@/components/ui/button"

const InputContainer = styled.div`
  margin-bottom: 13px;
`

export default function AccountBookLogin() {
  const router = useRouter()
  const setIsLogined = AuthStore((state) => state.setIsLogined)
  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginRequest>({
    mode: "onChange",
  })

  const validate = (data: LoginRequest): boolean => {
    let isValid = true
    if (!data.email) {
      isValid = false
      setError("email", { type: "required", message: MESSAGE.getMessage(MESSAGE.FORM.INPUT_REQUIRED_EMAIL) })
    }
    if (!data.password) {
      isValid = false
      setError("password", { type: "required", message: MESSAGE.getMessage(MESSAGE.FORM.INPUT_REQUIRED_PASSWORD) })
    }
    return isValid
  }

  const onSubmit: SubmitHandler<LoginRequest> = (data: LoginRequest) => {
    if (!validate(data)) { return }
    loginMutation.mutate(data)
  }

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => AuthApi.login(data),
    onSuccess: (data) => {
      if (!data.isSuccess() || !data.data) {
        alert(data.message)
        return
      }
      AuthUtility.issueToken(data.data)
      setIsLogined(true)
      router.push("/accountbook")
    },
  })

  return (
    <Container>
      <Header>
        <BackButton url="/accountbook/auth" />
        <Title title="로그인" />
        <div style={{width: "33%", height: "100%"}}></div>
      </Header>

      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Input
              type="email"
              placeholder="이메일"
              {...register("email")}
            />
            <ErrorMessage message={errors.email?.message}/>
          </InputContainer>

          <InputContainer>
            <Input
              type="password"
              placeholder="비밀번호"
              {...register("password")}
            />
            <ErrorMessage message={errors.password?.message}/>
          </InputContainer>

          <InputContainer>
            <Button type="submit" style={{width: "100%"}}>로그인</Button>
          </InputContainer>
        </form>
      </main>
    </Container>
  )
}
