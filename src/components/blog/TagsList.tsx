import Link from "next/link"

interface TagsListProps {
  tags: string[]
  path: string
  selected?: string
}

export default function TagsList({ tags, path, selected }: TagsListProps) {
  function getHref(tag: string) {
    const isSelected = tag.toLowerCase() === selected
    return isSelected ? "/blog" : `${path}/${tag.toLowerCase()}`
  }

  return (
    <div className="mb-14 flex gap-4">
      <h2 className="text-lg font-semibold">Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string) => (
          <Link href={getHref(tag)} key={tag}>
            <span
              className={`inline-block cursor-pointer rounded-md px-3 py-1 text-sm font-semibold transition-colors duration-300 ease-in-out ${
                tag.toLowerCase() === selected
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-400"
              }`}
            >
              #{tag}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
