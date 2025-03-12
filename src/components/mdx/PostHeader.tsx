import { Post } from "@/utils/getPosts"
import { formatDate } from "@/utils/formatDate"
import { timeSince } from "@/utils/timeSince"
import Tags from "./Tags"
import Image from "next/image"

export default function PostHeader({ post }: { post: Post }) {
  return (
    <div className="min-w-fit space-y-4">
      <h1 className="text-3xl font-semibold md:text-4xl">{post.title}</h1>
      <div className="flex w-full flex-col justify-between gap-1.5 md:flex-row">
        <div className="flex gap-4">
          <Image
            src={post.author?.image || "/images/default-profile.jpg"}
            alt={post.author?.name || "Author"}
            width={0}
            height={0}
            sizes="100vw"
            className="aspect-video size-8 rounded-full bg-primary"
          />

          <div className="flex items-center justify-center gap-2">
            <span className="text-tertiary">{post.author?.name || "Author"}</span>
            <span className="text-tertiary">-</span>
            <p className="tracking-loose text-tertiary">
              {formatDate(post.date)} ({timeSince(post.date)})
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          <p className="text-gray-400">Tags: </p>
          <Tags tags={post.tags} clickable />
        </div>
      </div>
    </div>
  )
}
