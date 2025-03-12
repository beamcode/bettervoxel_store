import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "./content/docs")

export interface Docs {
  title: string
  slug?: string
  children?: Docs[]
}

export function getDocBySlug(slug: string): { title: string; content: string } {
  const realSlug = decodeURIComponent(slug.replace(/\.mdx$/, ""))
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return { title: data.title, content }
}

function extractTitleFromContent(content: string): string {
  const lines = content.split("\n")
  for (let line of lines) {
    line = line.trim()
    if (line.startsWith("# ")) {
      return line.replace(/^# /, "").trim()
    }
  }
  return ""
}

function buildDocTree(files: string[]): Docs[] {
  const tree: Docs[] = []

  files.forEach((file) => {
    const segments = file.split(path.sep)
    let currentLevel = tree

    segments.forEach((segment, index) => {
      const isFile = index === segments.length - 1 && segment.endsWith(".mdx")
      const realSlug = segment.replace(/\.mdx$/, "")
      let existing = currentLevel.find((doc) => doc.title === realSlug)

      if (!existing) {
        let title = realSlug
        if (isFile) {
          const filePath = path.join(contentDirectory, segments.join(path.sep))
          const fileContents = fs.readFileSync(filePath, "utf8")
          const { content } = matter(fileContents)
          const extractedTitle = extractTitleFromContent(content)
          title = extractedTitle || title
        }

        const newDoc: Docs = { title }
        if (isFile) {
          newDoc.slug = segments.join("/").replace(/\.mdx$/, "")
        } else {
          newDoc.children = []
        }
        currentLevel.push(newDoc)
        currentLevel = newDoc.children || []
      } else if (!isFile) {
        currentLevel = existing.children || (existing.children = [])
      }
    })
  })

  return tree
}

export async function getAllDocs(): Promise<Docs[]> {
  const walkSync = (dir: string, filelist: string[] = []): string[] => {
    fs.readdirSync(dir).forEach((file) => {
      const dirFile = path.join(dir, file)
      if (fs.statSync(dirFile).isDirectory()) {
        if (fs.readdirSync(dirFile).length === 0) {
          filelist.push(path.relative(contentDirectory, dirFile))
        } else {
          filelist = walkSync(dirFile, filelist)
        }
      } else if (path.extname(dirFile) === ".mdx") {
        filelist.push(path.relative(contentDirectory, dirFile))
      }
    })
    return filelist
  }

  const files = walkSync(contentDirectory)
  const docTree = buildDocTree(files)

  return docTree
}
