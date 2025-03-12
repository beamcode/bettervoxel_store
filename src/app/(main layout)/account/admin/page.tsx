import AdminSection from "@/components/settings/AdminSection"

export default function Page() {
  return (
    <div className="flex w-full flex-col">
      <h1 className="mb-4 text-lg font-medium text-red-500 lg:text-2xl">Admin panel</h1>
      <AdminSection />
    </div>
  )
}
