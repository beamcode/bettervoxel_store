"use client"

import { useRouter, useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import Container from "@/components/Container"
import { Asset } from "@/types/objects.types"
import TagsList from "@/components/marketplace/TagList"
import ImageCarousel from "@/components/marketplace/Carousel"
import { getAssetMetadata } from "@/api/apiCalls"
import { AssetMetadataResponse } from "@/types/api.types"
import { toast } from "react-toastify"
import SquareLoader from "@/components/SquareLoader"
import { buyAsset } from "@/api/apiCalls"
import { DefaultResponse } from "@/types/api.types"
import { useSession } from "@/context/SessionContext"

function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
  return date.toLocaleDateString("en-US", options)
}

function AssetDetails({ asset }: { asset: Asset }): JSX.Element {
  const { refetchUser } = useSession()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<number>(0 as number)
  const tabs: string[] = ["Description", "Specifications"] as string[]

  async function handleBuyAsset(assetId: string) {
    setLoading(true)
    try {
      const response: DefaultResponse = (await buyAsset(assetId as string)) as DefaultResponse
      if (response.success !== undefined) {
        refetchUser()
        toast.success("Asset purchased successfully")
      } else {
        throw new Error(response.error?.message || "Failed to purchase asset")
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
    setLoading(false)
  }

  console.log(asset)

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      <div className="relative flex size-full flex-col overflow-hidden rounded-md bg-primary p-1">
        <ImageCarousel>
          <img
            src={asset.preview_url || "/images/placeholder-image.jpg"}
            alt={asset.name}
            className="h-full object-fill text-white"
          />
        </ImageCarousel>
      </div>
      <div className="flex flex-col justify-between">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl">{asset.name}</h1>
            <span className="text-sm text-secondary">
              Created on {formatDate(asset.created_at)}
            </span>
            <div className="flex gap-2">
              <TagsList tags={asset.tags} />
            </div>
          </div>

          <div className="">
            <div className="flex w-fit gap-1 rounded-md bg-primary p-1">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`rounded-md px-4 py-1 text-sm transition-all hover:bg-secondary hover:text-primary ${
                    activeTab === index && "bg-secondary"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="py-4">
              {activeTab === 0 && <div>{asset.description}</div>}
              {activeTab === 1 && <div>Specifications content</div>}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-md">
          <button
            onClick={() => handleBuyAsset(asset.id)}
            className="flex items-center justify-center rounded-md bg-orange-500 p-2 text-xl font-bold text-white lg:w-40"
          >
            {loading ? <SquareLoader size={1} /> : asset.price === 0 ? "Free" : asset.price + " VC"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const router = useRouter()
  const { slug } = useParams()
  const [asset, setAsset] = useState<Asset | null>(null)
  const [loading, setLoading] = useState(true)

  async function handleGetAssetMetadata(assetId: string) {
    setLoading(true)
    try {
      const response: AssetMetadataResponse = (await getAssetMetadata(
        assetId as string
      )) as AssetMetadataResponse

      if (response.success !== undefined) {
        setAsset(response.success)
      } else {
        throw new Error(response.error?.message || "Failed to fetch asset")
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (slug && typeof slug === "string") {
      handleGetAssetMetadata(slug)
    }
  }, [router, slug])

  return (
    <Container mainContainer className="flex items-center justify-center">
      {loading && <SquareLoader size={10} />}
      {!loading && asset && <AssetDetails asset={asset} />}
    </Container>
  )
}
