import fs from "fs/promises"
import matter from "gray-matter"
import path from "path"

export type Post = {
  slug: string
  date: string
  authorImage: string
  thumbnail: string
  title: string
  description: string
  body: string
  tags: string[]
  author: {
    name: string
    image: string
  }
}

export async function getSlugs(): Promise<string[]> {
  const postsFolder = "./content/blog/"
  const files = await fs.readdir(postsFolder)

  return files
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => file.replace(/\.mdx$/, ""))
}

export async function getPosts(): Promise<Post[]> {
  const postsFolder = "./content/blog/"
  const files = await fs.readdir(postsFolder)

  return Promise.all(
    files
      .filter((file) => path.extname(file) === ".mdx")
      .map(async (file) => {
        const filePath = path.join(postsFolder, file)
        const fileContent = await fs.readFile(filePath, "utf8")
        const { data, content } = matter(fileContent)
        const slug = file.replace(/\.mdx$/, "")

        return { slug, ...data, body: content } as Post
      })
  )
}

export async function getPostsAvailableTags(): Promise<string[]> {
  const posts = await getPosts()

  // Extract tags from each post, split by comma, trim whitespace, and convert to lowercase
  const tags = posts
    .flatMap((post) => post.tags.map((tag) => tag.trim().toLowerCase()))
    // Remove duplicates
    .filter((tag, index, array) => array.indexOf(tag) === index)

  return tags
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getPosts()
  return posts.find((post) => post.slug === slug)
}

// old code for getting posts by tag on build time
//
// export async function getPostsByTag(tag: string): Promise<Post[]> {
//   const posts = await getPosts()
//   return posts.filter((post) => {
//     // Split the tags string into an array of individual tags
//     const tagsArray = post.tags.map((tag) => tag.trim().toLowerCase())
//     // Check if the specified tag is included in the tags array
//     return tagsArray.includes(tag.toLowerCase())
//   })
// }
