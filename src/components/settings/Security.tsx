"use client"

import React, { useState } from "react"
import { toast } from "react-toastify"
import RevealPasswordButton from "../auth/RevealPasswordButton"
import { updateAccount, deleteAccount } from "@/api/apiCalls"
import { useSession } from "@/context/SessionContext"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useRouter } from "next/navigation"

function AccountDeletion() {
  const [isLoading, setLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  function validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{6,}$/ // At least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
    return passwordRegex.test(password)
  }

  async function handleDeleteAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const password = (event.currentTarget.elements.namedItem("password") as HTMLInputElement)?.value

    if (!password) {
      setError("Please provide a password.")
      return
    } else if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
      return
    }

    setLoading(true)
    try {
      const response = await deleteAccount(password)

      if (response.success !== undefined) {
        toast.success("Account successfully deleted.")
        router.push("/login")
      } else {
        throw new Error(
          response.error?.message || "An unknown error occurred while deleting your account."
        )
      }
    } catch (error) {
      toast.error(
        (error as Error).message || "An unknown error occurred while deleting your account."
      )
    } finally {
      setLoading(false)
      setError("")
    }
  }

  return (
    <div className="space-y-6 rounded-md">
      <h2 className="text-xl font-bold leading-none">Delete Account</h2>

      <div className="space-y-4">
        <p className="mb-4 text-sm text-red-600">
          Account deletion is non-reversible. Please proceed with caution.
        </p>
        <form onSubmit={handleDeleteAccount} className="space-y-4">
          <div className="relative">
            <label className="mb-1 text-sm font-medium leading-none" htmlFor="delete-password">
              Confirm Password
            </label>
            <input
              className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
              id="delete-password"
              required
              minLength={6}
              maxLength={100}
              type={showPasswords ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
            />
            <RevealPasswordButton
              showPassword={showPasswords}
              setShowPassword={() => setShowPasswords((prev) => !prev)}
              className="absolute right-2 top-[2rem]"
            />
            <p className="mt-1 text-xs text-red-600">{error}</p>
          </div>
          <button
            className="focus-visible:ring-ring inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            type="submit"
            disabled={isLoading} // Disable the button while deleting
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters size={20} className="animate-spin" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash2 mr-2 h-4 w-4"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" x2="10" y1="11" y2="17"></line>
                  <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
                Delete Account
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

function UpdatePassword() {
  const [showPasswords, setShowPasswords] = useState(false)

  async function handleUpdatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/
    const form = event.currentTarget
    const password = (event.currentTarget.elements.namedItem("currentPassword") as HTMLInputElement)
      ?.value
    const newPassword = (event.currentTarget.elements.namedItem("newPassword") as HTMLInputElement)
      ?.value
    const confirmPassword = (
      event.currentTarget.elements.namedItem("confirmPassword") as HTMLInputElement
    )?.value

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.")
      return
    }

    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Password must be at least 6 characters long, with at least one uppercase letter, one lowercase letter, and one special character."
      )
      return
    }

    try {
      await updateAccount({
        password: password,
      })
      toast.success("Password updated successfully.")
      form.reset()
      setShowPasswords(false)
    } catch (error) {
      toast.error((error as Error).message || "An error occurred while updating your password.")
    }
  }

  return (
    <div className="space-y-6 rounded-md">
      <h2 className="text-xl font-bold leading-none">Password</h2>

      <form onSubmit={handleUpdatePassword} className="space-y-2" id="password-update-form">
        <div className="relative">
          <label className="mb-1 text-sm font-medium leading-none" htmlFor="current-password">
            Current Password
          </label>
          <input
            className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
            id="current-password"
            autoComplete="current-password"
            required
            placeholder="Enter your current password"
            minLength={8}
            maxLength={100}
            type={showPasswords ? "text" : "password"}
            name="currentPassword"
          />
          <RevealPasswordButton
            showPassword={showPasswords}
            setShowPassword={() => setShowPasswords((prev) => !prev)}
            className="absolute right-2 top-[2rem]"
          />
        </div>
        <div className="relative">
          <label className="mb-1 text-sm font-medium leading-none" htmlFor="new-password">
            New Password
          </label>
          <input
            className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
            id="new-password"
            autoComplete="new-password"
            required
            placeholder="Enter your new password"
            minLength={8}
            maxLength={100}
            type={showPasswords ? "text" : "password"}
            name="newPassword"
          />
          <RevealPasswordButton
            showPassword={showPasswords}
            setShowPassword={() => setShowPasswords((prev) => !prev)}
            className="absolute right-2 top-[2rem]"
          />
        </div>
        <div className="relative">
          <label className="mb-1 text-sm font-medium leading-none" htmlFor="confirm-password">
            Confirm New Password
          </label>
          <input
            className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
            id="confirm-password"
            autoComplete="new-password"
            required
            placeholder="Confirm your new password"
            minLength={8}
            maxLength={100}
            type={showPasswords ? "text" : "password"}
            name="confirmPassword"
          />
          <RevealPasswordButton
            showPassword={showPasswords}
            setShowPassword={() => setShowPasswords((prev) => !prev)}
            className="absolute right-2 top-[2rem]"
          />
        </div>
        <button
          className="focus-visible:ring-ring inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-lock mr-2 h-4 w-4"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Save
        </button>
      </form>
    </div>
  )
}

