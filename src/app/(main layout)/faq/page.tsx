import Container from "@/components/Container"
import type { Metadata } from "next"
import Faq from "@/components/Faq"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about BetterVoxel",
}

export default function Page() {
  return (
    <Container mainContainer centered>
      <Faq />
    </Container>
  )
}
