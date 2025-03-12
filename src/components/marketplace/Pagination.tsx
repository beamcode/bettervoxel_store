import { useRouter, useSearchParams } from "next/navigation"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6"

export default function Pagination({ totalItems }: { totalItems: number }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const count = parseInt(searchParams.get("count") || "20", 10)
  const start = parseInt(searchParams.get("start") || "0", 10)

  const currentPage = Math.floor(start / count) + 1
  const totalPages = Math.ceil(totalItems / count)

  // If there's only one page, don't render the pagination
  if (totalPages <= 1) {
    return null
  }

  function handlePageChange(page: number) {
    const newStart = (page - 1) * count
    const params = new URLSearchParams(searchParams.toString())

    params.set("start", newStart.toString())
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex space-x-2">
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="flex items-center justify-center rounded-md border border-primary bg-primary p-1 px-2 hover:bg-secondary focus:outline-none"
        >
          <FaChevronLeft size={14} />
        </button>
      )}

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={`flex items-center rounded-md border border-primary px-3 py-2 leading-none transition-colors focus:outline-none ${
            currentPage === i + 1 ? "bg-secondary" : "bg-primary hover:bg-secondary"
          }`}
        >
          {i + 1}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="flex items-center justify-center rounded-md border border-primary bg-primary p-1 px-2 hover:bg-secondary focus:outline-none"
        >
          <FaChevronRight size={14} />
        </button>
      )}
    </div>
  )
}
