import Container from "@/components/Container"
import ResetPassword from "@/components/auth/ResetPassword"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password to regain access to your account.",
}

export default function Page() {
  return (
    <Container mainContainer className="flex justify-center">
      {/* <ResetPassword /> */}
      <h1>lol sucks to be u</h1>
    </Container>
  )
}
