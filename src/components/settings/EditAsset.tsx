"use client"

import { ChangeEvent, KeyboardEvent, use, useState } from "react"
import PriceInput from "../PriceInput"
import SquareLoader from "../SquareLoader"

export default function EditAsset({
  name,
  description,
  tags,
  price,
  loading,
  confirmEdit,
}: {
  name: string
  description: string
  tags: string[]
  price: number
  loading: boolean
  confirmEdit: (_name: string, _description: string, _tags: string[], _price: number | null) => void
}) {
  const [_tags, setTags] = useState<string[]>(tags || [])
  const [_name, setName] = useState<string>(name)
  const [_description, setDescription] = useState<string>(description)
  const [_price, setPrice] = useState<number | null>(price || null)
  const [tagInput, setTagInput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value)
  }

  const handleTagKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      if (!_tags.includes(tagInput.trim())) {
        setTags([..._tags, tagInput.trim()])
      }
      setTagInput("") // Clear the input after adding
      e.preventDefault() // Prevent form submission
    }
  }

  const handleTagRemove = (tag: string) => {
    setTags(_tags.filter((t) => t !== tag))
  }

  function handleConfirm() {
    if (_name.trim() === "") {
      setError("Name cannot be empty")
      return
    }
    if (_price === null) {
      setError("Price cannot be empty please enter a price or 0 for free")
      return
    }
    setError(null)
    confirmEdit(_name, _description, _tags, _price)
  }

  return (
    <div className="space-y-8 rounded-md border border-primary bg-primary p-6 md:min-w-[600px]">
      <div className="flex w-full flex-col gap-4">
        <div className="grow space-y-1">
          <label htmlFor="title" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="title"
            value={_name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
            placeholder="Title"
          />
        </div>

        <div className="grow space-y-1">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={_description}
            onChange={(e) => setDescription(e.target.value)}
            className="block h-32 w-full resize-none rounded-md bg-secondary p-2.5 text-sm outline-none"
            placeholder="Description"
          />
        </div>

        <div className="grow space-y-1">
          <label htmlFor="tags" className="block text-sm font-medium">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
            placeholder="Add a tag and press Enter"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyPress}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {_tags.map((tag, index) => (
              <button
                onClick={() => handleTagRemove(tag)}
                key={index}
                className="inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-sm font-medium text-white"
              >
                {tag + " "} &times;
              </button>
            ))}
          </div>
        </div>

        <div className="grow space-y-1">
          <label htmlFor="tags" className="block text-sm font-medium">
            Price
          </label>
          <PriceInput
            value={_price}
            setValue={setPrice}
            className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          className="mt-2 flex w-full items-center justify-center rounded-md bg-orange-500 p-2 text-white"
          onClick={handleConfirm}
        >
          {loading ? <SquareLoader size={1.5} /> : "Edit"}
        </button>
      </div>
    </div>
  )
}
