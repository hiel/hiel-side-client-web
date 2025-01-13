"use client"

export default function Title({ title }: { title: string }) {
  return (
    <h1 style={{display: "flex", justifyContent: "center", alignItems: "center", width: "33%", height: "100%"}}>{title}</h1>
  )
}
