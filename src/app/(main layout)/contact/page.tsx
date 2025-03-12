import { Metadata } from "next"
import React from "react"
import Link from "next/link"
import Container from "@/components/Container"
import { MdAttachEmail } from "react-icons/md"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with BetterVoxel for support, feedback, or collaboration. We're here to help enhance your experience.",
}

export default function Page() {
  return (
    <Container mainContainer centered>
      <h1 className="text-3xl font-extrabold">Contact Us</h1>
      <p className="text-md mt-3">
        {
          "For questions or requests about BetterVoxel, please reach out, we're here to help with support, feedback or collaboration opportunities. Your feedback drives our improvements, let's discuss how we can enhance BetterVoxel's experience together."
        }
      </p>
      <div className="mt-12">
        <h2 className="text-2xl font-extrabold">Details</h2>
        <ul className="mt-3 space-y-4">
          <li className="flex items-center">
            <MdAttachEmail size={30} />
            <Link href="mailto:victor.vindevogel@epitech.eu" className="ml-3 text-sm">
              <p className="block">Mail</p>
              <strong className="underline">victor.vindevogel@epitech.eu</strong>
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  )
}
