import Image from "next/image"
import Link from "next/link"
import { Asset } from "@/types/objects.types"
import TagsList from "./TagList"

// export default function AssetCard({ asset }: { asset: Asset }) {
export default function AssetCard({ asset }: { asset: Asset }) {
  console.log(asset)
  return (
    <Link
      href={`/marketplace/asset/${asset.id}`}
      className="w-full space-y-2 overflow-hidden rounded-md border border-primary bg-primary p-1.5"
    >
      <div className="relative h-[12rem] w-full overflow-hidden rounded-md bg-secondary">
        <Image
          src={
            asset.preview_url?.startsWith("http")
              ? asset.preview_url
              : "/images/placeholder-image.jpg"
          }
          alt={asset.name}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>
      <div className="space-y-1">
        <h5 className="text-md mb-2 tracking-tight">{asset.name}</h5>
        <div className="flex flex-wrap gap-1.5">{asset.tags && <TagsList tags={asset.tags} />}</div>
        <div className="flex items-center justify-between text-[14px]">
          <span className="">
            {asset.price == 0 ? (
              "Free"
            ) : (
              <>
                <span className="font-bold text-yellow-500">VC</span> {asset.price.toFixed(2)}
              </>
            )}
          </span>
        </div>
      </div>
    </Link>
  )
}
