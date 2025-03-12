import { useState, useEffect } from "react"
import Image, { StaticImageData } from "next/image"
import fallbackImage from "@/public/desert.png"

export default function ImageWithFallback({
  fallback = fallbackImage,
  alt = "image",
  src,
  ...props
}: {
  fallback?: StaticImageData
  alt?: string
  src: string
}): React.JSX.Element {
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
  }, [src])

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setError(null)
  }

  return <Image alt={alt} onError={handleImageError} src={error ? fallback : src} {...props} />
}
