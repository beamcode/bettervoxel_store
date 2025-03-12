import React from "react"
import clsx from "classnames"

interface InputProps {
  type: string
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  required?: boolean
  defaultChecked?: boolean
  autoComplete?: string
  errorMessage?: string
  maxLength?: number
  minLength?: number
  pattern?: string
  disabled?: boolean
  readOnly?: boolean
  children?: React.ReactNode
}

export default function Input({
  type,
  id,
  name,
  value,
  defaultValue = "",
  onChange = () => {},
  placeholder,
  required = false,
  defaultChecked = false,
  autoComplete = "off",
  errorMessage = "",
  maxLength,
  minLength,
  pattern,
  disabled = false,
  readOnly = false,
  children,
}: InputProps): JSX.Element {
  // Determine if there is an error
  const hasError = Boolean(errorMessage)

  // Base input classes
  const baseInputClasses =
    "peer w-full appearance-none rounded-md px-3.5 pb-2 pt-[22px] text-sm subpixel-antialiased transition-colors focus-within:outline-none"

  // Input classes based on error state
  const inputClasses = clsx(baseInputClasses, {
    // Error state classes
    "bg-pink-100 text-rose-600 focus-within:bg-pink-100 hover:bg-pink-200 hover:focus-within:bg-pink-100 dark:bg-red-950 dark:focus-within:bg-red-950 dark:hover:bg-red-900 dark:hover:focus-within:bg-red-950":
      hasError,
    // Normal state classes
    "bg-secondary hover:bg-gray-300 hover:focus-within:bg-secondary dark:hover:bg-zinc-700 dark:hover:focus-within:bg-secondary":
      !hasError,
  })

  // Label classes
  const labelClasses = clsx(
    "pointer-events-none absolute left-3.5 top-[15px] origin-top-left transform text-sm duration-150",
    {
      // Error state classes
      "text-rose-600": hasError,
      // Normal state classes
      "text-gray-500 dark:text-gray-400": !hasError,
    },
    // Positioning classes
    "-translate-y-2.5 scale-[0.85]",
    // Peer focus classes
    "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-[1] peer-focus:-translate-y-2.5 peer-focus:scale-[0.85]"
  )

  // Input props
  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    autoComplete,
    type,
    id,
    name,
    maxLength,
    minLength,
    pattern,
    disabled,
    readOnly,
    required,
    defaultChecked,
    placeholder: "",
    className: inputClasses,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
  }

  // Conditionally add either `value` or `defaultValue` to the inputProps
  if (value !== undefined) {
    inputProps.value = value
  } else {
    inputProps.defaultValue = defaultValue
  }

  return (
    <div className="w-full">
      <div className="relative flex">
        <input {...inputProps} />
        <label htmlFor={id} className={labelClasses}>
          {placeholder} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
      </div>
      {hasError && (
        <span className="block px-2 pt-1 text-xs leading-none text-rose-600">{errorMessage}</span>
      )}
    </div>
  )
}
