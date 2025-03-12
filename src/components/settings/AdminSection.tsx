"use client"

import { FaPlus, FaSpinner, FaTrash } from "react-icons/fa"
import { useState, useEffect } from "react"
import { getUsersList, deleteUser, getAdminsList, revokeAdmin, grantAdmin } from "@/api/apiCalls"
import { Account } from "@/types/objects.types"
import { useSession } from "@/context/SessionContext"
import { IoIosArrowForward } from "react-icons/io"
import { FaRegUser } from "react-icons/fa"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useModal } from "@/context/ModalContext"

import { toast } from "react-toastify"
import React, { useRef } from "react"

interface AccordionProps {
  question: string
  answer: string
}

const Accordion = ({ question, answer }: AccordionProps) => {
  const [selected, setSelected] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const toggleAccordion = () => {
    setSelected(!selected)
  }

  return (
    <div className="relative border-b border-gray-200">
      <button type="button" className="w-full px-6 py-6 text-left" onClick={toggleAccordion}>
        <div className="flex items-center justify-between">
          <span>{question}</span>
          <svg
            className={`h-5 w-5 text-gray-500 transition-transform ${
              selected ? "rotate-180 transform" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </button>
      <div
        className="relative overflow-hidden transition-all duration-700"
        style={{
          maxHeight: selected ? `${contentRef.current?.scrollHeight}px` : "0",
        }}
        ref={contentRef}
      >
        <div className="px-6 pb-6">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

const FAQ = () => {
  const faqs = [
    {
      question: "Is there a refund policy?",
      answer:
        "DreamSeat Enterprise Xperience Partners shall issue a full refund to any member who wishes to cancel their enrolment within 45 days prior to the start of the season. Stadium seat memberships are not refundable after the first home event of the football season. If a patron's seat is damaged or removed, DreamSeat EXP shall replace the item at no cost to the customer. Please contact the customer service hotline (864-626-9676) with any questions regarding the return policy. All sales are final. Refunds and adjustments will be considered on an individual basis.",
    },
  ]

  return (
    <div className="flex h-screen w-screen justify-center bg-gray-100 pt-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <Accordion key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  )
}

function AdminsManager() {
  const [users, setUsers] = useState<Account[]>([])
  const { isAuthenticated } = useSession()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchAdminData() {
    try {
      const response = await getAdminsList()
      if (response.success !== undefined) {
        setUsers(response.success)
      } else {
        throw new Error(
          response.error?.message || "An error occurred while fetching admin accounts"
        )
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "An error occurred while fetching admin accounts")
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleGrantAdmin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const email = (event.currentTarget["user-email"] as HTMLInputElement).value

    try {
      const response = await grantAdmin(email)
      if (response.success != undefined) {
        fetchAdminData()
      } else {
        throw new Error(
          response.error?.message || "An error occurred while granting admin privileges"
        )
      }
    } catch (error) {
      toast.error((error as Error).message || "An error occurred while granting admin privileges")
    }
  }

  async function handleRevokeAdmin(email: string) {
    try {
      const response = await revokeAdmin(email)
      if (response.success != undefined) {
        fetchAdminData()
      } else {
        throw new Error(
          response.error?.message || "An error occurred while revoking admin privileges"
        )
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred while revoking admin privileges")
      } else {
        setError("An error occurred while revoking admin privileges")
      }
    }
  }

  function GrantAdminField() {
    return (
      <form onSubmit={handleGrantAdmin} className="flex items-center space-y-4" id="add-admin-form">
        <div className="relative w-full">
          <label className="mb-1 text-sm font-medium leading-none" htmlFor="current-password">
            User email
          </label>
          <div className="flex w-full gap-2">
            <input
              className="spacing block w-full rounded-md bg-secondary p-2.5 text-sm outline-none"
              autoComplete="off"
              required
              placeholder="Enter a user email"
              minLength={8}
              maxLength={100}
              type="email"
              name="user-email"
              id="user-email"
            />
            <button
              className="inline-flex items-center justify-center gap-2 self-stretch whitespace-nowrap rounded-md bg-red-500 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
              type="submit"
            >
              <FaPlus />
              Add user
            </button>
          </div>
        </div>
      </form>
    )
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData()
    }
  }, [])

  return (
    <div className="space-y-6 rounded-md border border-primary bg-primary p-6">
      {loading ? (
        <AiOutlineLoading3Quarters size={24} className="animate-spin" />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h3 className="font-semibold leading-none tracking-tight">Admin users</h3>

          <div className="space-y-4">
            <GrantAdminField />
            {users?.length === 0 ? (
              <div className="w-full pt-5 text-sm text-secondary">No admins.</div>
            ) : (
              <table className="min-w-full overflow-hidden">
                <thead>
                  <tr>
                    <th className="py-3 text-left text-sm font-semibold">Username</th>
                    <th className="py-3 text-left text-sm font-semibold">Email</th>
                    <th className="py-3 text-right text-sm font-semibold">Remove</th>
                  </tr>
                </thead>
                <tbody className="border-secondary-bg overflow-hidden rounded-md border-t-2">
                  {users.map((user) => (
                    <tr key={user.email} className="">
                      <td className="py-2 text-sm font-medium">{user.username}</td>
                      <td className="py-2 text-sm">{user.email}</td>
                      <td className="py-2 text-right">
                        <button
                          className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-white transition-colors hover:bg-red-600"
                          onClick={() => handleRevokeAdmin(user.email)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function UserManager() {
  const [users, setUsers] = useState<Account[]>([])
  const { isAuthenticated } = useSession()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openUserId, setOpenUserId] = useState<string | null>(null)
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const { openModal } = useModal()

  async function handleGetUsersList() {
    if (!isAuthenticated) {
      return
    }
    try {
      const response = await getUsersList()
      if (response.success !== undefined) {
        setUsers(response.success as Account[])
      } else {
        throw new Error(response.error?.message || "An error occurred while fetching the user list")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteUser(id: string) {
    if (!isAuthenticated) {
      return
    }
    try {
      const response = await deleteUser(id)
      if (response.success !== undefined) {
        toast.success("User deleted successfully")
        handleGetUsersList()
      } else {
        throw new Error(response.error?.message || "An error occurred while deleting the user")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  function deleteUserPrompt(id: string) {
    openModal(
      <div className="p-4">
        <h2 className="text-xl font-bold">Confirm Delete</h2>
        <p>Are you sure you want to delete this project?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => handleDeleteUser(id)}
            className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (isAuthenticated) {
      handleGetUsersList()
    }
  }, [isAuthenticated])

  const toggleDropdown = (id: string) => {
    setOpenUserId(openUserId === id ? null : id)
  }

  return (
    <div className="rounded-md border border-primary bg-primary p-6">
      {error ? (
        <p className="text-sm">Error: {error}</p>
      ) : loading ? (
        <AiOutlineLoading3Quarters size={24} className="animate-spin" />
      ) : (
        <div className="space-y-6">
          <h3 className="font-semibold leading-none tracking-tight">Users</h3>
          {users.length === 0 ? (
            <div className="w-full pt-5 text-sm text-secondary">No users found.</div>
          ) : (
            <>
              <div className="space-y-4">
                {/* Desktop View */}
                <table className="hidden min-w-full sm:table">
                  <thead>
                    <tr>
                      <th className="py-3 text-left text-sm font-semibold">username</th>
                      <th className="py-3 text-left text-sm font-semibold">first name</th>
                      <th className="py-3 text-left text-sm font-semibold">last name</th>
                      <th className="py-3 text-left text-sm font-semibold">dob</th>
                      <th className="py-3 text-left text-sm font-semibold">email</th>
                      <th className="py-3 text-right text-sm font-semibold">remove</th>
                    </tr>
                  </thead>
                  <tbody className="border-secondary-bg rounded-md border-t-2">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="py-2 text-sm font-medium">{user.username}</td>
                        <td className="py-2 text-sm font-medium">{user.firstname}</td>
                        <td className="py-2 text-sm font-medium">{user.lastname}</td>
                        <td className="py-2 text-sm font-medium">{user.dob}</td>
                        <td className="py-2 text-sm">{user.email}</td>
                        <td className="py-2 text-right">
                          <button
                            className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-white transition-colors hover:bg-red-600"
                            onClick={() => deleteUserPrompt(user._id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile View */}
                <div className="space-y-4 sm:hidden">
                  {users.map((user) => (
                    <div key={user._id} className="w-full rounded-md bg-secondary">
                      <div
                        className="flex cursor-pointer items-center justify-between p-2"
                        onClick={() => toggleDropdown(user._id)}
                      >
                        <div className="flex items-center space-x-4">
                          <FaRegUser size={20} />
                          <p className="text-sm font-medium text-primary">{user.username}</p>
                        </div>
                        <IoIosArrowForward
                          size={24}
                          className={`transition-transform duration-300 ${
                            openUserId === user._id ? "rotate-90 transform" : ""
                          }`}
                        />
                      </div>

                      <div
                        ref={(el) => {
                          contentRefs.current[user._id] = el
                        }}
                        style={{
                          height:
                            openUserId === user._id
                              ? contentRefs.current[user._id]?.scrollHeight
                              : 0,
                        }}
                        className={`transition-height overflow-hidden duration-300 ease-in-out`}
                      >
                        <div className="p-4">
                          <div className="flex flex-col space-y-2">
                            <div className="flex justify-between">
                              <span className="font-semibold">first name:</span>
                              <span>{user.firstname}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold">last name:</span>
                              <span>{user.lastname}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold">email:</span>
                              <span>{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold">dob:</span>
                              <span>{user.dob}</span>
                            </div>
                          </div>
                          <button
                            className="mt-4 inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-white transition-colors hover:bg-red-600"
                            onClick={() => deleteUserPrompt(user._id)}
                          >
                            <FaTrash />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default function AdminSection() {
  return (
    <div className="space-y-4">
      <AdminsManager />
      <UserManager />
    </div>
  )
}