function UpdateEmail() {
  const { user, loading, refetchUser } = useSession()
  const [newEmail, setNewEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")

  async function handleUpdateEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const newEmailValue = (form.elements.namedItem("new-email") as HTMLInputElement)?.value
    const confirmEmailValue = (form.elements.namedItem("confirm-email") as HTMLInputElement)?.value

    if (newEmailValue !== confirmEmailValue) {
      toast.error("Emails do not match.")
      return
    }

    try {
      await updateAccount({
        email: newEmailValue,
      })
      toast.success("Email updated successfully.")
      form.reset() // Reset form fields after a successful update
      setNewEmail("")
      setConfirmEmail("")
      await refetchUser()
    } catch (error) {
      toast.error((error as Error).message || "An error occurred while updating your email.")
    }
  }

  return (
    <div className="space-y-8 rounded-md">
      {loading ? (
        <AiOutlineLoading3Quarters size={24} className="animate-spin" />
      ) : (
        <>
          <h2 className="text-xl font-bold leading-none">Email</h2>

          <div className="space-y-4">
            {user ? (
              <p>
                Email: <strong className="text-purple-500">{user.email}</strong>
              </p>
            ) : (
              <p className="text-sm text-red-600">Error fetching email.</p>
            )}

            <form onSubmit={handleUpdateEmail} className="space-y-4">
              <div>
                <label className="mb-1 text-sm font-medium leading-none" htmlFor="new-email">
                  New Email
                </label>
                <input
                  type="email"
                  name="new-email"
                  id="new-email"
                  placeholder="Enter your new email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
                />
              </div>
              <div>
                <label
                  className="mb-1 text-sm font-medium leading-none"
                  htmlFor="new-email-confirm"
                >
                  Confirm New Email
                </label>
                <input
                  type="email"
                  name="confirm-email"
                  id="new-email-confirm"
                  placeholder="Confirm Email"
                  required
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
                />
              </div>

              <button
                className="focus-visible:ring-ring inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 18.055v2.458c0 1.925-4.655 3.487-10 3.487-5.344 0-10-1.562-10-3.487v-2.458c2.418 1.738 7.005 2.256 10 2.256 3.006 0 7.588-.523 10-2.256zm-10-3.409c-3.006 0-7.588-.523-10-2.256v2.434c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.434c-2.418 1.738-7.005 2.256-10 2.256zm0-14.646c-5.344 0-10 1.562-10 3.488s4.656 3.487 10 3.487c5.345 0 10-1.562 10-3.487 0-1.926-4.655-3.488-10-3.488zm0 8.975c-3.006 0-7.588-.523-10-2.256v2.44c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.44c-2.418 1.738-7.005 2.256-10 2.256z" />
                </svg>
                Save
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default function SecuritySection() {
  return (
    <section className="space-y-6">
      <UpdateEmail />
      <UpdatePassword />
      <AccountDeletion />
    </section>
  )
}
