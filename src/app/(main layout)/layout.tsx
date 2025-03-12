import "@/styles/globals.css"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Breadcrumb from "@/components/BreadCrumbs"

export default function LocalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="pt-[90px] lg:pt-[49px]">
        {children}
      </main>
      <Footer />
    </>
  )
}
