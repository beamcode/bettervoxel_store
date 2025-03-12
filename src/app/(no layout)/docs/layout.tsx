import { DocsLayout } from "fumadocs-ui/layouts/docs"
import type { ReactNode } from "react"
import { baseOptions } from "@/app/layout.config"
import { source } from "@/utils/source"
import "@/styles/docs.css"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions} sidebar={{ tabs: false, footer: false }}>
      {children}
    </DocsLayout>
  )
}
