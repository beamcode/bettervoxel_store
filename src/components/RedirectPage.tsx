"use client"

import { useEffect, useState, useMemo } from "react"
import { redirect } from "next/navigation"
import { Docs } from "@/utils/getDocs"

const path = "/docs/"
export default function RedirectPage({ docs }: { docs: Docs[] }) {
  const [noDocsFound, setNoDocsFound] = useState(false)

  // Memoize the findSlug function to avoid redundant computations
  const findSlug = useMemo(() => {
    function findSlugRecursive(docs: Docs[]): string | undefined {
      for (const doc of docs) {
        if (doc.slug) {
          return doc.slug
        }
        if (doc.children && doc.children.length > 0) {
          const childSlug = findSlugRecursive(doc.children)
          if (childSlug) {
            return childSlug
          }
        }
      }
      return undefined
    }
    return findSlugRecursive
  }, [])

  useEffect(() => {
    const slug = findSlug(docs)

    if (slug) {
      redirect(path + slug)
    } else {
      setNoDocsFound(true)
    }
  }, [docs, findSlug])

  return (
    <div className="flex items-center justify-center gap-5">
      {noDocsFound ? (
        <h1 className="text-xl">No docs found</h1>
      ) : (
        <>
          <div className="size-8 rounded-full border-4 border-blue-400 border-t-transparent" />
          <h1 className="text-xl">Redirecting...</h1>
        </>
      )}
    </div>
  )
}
