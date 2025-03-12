import Container from "@/components/Container"
import SignUp from "@/components/auth/SignUp"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account to use the platform.",
}

export default function Page() {
  return (
    <Container mainContainer className="flex justify-center">
      <SignUp />
    </Container>
  )
}
