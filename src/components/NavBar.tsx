"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { TbCubeSpark } from "react-icons/tb"
import { RiSettingsFill } from "react-icons/ri"
import { useSession } from "@/context/SessionContext"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"

const navItems: { href: string; title: string }[] = [
  { href: "/play", title: "Play" },
  { href: "/marketplace", title: "Marketplace" },
  { href: "/voxcoins", title: "VoxCoins" },
  { href: "/download", title: "Download" },
]

function Logo() {
  return (
    <Link
      href="/"
      className="group relative flex min-w-fit items-center justify-center gap-2 font-sans"
    >
      <Image
        src="/images/logo.png"
        width={0}
        height={0}
        sizes="100vw"
        alt="BetterVoxel Logo"
        className="aspect-square size-[35px] min-w-[35px] animate-duration-[250ms] animate-fill-backwards animate-once animate-ease-linear group-hover:animate-wiggle-more"
      />
      <div className="hidden flex-col [@media(min-width:350px)]:flex">
        <span className="font-Montserrat text-lg leading-none">BetterVoxel</span>
        <div className="h-fit w-fit bg-orange-600 px-1 text-center text-[10px] font-bold text-black">
          <span>BETA</span>
        </div>
      </div>
    </Link>
  )
}

function LoggedInControls({ user, voxcoins }: { user: string; voxcoins: number }) {
  const { logout } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)

  const handleLogout = async () => {
    const result = await logout()
  }

  // Toggle the dropdown
  const handleToggleDropdown = () => {
    setDropdownOpen((prev) => !prev)
  }

  // Close dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Close dropdown when clicking a link inside
  const handleLinkClick = () => {
    setDropdownOpen(false)
  }

  return (
    <ul className="flex gap-2">
      <li>
        <Link
          href="/users/44/profile"
          className="flex h-8 items-center gap-1.5 rounded-md p-1 transition-colors hover:bg-secondary"
        >
          <Image
            src="/images/default-avatar.webp"
            width={24}
            height={24}
            alt="VoxCoin"
            className="rounded-md"
          />
          <span className="hidden pr-0.5 text-sm sm:block">{user}</span>
        </Link>
      </li>
      <li>
        <Link
          href="/voxcoins"
          className="flex h-8 items-center gap-1 rounded-md p-1 transition-colors hover:bg-secondary"
        >
          <TbCubeSpark size={24} className="text-yellow-500" />
          <span>{voxcoins}</span>
        </Link>
      </li>
      <li className="relative" ref={dropdownRef}>
        <button
          onClick={handleToggleDropdown}
          className="flex h-8 w-8 items-center justify-center rounded-md p-1 transition-colors hover:bg-secondary"
        >
          <RiSettingsFill size={24} />
        </button>
        {/* Dropdown panel */}
        <div
          className={`absolute right-[calc(100%-32px)] top-full z-10 mt-2 flex min-w-[130px] origin-top-right transform flex-col rounded-md border bg-default p-1 shadow-md transition-all duration-200 ease-in-out ${
            dropdownOpen ? "visible opacity-100" : "invisible opacity-0"
          } `}
        >
          <div className="absolute -top-[7px] right-[9px] h-3 w-3 rotate-45 border-l border-t bg-default" />
          <ul>
            <li>
              <Link
                href="/account"
                onClick={handleLinkClick}
                className="block w-full rounded-sm px-2 py-1 hover:bg-primary"
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full rounded-sm px-2 py-1 text-left hover:bg-primary"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  )
}

function LoggedOutControls() {
  return (
    <ul className="flex gap-3">
      <li>
        <Link
          href="/signup"
          className="flex h-8 items-center gap-1 rounded-md bg-orange-500 px-2 transition-colors hover:bg-orange-600 dark:bg-orange-500"
        >
          <span className="text-nowrap [text-shadow:_0px_0px_10px_rgb(0_0_0_/_20%)]">Sign Up</span>
        </Link>
      </li>
      <li>
        <Link
          href="/login"
          className="flex h-8 items-center gap-1 text-nowrap border-b-4 border-transparent px-2 transition-colors hover:border-orange-500"
        >
          Log In
        </Link>
      </li>
    </ul>
  )
}

function NavItems({ type = "none" }: { type?: string }) {
  const pathname = usePathname().toLowerCase()

  return (
    <ul className="flex w-full list-none items-stretch text-sm">
      {navItems.map((item, index) => {
        const isActive = pathname.startsWith(item.href.toLowerCase())

        return (
          <li key={index} className="flex w-full items-stretch">
            <Link
              href={item.href}
              className="relative flex flex-1 items-center justify-center transition-colors hover:bg-secondary md:px-4"
            >
              {item.title}
              {isActive && (
                <motion.div
                  layoutId={type}
                  className="absolute inset-x-0 bottom-0 h-1 bg-orange-500"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default function NavBar() {
  const { user } = useSession()

  return (
    <nav className="ease-in-outborder fixed flex w-full flex-col items-center justify-center gap-2 border-b bg-primary px-3 transition-all duration-200">
      <div className="flex w-full max-w-[1400px] flex-col items-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex min-h-12 items-stretch gap-4">
            <Logo />

            <div className="hidden w-full lg:flex lg:items-stretch">
              <NavItems type="desktop" />
            </div>
          </div>

          {user ? (
            <LoggedInControls user={user.username} voxcoins={user.voxcoins} />
          ) : (
            <LoggedOutControls />
          )}
        </div>

        <div className="justify flex min-h-10 w-full items-stretch gap-4 lg:hidden">
          <NavItems type="mobile" />
        </div>
      </div>
    </nav>
  )
}
