"use client"

import Link from "next/link"

type Heading = {
  id: string
  text: string
  depth: number
}

function extractTOC(content: any): Heading[] {
  const headings: Heading[] = []

  function traverse(node: any) {
    if (node.type === "h1" || node.type === "h2" || node.type === "h3" || node.type === "h4") {
      headings.push({
        id: node.props.id,
        text: node.props.children,
        depth: parseInt(node.type.substring(1)),
      })
    }
    if (node.props && node.props.children) {
      if (Array.isArray(node.props.children)) {
        node.props.children.forEach(traverse)
      } else {
        traverse(node.props.children)
      }
    }
  }

  content.forEach(traverse)
  return headings
}

export default function MdxTocLogic({ content }: { content: any }) {
  const tocData: Heading[] = extractTOC(content)

  return (
    <div className="space-y-3">
      {tocData.map((heading) => (
        <div className="flex" key={heading.id}>
          <Link
            style={{ marginLeft: `${heading.depth - 1}rem` }}
            href={`#${heading.id}`}
            className="rounded-md bg-primary px-2 py-1 text-sm font-normal no-underline hover:text-blue-600"
          >
            {heading.text}
          </Link>
        </div>
      ))}
    </div>
  )
}
