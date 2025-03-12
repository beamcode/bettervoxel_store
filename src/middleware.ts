// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { AccountInfoResponse } from "@/types/api.types"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value
  const { pathname } = request.nextUrl

  // Protect all /account routes
  if (pathname.startsWith("/account")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Validate token for all /account routes
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/infos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data: AccountInfoResponse = await res.json()

      if (!res.ok || !data.success) {
        return NextResponse.redirect(new URL("/login", request.url))
      }

      // Check admin role for /account/admin routes
      if (pathname.startsWith("/account/admin") && data.success.role !== "admin") {
        const previousUrl = request.headers.get("referer") || "/"
        return NextResponse.redirect(new URL(previousUrl, request.url))
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/account/:path*"], // Middleware only runs on /account routes
}
