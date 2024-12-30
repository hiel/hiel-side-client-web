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
        width: "calc(100% - 40px)",
        height: "50px",
        background: "white",
        zIndex: 9999,
      }}
    >
      {children}
    </header>
    <div style={{ height: "calc(50px - 20px)" }}></div>
  </> )
}
