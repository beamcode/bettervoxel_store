import { MotionDiv } from "@/components/motionWrapper"
import Image from "next/image"
import { SmartPerson, RustLogo, GameboyIcon } from "@/components/svgs"
import { twMerge } from "tailwind-merge"

function InfoCard({
  url,
  title,
  paragraph,
  svg,
  className,
}: {
  url: string
  title: string
  paragraph: string
  svg: JSX.Element
  className?: string
}) {
  return (
    <div className={twMerge("relative flex flex-col items-center rounded-md", className)}>
      <div className="flex w-full flex-shrink-0 flex-grow flex-col space-y-3 rounded-md border border-primary bg-primary p-2">
        <Image
          src={url}
          width={0}
          height={0}
          sizes="100vw"
          className="size-full rounded-md object-cover"
          alt="Image description"
        />

        <div className="space-y-4 px-6 py-6">
          <h1 className="flex items-center gap-3 text-xl font-bold">
            {svg}
            {title}
          </h1>
          <p className="text-md text-secondary">{paragraph}</p>
        </div>
      </div>
    </div>
  )
}

export default function TripleInfoCards() {
  return (
    <div className="flex flex-col gap-14">
      <h1 className="text-center text-5xl font-bold">Built using cutting edge technology</h1>
      <MotionDiv
        className="h-full w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <InfoCard
            url="/images/innovative.webp"
            title="Ingenious Design"
            paragraph="Our voxel engine boasts an elegantly designed architecture and user-friendly interface, ensuring an effortlessly enjoyable development experience."
            svg={<SmartPerson width={18} fill="currentColor" />}
            className="col-span-1"
          />

          <InfoCard
            url="/images/language.jpg"
            title="Rust Based"
            paragraph="Rust excels in voxel game engine development with its high performance and safety, ideal for handling complex 3D worlds."
            svg={<RustLogo width={22} fill="currentColor" />}
            className="col-span-1"
          />

          <InfoCard
            url="/images/2d.webp"
            title="2D game support"
            paragraph="Our versatile engine seamlessly supports both 3D and 2D game development, offering a flexible platform for creators to bring any vision to life."
            svg={<GameboyIcon width={15} fill="currentColor" />}
            className="col-span-1 sm:col-span-2 lg:col-span-1"
          />
        </div>
      </MotionDiv>
    </div>
  )
}
