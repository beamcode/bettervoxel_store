"use client"

import { ChangeEvent, useEffect, useState, KeyboardEvent, useRef } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { FaImages } from "react-icons/fa"
import { FaFileArrowUp } from "react-icons/fa6"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FaRegEdit } from "react-icons/fa"
import { MdPlaylistRemove } from "react-icons/md"
import { MdOutlineFileDownload } from "react-icons/md"

interface Listing {
  id: number
  name: string
  category: string
}

type FileWithPreview = {
  id: string
  file: File
  preview: string
}

function ImageUpload() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [message, setMessage] = useState<string>("")

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage("")
    const selectedFiles = e.target.files
    if (selectedFiles) {
      const validFiles: FileWithPreview[] = []
      const validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/webp"]
      let hasInvalidFiles = false

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        const fileType = file.type
        if (validImageTypes.includes(fileType)) {
          const preview = URL.createObjectURL(file)
          const id = `${file.name}-${Date.now()}-${Math.random()}`
          validFiles.push({ id, file, preview })
        } else {
          hasInvalidFiles = true
        }
      }

      if (hasInvalidFiles) {
        setMessage("Only images are accepted")
      }

      if (validFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...validFiles])
      }
    }
  }

  function removeImage(id: string) {
    setFiles((prevFiles) =>
      prevFiles.filter((fileWithPreview) => {
        if (fileWithPreview.id !== id) {
          return true
        } else {
          // Revoke the object URL to avoid memory leaks
          URL.revokeObjectURL(fileWithPreview.preview)
          return false
        }
      })
    )
  }

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach((fileWithPreview) => {
        URL.revokeObjectURL(fileWithPreview.preview)
      })
    }
  }, [files])

  return (
    <div className="w-full space-y-4 rounded-md bg-secondary p-4 sm:w-1/2">
      <div className="flex w-full items-center justify-center">
        <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-zinc-400 transition-colors hover:bg-tertiary">
          <FaImages size={24} />
          <p className="pt-1 text-sm text-gray-400">Select a photo</p>
          {message && <p className="text-xs text-red-600">{message}</p>}
          <input type="file" onChange={handleFile} className="hidden" multiple />
        </label>
      </div>

      {files.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {files.map((fileWithPreview) => (
            <div
              key={fileWithPreview.id}
              className="group relative aspect-square overflow-hidden rounded-md"
            >
              <img
                className="h-full w-full object-cover"
                src={fileWithPreview.preview}
                alt={fileWithPreview.file.name}
                loading="lazy"
              />
              <button
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => removeImage(fileWithPreview.id)}
              >
                <FaRegTrashAlt className="fill-red-600" size={24} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 pb-8 text-center text-sm">
          <p>You must upload at least 3 images</p>
        </div>
      )}
    </div>
  )
}

function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState<string>("")

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    setMessage("")
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validExtensions = ["zip", "rar"]
      const extension = selectedFile.name.split(".").pop()?.toLowerCase()
      if (extension && validExtensions.includes(extension)) {
        setFile(selectedFile)
      } else {
        setMessage("Only .zip or .rar files are accepted")
      }
    }
  }

  function removeFile() {
    setFile(null)
  }

  return (
    <div className="w-full space-y-4 rounded-md bg-secondary p-4 sm:w-1/2">
      <div className="flex w-full items-center justify-center">
        <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-zinc-400 transition-colors hover:bg-tertiary">
          <FaFileArrowUp size={24} />
          <p className="pt-1 text-sm text-gray-400">Select a .zip or .rar file</p>
          {message && <p className="text-xs text-red-600">{message}</p>}
          <input type="file" onChange={handleFile} className="hidden" accept=".zip,.rar" />
        </label>
      </div>

      {file ? (
        <div className="mt-4 flex flex-col items-center">
          <p className="text-sm">{file.name}</p>
          <button
            className="mt-2 rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
            onClick={removeFile}
          >
            Remove file
          </button>
        </div>
      ) : (
        <div className="p-10 pb-8 text-center text-sm">
          <p>Please upload a .zip or .rar file</p>
        </div>
      )}
    </div>
  )
}

export default function PublishAsset() {
  const [selectedOption, setSelectedOption] = useState<string>("1")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState<string>("")

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value)
  }

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value)
  }

  const handleTagKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("") // Clear the input after adding
      e.preventDefault() // Prevent form submission
    }
  }

  const handleTagRemove = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = () => {
    if (selectedOption === "1") {
      console.log("Creating a new Asset listing")
    } else if (selectedOption === "2") {
      console.log("Creating a new Game listing")
    }
    console.log("Tags:", tags)
  }

  return (
    <div className="space-y-8 rounded-md border border-primary bg-primary p-6">
      <h2 className="text-lg font-medium lg:text-xl">Create a new listing</h2>

      <div className="flex w-full flex-col gap-4">
        {/* <div className="size-52 h-52 w-full rounded-md bg-secondary sm:aspect-square sm:size-52" /> */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <ImageUpload />
          <FileUpload />
        </div>

        <div className="w-full space-y-4">
          <div className="grid grid-cols-2 gap-1 rounded-md bg-secondary p-1">
            <div>
              <input
                type="radio"
                name="option"
                id="1"
                value="1"
                className="peer hidden"
                checked={selectedOption === "1"}
                onChange={handleOptionChange}
              />
              <label
                htmlFor="1"
                className="block cursor-pointer select-none rounded-md p-1 text-center peer-checked:bg-blue-500 peer-checked:text-white"
              >
                Asset
              </label>
            </div>

            <div>
              <input
                type="radio"
                name="option"
                id="2"
                value="2"
                className="peer hidden"
                checked={selectedOption === "2"}
                onChange={handleOptionChange}
              />
              <label
                htmlFor="2"
                className="block cursor-pointer select-none rounded-md p-1 text-center peer-checked:bg-blue-500 peer-checked:text-white"
              >
                Game
              </label>
            </div>
          </div>

          <div className="grow">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
              placeholder="Title"
            />
          </div>

          <div className="grow">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              className="block h-32 w-full resize-none rounded-md bg-secondary p-2.5 text-sm outline-none"
              placeholder="Description"
            />
          </div>

          {/* Tag Input Section */}
          <div className="grow">
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
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-sm font-medium text-white"
                >
                  {tag}
                  <button className="ml-2 text-white" onClick={() => handleTagRemove(tag)}>
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 w-full rounded-md bg-blue-500 p-2 text-white"
          >
            Create Listing
          </button>
        </div>
      </div>
    </div>
  )
}
