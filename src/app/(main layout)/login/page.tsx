import Container from "@/components/Container"
import Login from "@/components/auth/Login"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your account to access your profile and settings.",
}

export default function Page() {
  return (
    <Container mainContainer className="flex justify-center">
      <Login />
    </Container>
  )
}
