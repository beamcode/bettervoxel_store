"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

import Input from "@/components/auth/Input"
import RevealPasswordButton from "@/components/auth/RevealPasswordButton"
import Select from "@/components/auth/Select"

import { signUp } from "@/api/apiCalls"
import { LoginResponse } from "@/types/api.types"

import { useSession } from "@/context/SessionContext"

export default function SignUp() {
  const router = useRouter()
  const { login } = useSession() // Get login from session
  const [loading, setLoading] = useState(false)

  // Form fields
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  // Errors
  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [dayError, setDayError] = useState("")
  const [monthError, setMonthError] = useState("")
  const [yearError, setYearError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordConfirmError, setPasswordConfirmError] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function validatePassword(password: string) {
    // At least 6 chars, upper, lower, digit, special char
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/.test(password)
  }

  function isValidDate(d: string, m: string, y: string) {
    if (!d || !m || !y) return false
    const date = new Date(Number(y), Number(m) - 1, Number(d))
    return date.getFullYear() === +y && date.getMonth() === +m - 1 && date.getDate() === +d
  }

  function clearErrors() {
    setFirstNameError("")
    setLastNameError("")
    setUsernameError("")
    setDayError("")
    setMonthError("")
    setYearError("")
    setEmailError("")
    setPasswordError("")
    setPasswordConfirmError("")
  }

  function clearFields() {
    setFirstName("")
    setLastName("")
    setUsername("")
    setEmail("")
    setPassword("")
    setPasswordConfirm("")
    setDay("")
    setMonth("")
    setYear("")
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    clearErrors()

    // Basic validations
    let valid = true
    if (!validateEmail(email)) {
      setEmailError("Invalid email address")
      return
    }
    if (!validatePassword(password)) {
      setPasswordError("Password is too weak")
      return
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmError("Passwords do not match")
      return
    }
    if (!isValidDate(day, month, year)) {
      setDayError("Invalid date")
      setMonthError("Invalid date")
      setYearError("Invalid date")
      return
    }

    try {
      setLoading(true)
      const dateOfBirth = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      const response: LoginResponse = await signUp({
        username,
        email,
        password,
        firstname: firstName,
        lastname: lastName,
        dob: dateOfBirth,
      })

      if (response.success) {
        clearFields()

        // Immediately log the user in
        const newUser = await login(email, password)
        if (newUser) {
          router.push(`/users/${newUser._id}/profile`)
        } else {
          toast.error("Login failed after signup")
        }
      } else {
        throw new Error(response.error?.message || "Signup failed")
      }
    } catch (errer) {
      console.log((errer as Error).message)
      toast.error((errer as Error).message || "Unknown error occured.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 rounded-md border border-primary bg-primary p-4">
      <div className="relative flex w-full flex-col items-center overflow-hidden rounded-md font-sans">
        <Image
          src="/images/cool.jpg"
          alt="BetterVoxel"
          height={0}
          width={0}
          sizes="100vw"
          className="h-52 w-full rounded-md object-cover blur-[1px]"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-white/20 dark:bg-black/60">
          <h1 className="text-2xl font-medium text-white">Sign Up</h1>
        </div>
      </div>

      <div className="space-y-4 sm:max-w-[480px]">
        <p className="my-xs text-xs text-tertiary">
          By continuing, you agree to our{" "}
          <Link className="text-orange-600 hover:underline" target="_blank" href="/tos">
            Terms
          </Link>{" "}
          and confirm you understand our{" "}
          <Link className="text-orange-600 hover:underline" target="_blank" href="/privacy">
            Privacy Policy
          </Link>
          .
        </p>

        <form onSubmit={handleSignUp} noValidate className="flex flex-col gap-4">
          {/* First + Last Name */}
          <div className="flex gap-4">
            <Input
              type="text"
              value={firstName}
              onChange={setFirstName}
              placeholder="First Name"
              required
              errorMessage={firstNameError}
            />
            <Input
              type="text"
              value={lastName}
              onChange={setLastName}
              placeholder="Last Name"
              required
              errorMessage={lastNameError}
            />
          </div>

          {/* DOB */}
          <div className="flex gap-4">
            <Select
              id="day"
              options={Array.from({ length: 31 }, (_, i) => i + 1).map((d) => ({
                value: d.toString(),
                label: d.toString(),
              }))}
              value={day}
              onChange={setDay}
              placeholder="Day"
              errorMessage={dayError}
            />
            <Select
              id="month"
              options={[
                { value: "1", label: "Jan" },
                { value: "2", label: "Feb" },
                { value: "3", label: "Mar" },
                { value: "4", label: "Apr" },
                { value: "5", label: "May" },
                { value: "6", label: "Jun" },
                { value: "7", label: "Jul" },
                { value: "8", label: "Aug" },
                { value: "9", label: "Sep" },
                { value: "10", label: "Oct" },
                { value: "11", label: "Nov" },
                { value: "12", label: "Dec" },
              ]}
              value={month}
              onChange={setMonth}
              placeholder="Month"
              errorMessage={monthError}
            />
            <Select
              id="year"
              options={Array.from({ length: 101 }, (_, i) => 2024 - i).map((yr) => ({
                value: yr.toString(),
                label: yr.toString(),
              }))}
              value={year}
              onChange={setYear}
              placeholder="Year"
              errorMessage={yearError}
            />
          </div>

          {/* Username */}
          <Input
            type="text"
            value={username}
            onChange={setUsername}
            placeholder="Username"
            required
            errorMessage={usernameError}
          />

          {/* Email */}
          <Input
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Email"
            required
            errorMessage={emailError}
          />

          {/* Password + Confirm */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
              placeholder="Password"
              required
              errorMessage={passwordError}
            >
              <RevealPasswordButton
                showPassword={showPassword}
                setShowPassword={() => setShowPassword(!showPassword)}
              />
            </Input>
            <Input
              type={showPasswordConfirm ? "text" : "password"}
              value={passwordConfirm}
              onChange={setPasswordConfirm}
              placeholder="Confirm Password"
              required
              errorMessage={passwordConfirmError}
            >
              <RevealPasswordButton
                showPassword={showPasswordConfirm}
                setShowPassword={() => setShowPasswordConfirm(!showPasswordConfirm)}
              />
            </Input>
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              !firstName ||
              !lastName ||
              !username ||
              !email ||
              !password ||
              !passwordConfirm ||
              !day ||
              !month ||
              !year
            }
            className={`flex w-full items-center justify-center rounded-md bg-orange-600 p-3 text-white ${
              loading ? "opacity-70" : "hover:bg-orange-700"
            }`}
          >
            {loading ? (
              <AiOutlineLoading3Quarters size={20} className="animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
