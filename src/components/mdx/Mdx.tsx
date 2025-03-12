import { MDXRemote } from "next-mdx-remote/rsc"
import { useMDXComponents } from "./MdxComponents"
import rehypePrettyCode from "rehype-pretty-code"
import { Suspense } from "react"
import { twMerge } from "tailwind-merge"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
// import rehypeAutolinkHeadings from "rehype-autolink-headings"

const classes = {
  title: `bg-zinc-700 text-neutral-300  pl-4 py-2 rounded-t-md`,
  line: `px-4`,
  lineHighlighted: `bg-teal-100/10 relative border-l-[5px] pl-[11px] border-orange-500`,
  lineHighlightedChar: `box-border`,
}

const RehypePrettyCodeOptions = {
  theme: "one-dark-pro",
  onVisitTitle: (node: any) => {
    if (!node.properties.className) {
      node.properties.className = []
    }
    node.properties.className.push(classes.title)
  },
  onVisitHighlightedLine: (node: any) => {
    node.properties.className?.push(classes.lineHighlighted)
  },
  onVisitLine: (node: any) => {
    node.properties.className = [classes.line]

    // if (node.children.length === 0) {
    //   node.children = [{ type: "text", value: " " }]
    // }
  },
  onVisitHighlightedChars: (node: any) => {
    if (!node.properties.className) {
      node.properties.className = []
    }
    node.properties.className?.push(classes.lineHighlightedChar)
  },
}

export function MDX({
  children,
  enableMaxWidth = false,
}: {
  children: string
  enableMaxWidth?: boolean
}) {
  const Markdown = useMDXComponents({})

  const articleClassNames = twMerge(
    "prose dark:prose-invert",
    enableMaxWidth ? "lg:max-w-prose" : "max-w-none"
  )

  const options1: any = {
    mdxOptions: {
      rehypePlugins: [[rehypePrettyCode as any, RehypePrettyCodeOptions], rehypeSlug],
      remarkPlugins: [remarkGfm],
    },
  }

  return (
    <Suspense fallback={<h1>Loading bro</h1>}>
      <article className={articleClassNames}>
        <MDXRemote source={children} options={options1} components={Markdown} />
      </article>
    </Suspense>
  )
}
