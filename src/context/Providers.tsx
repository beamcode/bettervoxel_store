"use client"

import { ThemeProvider } from "next-themes"
import { useState, useEffect } from "react"
import { SessionProvider } from "./SessionContext"
import { ModalProvider } from "./ModalContext"
import { RootProvider } from "fumadocs-ui/provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <RootProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <SessionProvider>
          <ModalProvider>{children}</ModalProvider>
        </SessionProvider>
      </ThemeProvider>
    </RootProvider>
  )
}
