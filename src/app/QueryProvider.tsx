"use client"

import { ReactNode, useState } from "react"
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MESSAGE } from "@/common/domains/Messages"

export default function QueryProvider ({ children }: { children: ReactNode }): ReactNode {
  const [ client ] = useState<QueryClient>(new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 0,
        staleTime: 0,
        // enabled: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
      },
    },
    queryCache: new QueryCache({
      onError: () => {
        alert(MESSAGE.COMMON.REQUEST_FAIL)
      },
    }),
  }))

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
