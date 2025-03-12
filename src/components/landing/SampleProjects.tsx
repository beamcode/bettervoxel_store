import Image from "next/image"
import Link from "next/link"
import { FaDownload } from "react-icons/fa"
import { TbClick } from "react-icons/tb"

const sampleProjects = [
  {
    title: "Comming soon",
    description: "We will ad additional projects soon. Stay tuned.",
    image: "/images/placeholder-project-image.jpg",
  },
  {
    title: "Comming soon",
    description: "We will ad additional projects soon. Stay tuned.",
    image: "/images/placeholder-project-image.jpg",
  },
  {
    title: "Comming soon",
    description: "We will ad additional projects soon. Stay tuned.",
    image: "/images/placeholder-project-image.jpg",
  },
  {
    title: "Comming soon",
    description: "We will ad additional projects soon. Stay tuned.",
    image: "/images/placeholder-project-image.jpg",
  },
]

export default function SampleProjects() {
  return (
    <div className="w-full space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl">Sample projects</h1>
        <p className="text-base text-secondary md:max-w-[50%] md:text-lg">
          Samples are pre-built projects designed to help you quickly learn and get working in
          BetterVoxel without needing to start from scratch. Download, play, deconstruct, and make
          them your own.
        </p>
      </div>

      <div className="grid h-fit grid-cols-2 gap-4 min-[575px]:grid-cols-2 md:grid-cols-4">
        {sampleProjects.map((project, index) => (
          <div
            key={index}
            className="bg-primar group relative overflow-hidden rounded-md border border-primary bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${project.image})` }}
          >
            <div className="flex size-full flex-col justify-between gap-10 overflow-hidden bg-primary p-4 opacity-0 transition-all group-hover:opacity-100">
              <div className="space-y-4">
                <h1 className="text-xl font-semibold">{project.title}</h1>
                <p className="text-sm text-secondary md:text-base">{project.description}</p>
              </div>

              <Link
                href="/download"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-secondary p-2 px-4 text-center transition-colors duration-300 hover:bg-tertiary"
              >
                <FaDownload />
                download
              </Link>
            </div>

            <div className="absolute bottom-4 right-4 size-8 overflow-hidden rounded-md bg-primary p-1 group-hover:hidden">
              <TbClick className="size-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
