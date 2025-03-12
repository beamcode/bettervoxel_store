import React from "react"

export default function TagsList(asset: { tags: string[] }) {
  return (
    <>
      {asset.tags.map((tag, index) => (
        <span key={index} className="rounded-sm bg-secondary px-1 text-[11px]">
          {tag}
        </span>
      ))}
    </>
  )
}
