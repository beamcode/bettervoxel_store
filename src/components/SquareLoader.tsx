import React from "react"

export default function SquareLoader({ size = 0 }: { size?: number }) {
  return (
    <div
      className="relative block animate-loader border-[3px] border-white"
      style={{ width: `${size}rem`, height: `${size}rem` }}
    >
      <div className="absolute h-full w-full animate-loader-inner bg-white" />
    </div>
  )
}
