import { ReactNode } from "react"

export default function Header({ children }: Readonly<{ children: ReactNode }>) {
  return ( <>
    <header
      style={{
        position: "fixed",
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "calc(100% - 20px)",
        height: "30px",
        margin: "10px 0",
        background: "white",
        zIndex: 9999,
      }}
    >
      { children }
    </header>
    <div style={{ height: "calc(30px + 10px)" }}></div>
  </> )
}
