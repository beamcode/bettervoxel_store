"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Input from "@/components/auth/Input"
import RevealPasswordButton from "@/components/auth/RevealPasswordButton"
import Image from "next/image"
import { useSession } from "@/context/SessionContext"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Login() {
  const router = useRouter()
  const { user, login, loading, refetchUser } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading1, setLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)
    setLoginError(null)

    try {
      // Get the user directly
      const loggedInUser = await login(email, password)
      if (!loggedInUser) {
        throw new Error("User is null after login.")
      }
      router.push(`/users/${loggedInUser._id}/profile`)
    } catch (error) {
      console.log(error)
      setLoginError((error as Error).message || "Login failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full w-full rounded-md border border-primary bg-primary p-4 sm:max-w-[514px]">
      <div className="relative mb-10 flex w-full flex-col items-center gap-6 overflow-hidden rounded-md font-sans">
        <Image
          src="/images/cool.jpg"
          alt="BetterVoxel Logo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-52 w-full rounded-md object-cover blur-[1px]"
        />

        <div className="absolute inset-0 flex size-full cursor-pointer items-center justify-center bg-white/20 transition-transform duration-500 hover:scale-110 dark:bg-black/60">
          <h1 className="text-2xl font-medium text-white">Login to BetterVoxel</h1>
        </div>
      </div>

      <form onSubmit={handleLogin} noValidate className="space-y-4">
        <Input
          type="text"
          id="username-or-email"
          value={email}
          onChange={setEmail}
          placeholder="Username or Email"
          required
        />

        <div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={setPassword}
              placeholder="Password"
              required
            />

            <RevealPasswordButton
              showPassword={showPassword}
              setShowPassword={() => {
                setShowPassword((prev) => !prev)
              }}
            />
          </div>
          <div className="flex w-full justify-end">
            <Link
              href="/forgot-password"
              className="mt-2 flex w-fit justify-end py-1 text-[13px] font-medium text-tertiary transition-colors hover:text-primary"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {loginError && <p className="text-sm text-red-600">{loginError}</p>}

        <button
          type="submit"
          className={`flex w-full justify-center rounded-md bg-orange-600 p-2 text-white ${
            email && password ? "opacity-100 hover:bg-orange-700" : "opacity-30"
          }`}
          disabled={!email || !password || loading1}
        >
          {loading1 ? <AiOutlineLoading3Quarters size={24} className="animate-spin" /> : "Login"}
        </button>
      </form>

      <Link href="/signup" className="mt-4 block text-center decoration-orange-500 hover:underline">
        Sign up
      </Link>
    </div>
  )
}
