"use client"

import React, { useState, useEffect, use } from "react"
import { updateAccount } from "@/api/apiCalls"
import { toast } from "react-toastify"
import { useSession } from "@/context/SessionContext"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { MdError } from "react-icons/md"
import { DefaultResponse } from "@/types/api.types"

function AccountDetails() {
  const { user, loading, refetchUser } = useSession()
  const [loading1, setLoading1] = useState(false)

  async function handleUpdateAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading1(true)

    const formData = new FormData(event.currentTarget)
    const updatedFirstname = formData.get("firstname") as string
    const updatedLastname = formData.get("lastname") as string
    const updatedUsername = formData.get("username") as string
    const updatedDateOfBirth = formData.get("dob") as string

    try {
      const response: DefaultResponse = await updateAccount({
        firstname: updatedFirstname,
        lastname: updatedLastname,
        username: updatedUsername,
        dob: updatedDateOfBirth,
      })

      if (response.success !== undefined) {
        toast("Account updated successfully", { type: "success" })
        refetchUser()
      } else {
        throw new Error(
          response.error?.message || "An unknown error occurred while updating your account."
        )
      }
    } catch (error) {
      toast.error(
        (error as Error).message || "An unknown error occurred while updating your account."
      )
    } finally {
      setLoading1(false)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold leading-none">Account Info</h3>

      {!user && !loading && !loading1 ? (
        <div className="flex items-center gap-2">
          <MdError size={22} className="fill-red-600" />
          <p className="text-sm text-red-500">Unable to load account details</p>
        </div>
      ) : (
        user && (
          <form onSubmit={handleUpdateAccount} className="space-y-4">
            <div className="mb-4 space-y-4">
              <div>
                <label htmlFor="lastname" className="mb-1 block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  defaultValue={user.lastname}
                  className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
                  placeholder="Last Name"
                />
              </div>

              <div>
                <label htmlFor="firstname" className="mb-1 block text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  defaultValue={user.firstname}
                  className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
                  placeholder="First Name"
                  disabled={loading || loading1}
                />
              </div>

              <div>
                <label htmlFor="username" className="mb-1 block text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  defaultValue={user.username}
                  className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
                  placeholder="Username"
                  disabled={loading || loading1}
                />
              </div>

              <div>
                <label htmlFor="dob" className="mb-1 block text-sm font-medium">
                  Date of birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  className="block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
                  defaultValue={user.dob}
                  disabled={loading || loading1}
                />
              </div>
            </div>

            <button
              className="focus-visible:ring-ring inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none"
              type="submit"
              disabled={loading || loading1}
            >
              {loading1 ? (
                <AiOutlineLoading3Quarters size={20} className="animate-spin" />
              ) : (
                <span className="flex items-center">Update</span>
              )}
            </button>
          </form>
        )
      )}
    </div>
  )
}

export default function AccountSection() {
  return (
    <div className="space-y-6">
      <AccountDetails />
    </div>
  )
}
