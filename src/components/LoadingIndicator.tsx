import { twMerge } from "tailwind-merge"

export default function LoadingIndicator({ className, ...props }: { className?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 from-pink-500 to-orange-400 [&>*]:size-4 [&>*]:animate-bounce [&>*]:rounded-full [&>*]:bg-gradient-to-br">
      <span className="sr-only">Loading...</span>
      <div className="animate-delay-[-0.3s]"></div>
      <div className="animate-delay-[-0.15s]"></div>
      <div className=""></div>
    </div>
  )
}
