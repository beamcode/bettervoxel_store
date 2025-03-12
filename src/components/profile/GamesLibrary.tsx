"use client"

import { getPurchasedAssets, deleteAsset, publishAsset } from "@/api/apiCalls"
import { PurchasedAssetsResponse, DefaultResponse } from "@/types/api.types"
import { Asset } from "@/types/objects.types"
import { useEffect, useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaRegTrashAlt } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import { useModal } from "@/context/ModalContext"
import EditAsset from "@/components/settings/EditAsset"
import { toast } from "react-toastify"
import { FaDownload } from "react-icons/fa6"
import { TbWorldUpload } from "react-icons/tb"
import { useRef } from "react"

export default function GamesLibrary() {
  const [assets, setAssets] = useState<Asset[]>([] as Asset[])
  const [loading, setLoading] = useState<boolean>(true as boolean)
  const [loadingPublish, setLoadingPublish] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null as number | null)
  const { openModal, closeModal, isOpen } = useModal()
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = (index: number): void => {
    setDropdownIndex(dropdownIndex === index ? null : index)
  }

  async function handleDeleteAsset(assetId: string) {
    setLoading(true)
    setError(null)
    try {
      const response: DefaultResponse = await deleteAsset(assetId)
      if (response.success !== undefined) {
        toast.success("Asset deleted successfully")
        handleGetPurchasedAssets()
        closeModal()
      } else {
        throw new Error(response.error?.message || "An unknown error occurred while updating asset")
      }
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred while updating asset")
    }
    setLoading(false)
  }

  async function handleGetPurchasedAssets() {
    setLoading(true)
    setError(null)
    try {
      const response: PurchasedAssetsResponse =
        (await getPurchasedAssets()) as PurchasedAssetsResponse
      if (response.success !== undefined) {
        setAssets(response.success.filter((asset) => asset.asset_type.toLowerCase() === "game"))
      } else {
        throw new Error(
          response.error?.message || "An unknown error occurred while fetching assets"
        )
      }
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred while fetching assets")
    }
    setLoading(false)
  }

  async function handlePublishAsset(
    assetId: string,
    _name: string,
    _description: string,
    _tags: string[],
    _price: number | null
  ) {
    setLoadingPublish(true)
    setError(null)
    try {
      const response: DefaultResponse = (await publishAsset(assetId, {
        name: _name,
        description: _description,
        tags: _tags,
        price: _price || 0,
      })) as DefaultResponse
      if (response.success !== undefined) {
        closeModal()
        toast.success("Asset published successfully")
        handleGetPurchasedAssets()
      } else {
        throw new Error(
          response.error?.message || "An unknown error occurred while publishing asset"
        )
      }
    } catch (error) {
      setError((error as Error).message || "An unknown error occurred while updating asset")
    }
    setLoadingPublish(false)
  }

  function handleDelete(assetId: string) {
    openModal(
      <div className="space-y-4 rounded-md border border-primary bg-primary p-4">
        <h2 className="text-lg font-medium">Delete Game</h2>
        <p>Are you sure you want to delete this game?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => handleDeleteAsset(assetId)}
            className="rounded-md bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>
          <button onClick={closeModal} className="rounded-md bg-secondary px-4 py-2 text-white">
            Cancel
          </button>
        </div>
      </div>
    )
  }

  function handlePublish(asset: Asset) {
    openModal(
      <EditAsset
        name={asset.name}
        description={asset.description}
        tags={asset.tags}
        price={asset.price}
        loading={loadingPublish}
        confirmEdit={(_name, _description, _tags, _price) =>
          handlePublishAsset(asset.id, _name, _description, _tags, _price)
        }
      />
    )
  }

  useEffect(() => {
    handleGetPurchasedAssets()
  }, [])

  // useEffect(() => {
  //   if (isOpen === false ) {
  //     setDropdownIndex(null)
  //   }
  // }, [isOpen])

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="mb-6 flex w-full flex-col lg:w-1/2">
        <h2 className="text-lg font-medium lg:text-xl">Games</h2>
      </div>

      {error && !loading && <p className="text-red-500">Error: {error as string}</p>}
      {!loading && !error && assets.length === 0 && (
        <p className="text-secondary">No games found</p>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {!loading &&
          assets.length > 0 &&
          !error &&
          assets.map((asset, index) => (
            <div
              key={asset.id}
              className="relative flex flex-col gap-2 overflow-hidden rounded-md bg-secondary p-2"
            >
              <div className="h-40 grow overflow-hidden rounded-md bg-tertiary">
                <img
                  src={
                    asset.preview_url?.startsWith("http")
                      ? asset.preview_url
                      : "/images/placeholder-image.jpg"
                  }
                  alt={asset.name}
                  className="size-full rounded-md object-cover"
                />
              </div>
              <div className="flex w-full items-end">
                <div className="w-full">
                  <p className="text-sm font-medium">{asset.name}</p>
                  <p className="text-sm text-gray-500">{asset.asset_type}</p>
                </div>

                <button
                  onClick={() => toggleDropdown(index)}
                  className="relative flex min-h-10 items-center justify-center"
                >
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>

              {/* Dropdown Menu */}
              {dropdownIndex === index && (
                <div className="absolute inset-0 z-10 flex size-full flex-col rounded-md bg-secondary p-2 text-sm">
                  <ul className="h-full">
                    <li>
                      <button
                        onClick={() => handlePublish(asset)}
                        className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-tertiary"
                      >
                        <TbWorldUpload size={16} />
                        Publish
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => toast.info("Not implemented yet")}
                        className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-tertiary"
                      >
                        <FaDownload />
                        Download
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleDelete(asset.id)}
                        className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <FaRegTrashAlt />
                        Delete
                      </button>
                    </li>
                  </ul>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="relative flex size-10 items-center justify-center self-end transition-colors duration-100"
                  >
                    <RxCross2 size={25} />
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
