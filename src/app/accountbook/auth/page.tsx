"use client"

import Container from "@/components/Container"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Box } from "@chakra-ui/react"

export default function Auth() {
  const router = useRouter()

  return (
    <Container>
      <Box style={{position: "absolute", bottom: "150px", width: "calc(100% - 20px)"}}>
        <p>로고(TODO)</p>
        <Button
          onClick={() => router.push("/accountbook/auth/login")}
          style={{width: "100%", marginBottom: "10px"}}
        >로그인</Button>
        <Button
          onClick={() => router.push("/accountbook/auth/requestPasswordReset")}
          style={{width: "100%", marginBottom: "10px", backgroundColor: "#FFFFFF", color: "black", border: "1px solid black"}}
        >비밀번호 찾기</Button>
        <Button
          onClick={() => router.push("/accountbook/auth/signup")}
          style={{width: "100%", backgroundColor: "#FFFFFF", color: "black", border: "1px solid black"}}
        >회원가입</Button>
      </Box>
    </Container>
  )
}
