import { ReactNode } from "react"
import { Box } from "@chakra-ui/react"

export default function Header({children, backgroundColor = "var(--color-background)"}:
  Readonly<{children: ReactNode, backgroundColor?: "var(--color-background)" | "white"}>
) {
  return (<>
    <header
      style={{
        position: "fixed",
        top: 0,
        width: "calc(100% - 20px)",
        height: "50px",
        background: "white",
        zIndex: 9999,
        backgroundColor: backgroundColor,
      }}
    >
      <Box
        style={{
          margin: "10px 0",
          width: "100%",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </header>
  </>)
}
