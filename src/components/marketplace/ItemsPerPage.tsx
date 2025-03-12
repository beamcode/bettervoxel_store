import { useRouter, useSearchParams } from "next/navigation"
import { FaChevronDown } from "react-icons/fa"

export default function ItemsPerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const options = [8, 20, 60, 100] // Define available options
  const currentCount = parseInt(searchParams.get("count") || "20", 10)

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newCount = e.target.value
    const params = new URLSearchParams(searchParams.toString())

    params.set("count", newCount)
    params.set("start", "0") // Reset to the first page because api call refresh for more values

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="relative flex w-fit items-center overflow-hidden rounded-md border border-primary bg-primary">
      <select
        value={currentCount}
        onChange={handleChange}
        className="h-full cursor-pointer appearance-none border-r-[1.5rem] border-transparent bg-transparent p-2 text-sm subpixel-antialiased outline-none transition-colors [-webkit-appearance:none]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option} per page
          </option>
        ))}
      </select>
      <FaChevronDown className="absolute right-2" />
    </div>
  )
}
