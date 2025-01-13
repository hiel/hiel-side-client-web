import { ReactNode } from "react"

export default function Container({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div style={{ padding: "10px" }}>{ children }</div>
  )
}
