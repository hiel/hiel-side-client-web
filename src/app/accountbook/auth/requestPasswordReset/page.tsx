"use client"

import { RequestPasswordResetRequest } from "@/accountbook/apis/auth/AuthApiDomains"
import { AuthApi } from "@/accountbook/apis/auth/AuthApi"
import { MESSAGE } from "@/common/domains/Messages"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import Container from "@/app/accountbook/Container"
import Header from "@/app/accountbook/header/Header"
import BackButton from "@/app/accountbook/header/BackButton"
import Title from "@/app/accountbook/header/Title"
import { Input } from "@chakra-ui/react"
import ErrorMessage from "@/app/accountbook/transaction/[id]/ErrorMessage"
import { Button } from "@/components/ui/button"

export default function AccountBookRequestPasswordReset() {
  const router = useRouter()
  const { register, handleSubmit, setError, formState: { errors } } = useForm<RequestPasswordResetRequest>({
    mode: "onChange",
  })

  const validate = (data: RequestPasswordResetRequest): boolean => {
    let isValid = true
    if (!data.email) {
      isValid = false
      setError("email", { type: "required", message: MESSAGE.getMessage(MESSAGE.FORM.INPUT_REQUIRED_EMAIL) })
    }
    return isValid
  }

  const onSubmit: SubmitHandler<RequestPasswordResetRequest> = (data: RequestPasswordResetRequest) => {
    if (!validate(data)) { return }
    requestPasswordResetMutation.mutate(data)
  }

  const requestPasswordResetMutation = useMutation({
    mutationFn: (data: RequestPasswordResetRequest) => AuthApi.requestPasswordReset(data),
    onSuccess: (data) => {
      if (!data.isSuccess()) {
        alert(data.message)
        return
      }
      alert("메일을 확인해주세요.")
      router.push("/accountbook/auth")
    },
  })

  return (
    <Container>
      <Header>
        <BackButton url="/accountbook/auth" />
        <Title title="비밀번호 초기화" />
        <div style={{width: "33%", height: "100%"}}></div>
      </Header>

      <main>
        <form onSubmit={handleSubmit(onSubmit)} style={{marginTop: "30px"}}>
          <Input
            type="email"
            placeholder="이메일"
            {...register("email")}
            style={{marginBottom: "10px"}}
          />
          <ErrorMessage message={errors.email?.message} />

          <Button type="submit" style={{width: "100%"}}>초기화</Button>
        </form>
      </main>
    </Container>
  )
}
