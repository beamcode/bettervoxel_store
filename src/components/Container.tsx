import { twMerge } from "tailwind-merge"

export default function Container({
  children,
  className,
  mainContainer = false,
  centered = false,
}: {
  children: React.ReactNode
  className?: string
  mainContainer?: boolean
  centered?: boolean
}) {
  return (
    <div
      className={twMerge(
        "relative flex w-full flex-col items-center justify-between p-4",
        mainContainer && "lg:py-10"
      )}
    >
      <div className={twMerge("w-full", centered ? "max-w-3xl" : "max-w-[1400px]", className)}>
        {children}
      </div>
    </div>
  )
}
