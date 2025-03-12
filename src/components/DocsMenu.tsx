"use client"

import { useState } from "react"
import Link from "next/link"

interface Docs {
  title: string
  slug?: string
  children?: Docs[]
}

function DocItem({ item, baseLink, level = 0 }: { item: Docs; baseLink: string; level?: number }) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <li className="relative flex w-full cursor-pointer items-center justify-between text-left text-sm">
      {item.slug ? (
        <Link
          href={baseLink + item.slug}
          className={`flex w-full items-center justify-between rounded-md bg-primary px-2 py-1 transition-colors hover:bg-tertiary`}
        >
          {item.title}
        </Link>
      ) : (
        <div className="w-full">
          <button
            onClick={toggleOpen}
            className={`flex w-full items-center justify-between rounded-md bg-primary px-2 py-1 transition-colors hover:bg-tertiary`}
          >
            {item.title}
            <svg
              fill="none"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className={`size-4 transform transition-transform duration-300 ease-in-out ${
                isOpen ? "" : "-rotate-90"
              }`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {item.children && item.children.length > 0 && (
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="my-3 flex flex-col space-y-3 border-l-2 border-tertiary-border pl-5">
                {item.children.map((child) => (
                  <DocItem
                    key={child.slug || child.title}
                    item={child}
                    baseLink={baseLink}
                    level={level + 1}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </li>
  )
}

export default function DocsMenu({ data }: { data: Docs[] }) {
  const baseLink = "/docs/"

  return (
    <ul className="text-md space-y-3">
      {data.map((item) => (
        <DocItem key={item.slug || item.title} item={item} baseLink={baseLink} />
      ))}
    </ul>
  )
}
