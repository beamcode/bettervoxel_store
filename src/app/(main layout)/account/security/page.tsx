import SecuritySection from "@/components/settings/Security"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Security",
  description: "Update your account security settings.",
}

export default function Page() {
  return (
    <div className="flex w-full flex-col">
      <SecuritySection />
    </div>
  )
}
