import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import Image from "next/image"
import Link from "next/link"

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */

function Title() {
  return (
    <Link href="/" className="flex items-center space-x-2 font-medium">
      <Image src="/images/logo.png" alt="BetterVoxel Logo" width={22} height={22} />
      <h1 className="text-lg font-bold">BetterVoxel</h1>
    </Link>
  )
}

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Title />,
  },
  links: [
    {
      text: "Documentation",
      url: "/docs",
      active: "nested-url",
    },
  ],
}
