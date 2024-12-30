"use client"

export default function Title({ title }: { title: string }) {
  return (
    <h1 style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>{title}</h1>
  )
}
