import LoadingIndicator from "../LoadingIndicator"

export default function LoadingCard() {
  return (
    <div className="h-[21rem] w-full max-w-sm place-content-center space-y-2 overflow-hidden rounded-md border border-primary bg-primary p-1.5">
      <LoadingIndicator />
    </div>
  )
}
