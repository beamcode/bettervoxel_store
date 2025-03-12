"use client"

interface PriceInputProps {
  value?: number | null
  min?: number
  max?: number
  step?: number
  placeholder?: string
  id?: string
  className?: string
  setValue: (value: number | null) => void
}

function PriceInput({
  value,
  min = 0,
  max = 100000,
  step = 10,
  placeholder = "Enter amount",
  id,
  className,
  setValue,
}: PriceInputProps) {
  return (
    <input
      type="number"
      value={value !== null ? value : ""}
      onChange={(e) => {
        const inputValue = e.target.value
        setValue(inputValue === "" ? null : Number(inputValue))
      }}
      onKeyDown={(e) => {
        if (
          e.key === "e" ||
          e.key === "E" ||
          e.key === "+" ||
          e.key === "-" ||
          e.key === "." ||
          e.key === ","
        ) {
          e.preventDefault()
        }
      }}
      className={className}
      min={min}
      max={max}
      step={step}
      required
      placeholder={placeholder}
      id={id}
    />
  )
}

export default PriceInput
