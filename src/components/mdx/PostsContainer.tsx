import { Post } from "@/utils/getPosts"
import PostItem from "./PostItem"

export default function PostsContainer({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 md:gap-10 lg:grid-cols-3 xl:grid-cols-4">
      {posts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
    </div>
  )
}
