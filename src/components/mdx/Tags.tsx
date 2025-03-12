import Link from "next/link"

export default function Tags({ tags, clickable = false }: { tags: string[]; clickable?: boolean }) {
  const path = "/blog/tag"

  if (!Array.isArray(tags) || tags.length === 0) {
    return null // Return nothing if tags is not an array or if it's empty
  }

  return (
    <div className="flex flex-wrap items-center gap-1 text-sm md:gap-2">
      {tags.map((tag) =>
        clickable ? (
          <Link
            href={`${path}/${tag.toLowerCase()}`}
            key={tag}
            className="h-fit rounded-md bg-orange-200 px-2 text-xs text-black transition-colors duration-300 ease-in-out hover:bg-orange-500"
          >
            {tag}
            <span className="text-[10px]"> ↗</span>
          </Link>
        ) : (
          <span
            key={tag}
            className="h-fit rounded-md bg-orange-200 px-1 text-xs text-black md:px-2"
          >
            {tag}
          </span>
        )
      )}
    </div>
  )
}
