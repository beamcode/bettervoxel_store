// FILE: SessionContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { login as loginApi, logout as logoutApi, getAccountData } from "@/api/apiCalls"
import { setSessionExpiredHandler, clearSessionExpiredHandler } from "@/api/fetchApi"
import { AccountInfoResponse, DefaultResponse, LoginResponse } from "@/types/api.types"
import { toast } from "react-toastify"
import type { Account } from "@/types/objects.types"
import { removeToken, setToken, getToken } from "@/utils/tokenUtils"

interface SessionContextType {
  user: Account | null
  isAuthenticated: boolean
  loading: boolean
  login: (username_or_email: string, password: string) => Promise<Account | null>
  logout: () => Promise<void>
  refetchUser: () => Promise<Account | null>
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Account | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  // Auto-fetch user data on page load
  async function initializeSession(): Promise<Account | null> {
    const token = getToken()
    if (!token) {
      setUser(null)
      setIsAuthenticated(false)
      setLoading(false)
      return null
    }

    try {
      setLoading(true)
      const response: AccountInfoResponse = await getAccountData()
      if (response.success != undefined) {
        const fetchedUser = response.success as Account
        setUser(fetchedUser)
        setIsAuthenticated(true)
        return fetchedUser // <---- Return user
      } else {
        throw new Error(response.error?.message || "Failed to fetch user data")
      }
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function login(username_or_email: string, password: string): Promise<Account | null> {
    try {
      setLoading(true)
      const response: LoginResponse = await loginApi(username_or_email, password)
      if (response.success != undefined) {
        setToken(response.success.token)
        // When done, return the updated user
        const newUser = await initializeSession()
        return newUser
      } else {
        throw new Error(response.error?.message || "Login failed.")
      }
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function logout(): Promise<void> {
    try {
      setLoading(true)
      const resp: DefaultResponse = await logoutApi()
      if (resp.success !== undefined) {
        removeToken()
        setUser(null)
        setIsAuthenticated(false)
        router.push("/login")
      } else {
        throw new Error(resp.error?.message || "Logout failed.")
      }
    } catch (error) {
      console.log(error)
      toast.error(error instanceof Error ? error.message : "Logout error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initialize session on mount
    initializeSession()
    /**
     * Register the logout handler for fetchApi on mount.
     * Clean up on unmount to avoid stale references.
     */
    setSessionExpiredHandler(logout)
    return () => clearSessionExpiredHandler()
  }, [])

  const value: SessionContextType = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    refetchUser: initializeSession,
  }

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
