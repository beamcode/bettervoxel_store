import React from "react"
import Link from "next/link"
import ScrollToTopButton from "./ScrollTopButton"
import { FaLinkedin } from "react-icons/fa"
import { FaReddit } from "react-icons/fa"
import ThemeSwitcher from "./ThemeSwitcher"
import { footer } from "@/../config"

export type FooterCategory = {
  title: string
  items: FooterItem[]
}

type FooterItem = {
  label: string
  href: string
  newWindow?: boolean
  external?: boolean
}

function LinksColumn(props: { title: string; items: FooterItem[] }) {
  return (
    <div className="block w-fit lg:w-full">
      <span className="mb-4 block font-FiraMonoRegular text-[13px] tracking-[3px] dark:text-secondary">
        {props.title}
      </span>
      <div className="flex flex-col gap-2 text-[14px]">
        {props.items.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="cursor-pointer whitespace-nowrap pr-3 transition duration-300 ease-in-out hover:text-orange-500"
          >
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="relative flex justify-center gap-10 border-t p-10 subpixel-antialiased">
      {/* <div className="translate-z-0 flex w-full max-w-[1400px] transform flex-col justify-center overflow-hidden rounded-md border border-[hsla(0,0%,0%,0.06)] bg-primary p-8 shadow-[inset_0_1px_1px_0_hsla(0,0%,0%,0.15)] backdrop-blur-[5px] will-change-[height,transform] dark:border-[hsla(0,0%,100%,0.06)] dark:shadow-[inset_0_1px_1px_0_hsla(0,0%,100%,0.15)]"> */}
      <div className="translate-z-0 flex w-full max-w-[1400px] transform flex-col items-center justify-center backdrop-blur-[5px] will-change-[height,transform] dark:border-[hsla(0,0%,100%,0.06)]">
        <div className="mb-10 flex w-full justify-between">
          <div className="flex items-center gap-5">
            {/* discord */}
            <Link
              href="https://discord.gg/seFnMdccqd"
              target="_blank"
              className="group block cursor-pointer"
            >
              <svg
                className="size-7 fill-secondary transition duration-300 group-hover:fill-orange-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 127.14 96.36"
              >
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
            </Link>

            {/* reddit */}
            <Link
              href="https://www.reddit.com/r/BetterVoxel/"
              target="_blank"
              className="group block cursor-pointer"
            >
              <FaReddit
                size={27}
                className="fill-secondary transition duration-300 group-hover:fill-orange-500"
              />
            </Link>

            {/* linkedin */}
            <Link
              href="https://www.linkedin.com/company/bettervoxel/"
              target="_blank"
              className="group block cursor-pointer"
            >
              <FaLinkedin
                size={27}
                className="fill-secondary transition duration-300 group-hover:fill-orange-500"
              />
            </Link>
          </div>

          <div className="flex h-fit items-center gap-2">
            <ScrollToTopButton />
            <ThemeSwitcher />
          </div>
        </div>

        {/* Links container */}
        <div className="flex w-full flex-col justify-between space-y-10 md:flex-row md:items-end">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
            {footer.map((item, index) => (
              <LinksColumn key={index} title={item.title} items={item.items} />
            ))}
          </div>
          <div className="flex h-fit w-fit font-BrutalRegular text-xs">
            <span>© {new Date().getFullYear()}, BetterVoxel, Inc. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
