import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import "@/styles/globals.css"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ThemeSwitcher from "@/components/ThemeSwitcher"

export const metadata: Metadata = {
  title: "BetterVoxel",
  description: "BetterVoxel. The voxel engine for the future.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <div className="relative">
    //   <div className="h-[50px]">
    //     <div className="fixed z-50 flex w-full justify-between border-b bg-primary px-8 py-2 dark:border-gray-700 sm:px-4">
    //       <Link
    //         href="/"
    //         className="flex min-w-fit items-center justify-center gap-3 overflow-hidden rounded-md"
    //       >
    //         <Image src="/images/logo.png" width={25} height={25} alt="BetterVoxel Logo" />
    //         <span className="font-Montserrat text-2xl font-extrabold">BetterVOXEL</span>
    //       </Link>
    //       <ThemeSwitcher />
    //     </div>
    //   </div>

    //   <div className="relative h-[calc(100vh-50px)] w-full overflow-scroll border border-[red]">
    //     <div className="absolute inset-0">{children}</div>
    //   </div>
    // </div>
    // <div className="pt-20">{children}</div>
    <>{children}</>
  )
}
