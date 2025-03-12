"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Container from "@/components/Container"
import LoadingIndicator from "@/components/LoadingIndicator"
import AssetCard from "@/components/marketplace/AssetCard"
import SearchBar from "@/components/marketplace/SearchBar"
import Pagination from "@/components/marketplace/Pagination"
import ItemsPerPage from "@/components/marketplace/ItemsPerPage"
import RangeFilter from "@/components/marketplace/RangeFilter"
import SortItems from "@/components/marketplace/SortItems"
import LoadingCard from "@/components/marketplace/LoadingCard"
import { getMarketplaceAssets } from "@/api/apiCalls"
import { MarketplaceResponse } from "@/types/api.types"
import { Asset } from "@/types/objects.types"
import type { Metadata } from "next"
import SquareLoader from "@/components/SquareLoader"
import { toast } from "react-toastify"

// export const metadata: Metadata = {
//   title: "Marketplace",
//   description: "Browse and purchase assets from the marketplace.",
// }

// import { getAssets } from "@/api/getAssets"

type PagingInfo = {
  count: number
  start: number
  total: number
}

function AssetStore() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [assetsList, setAssets] = useState([] as Asset[])
  const [paging, setPaging] = useState({ count: 0, start: 0, total: 0 } as PagingInfo)

  async function fetchAssets() {
    setLoading(true)
    try {
      const response: MarketplaceResponse = await getMarketplaceAssets({
        start: parseInt(searchParams.get("start") || "0", 10),
        count: parseInt(searchParams.get("count") || "20", 10),
        search: searchParams.get("search") || undefined,
        sortBy: searchParams.get("sortBy") || undefined,
        sortDir: searchParams.get("sortDir") || undefined,
        minPrice: searchParams.get("minPrice") || undefined,
        maxPrice: searchParams.get("maxPrice") || undefined,
      })

      if (response.success !== undefined) {
        setAssets(response.success.data)
        setPaging(response.success.infos)
      } else {
        throw new Error(response.error?.message || "Failed to fetch assets")
      }
    } catch (error) {
      console.error(error)
      toast.error((error as Error).message || "Failed to fetch assets")
    }
    // Only to show off my loading indicator lol
    setTimeout(() => setLoading(false), 2000)
  }

  useEffect(() => {
    fetchAssets()
  }, [searchParams])

  // Calculate total pages
  const totalPages = Math.ceil(paging.total / paging.count)

  return (
    <Container mainContainer>
      <div className="flex flex-col-reverse gap-5 lg:flex-row">
        <div className="w-full space-y-5">
          <div className="flex h-10 w-full justify-between gap-4">
            <SearchBar />
            <SortItems />
          </div>

          {loading ? (
            <div className="flex min-h-96 items-center justify-center">
              <SquareLoader size={8} />
            </div>
          ) : assetsList.length === 0 ? (
            <div className="flex min-h-96 w-full items-center justify-center gap-2">
              <h3 className="text-2xl font-bold">No assets found</h3>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {assetsList.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          )}

          <div className="flex w-full justify-between">
            <ItemsPerPage />
            <Pagination totalItems={paging.total} />
          </div>
        </div>
        <RangeFilter />
      </div>
    </Container>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <AssetStore />
    </Suspense>
  )
}
