"use client"

import { ReactNode, useEffect, useState } from "react"
import AuthStore from "@/common/stores/AuthStore"

export default function AuthProvider ({ children }: { children: ReactNode }): ReactNode {
  const initializeAuth = AuthStore((state) => state.initializeAuth)
  const [ isComplete, setIsComplete ] = useState<boolean>(false)

  useEffect(() => {
    initializeAuth()
    setIsComplete(true)
  }, [initializeAuth])

  return (<>
    { isComplete && children }
  </>)
}
