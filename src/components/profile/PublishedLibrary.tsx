"use client"

import { getPublishedAssets, editAsset, deleteAsset } from "@/api/apiCalls"
import { PublishedAssetsResponse, DefaultResponse } from "@/types/api.types"
import { Asset } from "@/types/objects.types"
import { useEffect, useState } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaRegTrashAlt } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import { useModal } from "@/context/ModalContext"
import EditAsset from "@/components/settings/EditAsset"
import { toast } from "react-toastify"
import { FaEdit } from "react-icons/fa"

export default function PublishedLibrary() {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null as number | null)
  const [assets, setAssets] = useState<Asset[]>([] as Asset[])
  const [loading, setLoading] = useState<boolean>(true as boolean)
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false as boolean)
  const [error, setError] = useState<string | null>(null as string | null)
  const { openModal, closeModal, isOpen } = useModal()

  const toggleDropdown = (index: number): void => {
    setDropdownIndex(dropdownIndex === index ? null : index)
  }

  async function handleGetPublishedAssets() {
    setLoading(true)
    try {
      const response: PublishedAssetsResponse =
        (await getPublishedAssets()) as PublishedAssetsResponse
      if (response.success !== undefined) {
        setAssets(response.success)
      } else {
        throw new Error(response.error?.message || "An error occurred")
      }
      setError(null)
    } catch (error) {
      setError((error as Error).message)
    }
    setLoading(false)
  }

  async function handleEditAsset(
    assetId: string,
    _name: string,
    _description: string,
    _tags: string[],
    _price: number | null
  ) {
    setLoadingEdit(true)
    try {
      const response: DefaultResponse = await editAsset(assetId, {
        name: _name,
        description: _description,
        tags: _tags,
        price: _price || 0,
      })
      if (response.success !== undefined) {
        toast.success("Asset updated successfully")
        handleGetPublishedAssets()
        closeModal()
      } else {
        throw new Error(response.error?.message || "An unknown error occurred while updating asset")
      }
    } catch (error) {
      toast.error((error as Error).message || "An unknown error occurred while updating asset")
    }
    setLoadingEdit(false)
  }

  async function handleDeleteAsset(assetId: string) {
    try {
      const response: DefaultResponse = await deleteAsset(assetId)
      if (response.success !== undefined) {
        toast.success("Asset deleted successfully")
        handleGetPublishedAssets()
        closeModal()
      } else {
        throw new Error(response.error?.message || "An unknown error occurred while updating asset")
      }
    } catch (error) {
      toast.error((error as Error).message || "An unknown error occurred while updating asset")
    }
  }

  function handleEdit(asset: Asset) {
    openModal(
      <EditAsset
        name={asset.name}
        description={asset.description}
        tags={asset.tags}
        price={asset.price}
        loading={loadingEdit}
        confirmEdit={(_name, _description, _tags, _price) =>
          handleEditAsset(asset.id, _name, _description, _tags, _price)
        }
      />
    )
  }

  function handleDelete(assetId: string) {
    openModal(
      <div className="space-y-4 rounded-md border border-primary bg-primary p-4">
        <h2 className="text-lg font-medium">Delete Asset</h2>
        <p>Are you sure you want to delete this asset?</p>
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

  useEffect(() => {
    handleGetPublishedAssets()
  }, [])

  useEffect(() => {
    if (isOpen === false) {
      setDropdownIndex(null)
    }
  }, [isOpen])

  return (
    <div className="space-y-6">
      <div className="lg:w-1/ mb-6 flex w-full items-center gap-4">
        <h2 className="text-lg font-medium lg:text-xl">Published Assets</h2>
      </div>

      {error && !loading && <p className="text-red-500">Error: {error as string}</p>}
      {!loading && !error && assets.length === 0 && (
        <p className="text-secondary">No assets found</p>
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
                  <p className="text-sm">{asset.price} VC</p>
                </div>

                <button
                  onClick={() => toggleDropdown(index)}
                  className="relative flex h-fit min-h-10 items-center justify-center"
                >
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>

              {/* Dropdown Menu */}
              {dropdownIndex === index && (
                <div className="absolute inset-0 flex h-full w-full flex-col rounded-md bg-secondary p-2 text-sm">
                  <ul className="size-full">
                    <li>
                      <button
                        onClick={() => handleEdit(asset)}
                        className="flex w-full cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-tertiary"
                      >
                        <FaEdit />
                        Edit
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
