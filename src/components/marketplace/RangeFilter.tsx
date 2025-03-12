import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function RangeFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const priceValues = [10, 25, 50, 100, 200]
  const minPriceParam = searchParams.get("minPrice")
  const maxPriceParam = searchParams.get("maxPrice")

  const [selectedPrice, setSelectedPrice] = useState<number | null>(null)
  const [customMinPrice, setCustomMinPrice] = useState<string>("")
  const [customMaxPrice, setCustomMaxPrice] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isCustomRangeActive =
    selectedPrice === null && (customMinPrice.trim() !== "" || customMaxPrice.trim() !== "")

  useEffect(() => {
    // Sync state with URL parameters
    if (minPriceParam !== null || maxPriceParam !== null) {
      const minPrice = minPriceParam ? parseFloat(minPriceParam) : null
      const maxPrice = maxPriceParam ? parseFloat(maxPriceParam) : null

      if (minPrice === 0 && maxPrice && priceValues.includes(maxPrice)) {
        setSelectedPrice(maxPrice)
        setCustomMinPrice("")
        setCustomMaxPrice("")
      } else {
        setSelectedPrice(null)
        setCustomMinPrice(minPriceParam || "")
        setCustomMaxPrice(maxPriceParam || "")
      }
    } else {
      setSelectedPrice(null)
      setCustomMinPrice("")
      setCustomMaxPrice("")
    }
  }, [minPriceParam, maxPriceParam])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleCustomPriceSubmit()
    }, 500) // Adjust debounce time as needed

    return () => {
      clearTimeout(timeoutId)
    }
  }, [customMinPrice, customMaxPrice])

  function updatePriceRangeInURL(minPrice: string | null, maxPrice: string | null) {
    const params = new URLSearchParams(searchParams.toString())

    if (minPrice !== null && minPrice !== "") {
      params.set("minPrice", minPrice)
    } else {
      params.delete("minPrice")
    }

    if (maxPrice !== null && maxPrice !== "") {
      params.set("maxPrice", maxPrice)
    } else {
      params.delete("maxPrice")
    }

    params.set("start", "0") // Reset pagination
    router.push(`?${params.toString()}`)
  }

  function handlePriceButtonClick(price: number) {
    if (selectedPrice === price) {
      // Deselect
      setSelectedPrice(null)
      updatePriceRangeInURL(null, null)
    } else {
      // Select
      setSelectedPrice(price)
      updatePriceRangeInURL("0", price.toString())
    }
    setCustomMinPrice("")
    setCustomMaxPrice("")
    setErrorMessage(null)
  }

  function handleCustomPriceSubmit() {
    const minPrice = customMinPrice.trim() !== "" ? parseFloat(customMinPrice) : null
    const maxPrice = customMaxPrice.trim() !== "" ? parseFloat(customMaxPrice) : null

    if ((minPrice !== null && isNaN(minPrice)) || (maxPrice !== null && isNaN(maxPrice))) {
      setErrorMessage("Please enter valid numbers.")
      return
    }

    if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
      setErrorMessage("Min price cannot be greater than max price.")
      return
    }

    setSelectedPrice(null)
    updatePriceRangeInURL(
      minPrice !== null ? minPrice.toString() : null,
      maxPrice !== null ? maxPrice.toString() : null
    )
    setErrorMessage(null)
  }

  function handleReset() {
    setSelectedPrice(null)
    setCustomMinPrice("")
    setCustomMaxPrice("")
    updatePriceRangeInURL(null, null)
    setErrorMessage(null)
  }

  return (
    <aside className="flex h-fit w-full flex-col gap-4 rounded-md border border-primary bg-primary p-4 lg:w-[30%]">
      <div className="flex w-full justify-between">
        <h3 className="text-md font-bold">Filters</h3>
        <button
          onClick={handleReset}
          className="text-md h-fit rounded-lg text-center text-blue-500"
        >
          Reset
        </button>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-bold">Price Range</h4>
        <ul className="flex flex-wrap gap-1 text-[2px]">
          {priceValues.map((price) => (
            <li
              key={price}
              onClick={() => handlePriceButtonClick(price)}
              className={`cursor-pointer whitespace-nowrap rounded-lg px-2 py-0.5 text-xs transition-colors ${
                selectedPrice === price
                  ? "bg-orange-400 hover:bg-orange-300"
                  : "bg-secondary hover:bg-tertiary"
              }`}
            >
              <span className="text-[8px]">VC </span>
              {price}
            </li>
          ))}
          <li
            className={`whitespace-nowrap rounded-lg px-2 py-0.5 text-xs ${
              isCustomRangeActive ? "bg-orange-400" : "bg-secondary"
            }`}
          >
            Range
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-[10px] leading-none">VC </span>
            <input
              type="number"
              step="0.01"
              placeholder="Min"
              value={customMinPrice}
              onChange={(e) => setCustomMinPrice(e.target.value)}
              className="input dark:placeholder:text-gray h-full w-20 appearance-none rounded-lg bg-secondary px-2 py-1.5 text-sm outline-none"
            />
          </div>
          <span className="text-sm">to</span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] leading-none">VC </span>
            <input
              type="number"
              step="0.01"
              placeholder="Max"
              value={customMaxPrice}
              onChange={(e) => setCustomMaxPrice(e.target.value)}
              className="input dark:placeholder:text-gray h-full w-20 appearance-none rounded-lg bg-secondary px-2 py-1.5 text-sm outline-none"
            />
          </div>
        </div>
        {errorMessage && (
          <p className="w-fit rounded-lg bg-secondary px-2 py-0.5 text-xs text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    </aside>
  )
}
