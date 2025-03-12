import type { FooterCategory } from "@/components/Footer"

export const urlBase = new URL(
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
)

export const domain = "https://bettervoxel.io"

export const footer: FooterCategory[] = [
  {
    title: "COMPANY",
    items: [
      { label: "Team", href: "https://docs.bettervoxel.io/team/", external: true },
      { label: "Contact", href: "/contact", external: false },
    ],
  },
  {
    title: "RESOURCES",
    items: [
      { label: "Documentation", href: "https://docs.bettervoxel.io/docs/", external: true },
      { label: "Blog", href: "https://docs.bettervoxel.io/blog/", external: true },
      { label: "Faq", href: "/faq", external: false },
    ],
  },
  {
    title: "GAMES",
    items: [{ label: "(coming soon)", href: "/", external: false }],
  },
  {
    title: "LEGAL",
    items: [
      { label: "TOS", href: "/tos", external: false },
      { label: "Privacy", href: "/privacy", external: false },
    ],
  },
]
