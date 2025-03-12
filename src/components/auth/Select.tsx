export default function Select({
  id,
  value,
  onChange,
  placeholder,
  errorMessage = "",
  children,
  options,
}: {
  id: string
  value: string
  onChange: (e: any) => void
  placeholder: string
  errorMessage?: string
  children?: React.ReactNode
  options: { value: string; label: string }[]
}) {
  return (
    <div className="w-full">
      <div
        className="group relative grid"
        data-focused={value.trim().length === 0 ? "false" : "true"}
      >
        <select
          onChange={(e) => onChange(e.target.value)}
          value={value.trim().length === 0 ? "" : value}
          id={id}
          className={` ${
            errorMessage
              ? "bg-pink-100 text-rose-600 hover:bg-pink-200 dark:bg-red-950 dark:hover:bg-red-900"
              : "bg-secondary hover:bg-gray-300 dark:hover:bg-zinc-700"
          } col-start-1 row-start-1 w-full appearance-none rounded-md px-3.5 pb-2 pt-[22px] text-sm subpixel-antialiased outline-none transition-colors`}
        >
          <option value="" disabled />
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none relative right-4 col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
        <label
          htmlFor={id}
          data-focusedd={value.trim().length === 0 ? "false" : "true"}
          className={`pointer-events-none absolute left-3.5 top-[15px] origin-top-left -translate-y-2.5 scale-[0.85] transform text-sm duration-300 group-data-[focused=false]:translate-y-0 group-data-[focused=true]:-translate-y-2.5 group-data-[focused=false]:scale-[1] group-data-[focused=true]:scale-[0.85] ${
            errorMessage ? "text-rose-600" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {placeholder} <span className="text-[red]">*</span>
        </label>
        {children}
      </div>
      {errorMessage && (
        <span className="block px-2 pt-1 text-xs leading-none text-rose-600">{errorMessage}</span>
      )}
    </div>
  )
}
