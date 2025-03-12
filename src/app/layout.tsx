import "@/styles/globals.css"
import Providers from "../context/Providers"
import "react-toastify/dist/ReactToastify.css"
import { Analytics } from "@vercel/analytics/react"
import ThemeEnviroment from "@/components/ThemeEnviroment"

export default function LocalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="font-Helvetica relative bg-default text-primary antialiased"
        suppressHydrationWarning
      >
        <Providers>
          <ThemeEnviroment />
          {children}
        </Providers>
        <Analytics debug={false} />
      </body>
    </html>
  )
}
