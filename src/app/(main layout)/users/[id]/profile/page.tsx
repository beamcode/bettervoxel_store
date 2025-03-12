"use client"

import Container from "@/components/Container"
import Image from "next/image"
import LibrarySection from "@/components/profile/PublishedLibrary"
import PurchasedLibrary from "@/components/profile/PurchasedLibrary"
import PublishedLibrary from "@/components/profile/PublishedLibrary"
import GamesLibrary from "@/components/profile/GamesLibrary"
import { useSession } from "@/context/SessionContext"

export default function Page() {
  const { user } = useSession()

  return (
    <Container mainContainer centered className="space-y-4">
      <div className="flex flex-wrap gap-4 rounded-md border bg-primary p-4">
        <div>
          <Image
            src="/images/default-avatar.webp"
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-md bg-primary"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            {user?.firstname} {user?.lastname}
          </h1>
          <p className="text-sm text-tertiary">@{user?.username}</p>
        </div>
      </div>
      <div className="space-y-8">
        <GamesLibrary />
        <PurchasedLibrary />
        <PublishedLibrary />
      </div>
    </Container>
  )
}
