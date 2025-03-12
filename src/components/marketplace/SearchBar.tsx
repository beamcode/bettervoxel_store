"use client"

import { useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IoSearch } from "react-icons/io5"

// Debounce function
function debounce(func: (...args: any[]) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId) // Clear previous timer
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize searchQuery from the URL parameter on mount
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("search") || "")

  // Debounced function to handle the search
  const debouncedSearch = useCallback(
    debounce((query) => {
      const params = new URLSearchParams()

      if (query.trim()) {
        params.set("search", query.trim())
      }

      router.push(`?${params.toString()}`)
    }, 300),
    []
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSearchQuery(value)
    debouncedSearch(value)
  }

  return (
    <div className="flex w-full items-center gap-2 rounded-md border border-primary bg-primary pl-2">
      <IoSearch size={24} />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
        className="input dark:placeholder:text-gray size-full rounded-md bg-transparent outline-none"
      />
    </div>
  )
}
