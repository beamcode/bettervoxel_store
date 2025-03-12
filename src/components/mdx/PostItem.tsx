import Link from "next/link"
import { formatDate } from "@/utils/formatDate"
import { Post } from "@/utils/getPosts"
import Tags from "./Tags"
import Image from "next/image"

export default function PostItem({ post }: { post: Post }) {
  const path = "/blog"

  return (
    <Link href={`${path}/${post.slug}`}>
      <article className="group flex h-full cursor-pointer flex-col gap-2 rounded-md transition-colors">
        <div
          className="relative aspect-video overflow-hidden rounded-md border border-primary bg-primary bg-cover bg-center"
          style={{ backgroundImage: `url(${post.thumbnail})` }}
        >
          <div className="absolute inset-0 bg-black opacity-10 transition-opacity group-hover:opacity-0"></div>
        </div>

        <div className="flex grow flex-col justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-bold">{post.title}</h1>
            <p className="text-tertiary">{post.description}</p>
          </div>

          <div className="space-y-4">
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Tags tags={post.tags} clickable={false} />
            </div>

            <div className="flex w-full items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5">
                <Image
                  src={post.author?.image || "/images/default-profile.jpg"}
                  alt={post.author?.name || "Author"}
                  width={22}
                  height={22}
                  className="rounded-full bg-primary"
                />
                <span className="text-sm text-tertiary">{post.author?.name || "Author"}</span>
              </div>

              <p className="tracking-loose text-sm text-tertiary">{formatDate(post.date)}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
