import React from "react"
import AccountSection from "@/components/settings/AccountInfo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Account Info",
  description: "Update your account information.",
}

export default function Page() {
  return (
    <div className="flex w-full flex-col">
      <AccountSection />
    </div>
  )
}
