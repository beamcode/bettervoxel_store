import { useSearchParams, useRouter } from "next/navigation"
import { FaChevronDown } from "react-icons/fa"

const sortOptions: Record<string, { sortBy: string; sortDir?: string }> = {
  price_asc: { sortBy: "price", sortDir: "ASC" },
  price_desc: { sortBy: "price", sortDir: "DESC" },
  free: { sortBy: "free" },
  newest: { sortBy: "newest" },
  oldest: { sortBy: "oldest" },
  title_asc: { sortBy: "title", sortDir: "ASC" },
  title_desc: { sortBy: "title", sortDir: "DESC" },
}

export default function SortItems() {
  const searchParams = useSearchParams()
  const router = useRouter()

  function handleSort(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString())

    const { sortBy, sortDir } = sortOptions[sortOrder] || {}

    if (sortBy) {
      params.set("sortBy", sortBy)
      sortDir ? params.set("sortDir", sortDir) : params.delete("sortDir")
    } else {
      params.delete("sortBy")
      params.delete("sortDir")
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="relative flex w-fit items-center overflow-hidden rounded-md border border-primary bg-primary">
      <select
        onChange={(e) => handleSort(e.target.value)}
        className="h-full cursor-pointer appearance-none rounded-none border-r-[4rem] border-transparent bg-primary p-2 text-sm subpixel-antialiased outline-none transition-colors [-webkit-appearance:none]"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="title_asc">Title (A-Z)</option>
        <option value="title_desc">Title (Z-A)</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="free">Free</option>
      </select>
      <FaChevronDown className="absolute right-2" />
    </div>
  )
}
