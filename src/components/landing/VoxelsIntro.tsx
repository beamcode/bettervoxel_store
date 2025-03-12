import Image from "next/image"
import { MotionDiv } from "@/components/motionWrapper"
import { ReactNode } from "react"
import CubeSpin from "./CubeSpin"

const sections = [
  {
    title: "What is a Voxel?",
    description: "A voxel is a 3D pixel, a small cube used to build 3D spaces in games.",
  },
  {
    title: "How Voxels are Used",
    description:
      "Voxel games use these blocks to create worlds players can modify and interact with.",
  },
  {
    title: "Benefits of Voxels",
    description:
      "Voxels allow for customizable, destructible environments that players can change.",
  },
  {
    title: "Voxel-Based Game Engine",
    description: "Our engine uses voxels to help developers build interactive, scalable worlds.",
  },
]

export default function VoxelIntro() {
  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <div className="flex flex-col gap-8">
        {sections.slice(0, 2).map((section, index) => (
          <div key={index} className="space-y-6 rounded-md border border-primary bg-primary p-4">
            <h3 className="transform bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text font-Montserrat text-3xl text-transparent">
              {section.title}
            </h3>
            <p className="text-lg text-secondary">{section.description}</p>
          </div>
        ))}
      </div>

      <div className="flex min-w-[33%] justify-center self-stretch overflow-hidden">
        <Image
          src="/images/voxel-guy.png"
          width={0}
          height={0}
          sizes="100vw"
          className="size-full min-w-[300px] rounded-md object-cover md:min-w-[500px]"
          alt="Voxel Game Engine"
          priority
        />
        {/* <CubeSpin /> */}
      </div>

      <div className="flex flex-col gap-8">
        {sections.slice(2).map((section, index) => (
          <div key={index} className="space-y-6 rounded-md border border-primary bg-primary p-4">
            <h3 className="relative transform bg-gradient-to-r from-purple-500 to-orange-400 bg-clip-text font-Montserrat text-3xl text-transparent">
              {section.title}
            </h3>
            <p className="text-lg text-secondary">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ClippedDiv({ children }: { children: ReactNode }) {
  const svgDataUrl = `data:image/svg+xml;base64,${btoa(
    `<svg width="194" height="194" viewBox="0 0 194 194" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 16C11 7.16344 18.1634 0 27 0H178C186.837 0 194 7.16344 194 16V171.922C194 175.226 192.977 178.449 191.071 181.149L186.781 187.227C183.783 191.474 178.908 194 173.71 194H16C7.16344 194 0 186.837 0 178V112.344C0 109.186 0.935009 106.097 2.6872 103.469L8.3128 95.0308C10.065 92.4025 11 89.3144 11 86.1556V16Z" fill="currentColor" />
    </svg>`
  )}`

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "rgba(216, 27, 27, 0.5)",
        maskImage: `url(${svgDataUrl})`,
        WebkitMaskImage: `url(${svgDataUrl})`,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
      className="w-fit"
    >
      {children}
    </div>
  )
}
