// FILE: fetchApi.ts
import { getToken } from "@/utils/tokenUtils"

/**
 * A global callback to handle session expiration (401 responses).
 * This is registered by the SessionProvider.
 */
let onSessionExpired: (() => void) | null = null

/**
 * Sets the callback function to run when a 401 is detected.
 * Called by SessionProvider to link the logout logic.
 */
export function setSessionExpiredHandler(fn: () => void) {
  onSessionExpired = fn
}

/**
 * Clears the session expiration handler.
 * Helps prevent stale references if the context unmounts.
 */
export function clearSessionExpiredHandler() {
  onSessionExpired = null
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface FetchApiOptions extends Omit<RequestInit, "body"> {
  auth?: boolean
  body?: any
}

export async function fetchApi<T>(
  endpoint: string,
  { auth = false, method = "GET", headers, body, credentials, ...init }: FetchApiOptions = {}
): Promise<T> {
  const finalHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
    ...headers,
  }

  // Include credentials for auth requests for future use of set-cookie
  // const finalCredentials: RequestCredentials = auth ? "include" : (credentials ?? "same-origin")

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
      // TO be implemented in the future cos it could be needed
      // credentials: finalCredentials,
      ...init,
    })

    const contentType = response.headers.get("content-type")
    const data = contentType?.includes("application/json")
      ? await response.json()
      : await response.text()

    if (!response.ok) {
      if (response.status === 401) {
        // SESSION EXPIRED autologout
        if (process.env.NODE_ENV === "production") {
          onSessionExpired?.()
        } else {
          console.warn("⚠️ 401 Unauthorized detected in development. Auto-logout skipped.")
        }
        throw new Error("Your session has expired. Please log in again.")
      }

      if (response.status === 403) {
        throw new Error("Access denied. You do not have permission for this action.")
      }

      const errorMsg =
        (data?.error?.message as string) || `Error ${response.status}: ${response.statusText}`
      throw new Error(errorMsg)
    }

    return data as T
  } catch (error) {
    throw error instanceof Error ? error : new Error("An unexpected error occurred.")
  }
}
