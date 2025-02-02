import { ReactNode } from "react"
import { Box } from "@chakra-ui/react"

export default function Container({children, backgroundColor = "var(--color-background)"}:
  Readonly<{children: ReactNode, backgroundColor?: "var(--color-background)" | "white"}>
) {
  return (
    <Box
      style={{
        minHeight: "100vh",
        padding: "0 10px",
        backgroundColor: backgroundColor,
      }}
    >
      <Box style={{ height: "calc(30px + 20px)" }}></Box>
      { children }
      <Box style={{ height: "50px" }}></Box>
    </Box>
  )
}
