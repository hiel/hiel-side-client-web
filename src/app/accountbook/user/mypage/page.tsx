"use client"

import Container from "@/app/accountbook/Container"
import BackButton from "@/app/accountbook/header/BackButton"
import Title from "@/app/accountbook/header/Title"
import Header from "@/app/accountbook/header/Header"

export default function MyPage() {
  return (
    <Container>
      <Header>
        <BackButton />
        <Title title="내 정보" />
        <div style={{width: "33%", height: "100%"}}></div>
      </Header>
    </Container>
  )
}
