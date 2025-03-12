"use client"

import Container from "@/components/Container"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Metadata } from "next"
import { useSession } from "@/context/SessionContext"
import { useRouter } from "next/navigation"
import { MdOutlineSecurity } from "react-icons/md"
import { User, Lock } from "lucide-react"

//  { name: "Library", path: `${parentRoute}/library`, admin: false, icon: <IoLibrarySharp /> },
//  { name: "VoxCoins", path: `${parentRoute}/voxcoins`, admin: false, icon: <RiMoneyEuroCircleFill /> }

// should use middleware for admin route check in future, but im lazy right now

const config = {
  parentRoute: "/account",
  iconSize: 20,
}

interface Links {
  name: string
  path: string
  admin?: boolean
  icon: React.ReactNode
}

const links: Links[] = [
  {
    name: "Account Info",
    path: `${config.parentRoute}`,
    admin: false,
    icon: <User size={config.iconSize} />,
  },
  {
    name: "Security",
    path: `${config.parentRoute}/security`,
    admin: false,
    icon: <Lock size={config.iconSize} />,
  },
  {
    name: "Admin Panel",
    path: `${config.parentRoute}/admin`,
    admin: true,
    icon: <MdOutlineSecurity size={config.iconSize} />,
  },
]

export default function LocalLayout({ children }: { children: React.ReactNode }) {
  const { user } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Container mainContainer centered className="flex min-h-[500px] flex-col gap-8 md:flex-row">
      <aside className="flex min-w-56 flex-col rounded-md border border-primary bg-primary p-2">
        {links.map((link) => {
          // If the link is for admin, check if the user is admin
          if (link.admin && user?.role !== "Admin") return null

          return (
            <Link
              key={link.path}
              href={link.path}
              passHref
              className={`flex w-full items-center justify-center gap-4 border-l-4 p-1.5 px-2 text-sm transition-colors duration-100 ${
                pathname === link.path
                  ? "border-orange-500"
                  : "border-transparent hover:border-l-secondary"
              } ${link.path === "/account/admin" ? "text-red-500" : "text-primary"} `}
            >
              <div className="">{link.icon}</div>
              <span className="w-full text-left">{link.name}</span>
            </Link>
          )
        })}
      </aside>
      {children}
    </Container>
  )
}
