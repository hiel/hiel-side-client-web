"use client"

import { useIsFetching } from "@tanstack/react-query"

export default function LoadSpinner() {
  const isFetching = useIsFetching()

  return (<>
    { isFetching !== 0 && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "red",
          opacity: 0.2,
        }}
      >
        isLoading
      </div>
    )}
  </>)
}
