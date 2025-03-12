import Image from "next/image"

export default function Intro() {
  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      {/* <div className="relative flex w-full flex-col gap-10 overflow-hidden rounded-md border border-primary bg-primary p-2 sm:flex-row">
        <div className="z-10 flex w-full items-center justify-center overflow-hidden rounded-md bg-green-300 bg-opacity-30 xl:max-h-96">
          <Image
            src="/images/example-voxel.gif"
            width={0}
            unoptimized
            height={0}
            sizes="100vw"
            className="size-full object-contain p-2"
            alt="Image description"
          />
        </div>
        <RetroGrid />
      </div> */}

      <div className="relative flex w-full flex-col overflow-hidden rounded-md bg-primary sm:flex-row">
        <Image
          src="/images/editor.png"
          width={0}
          height={0}
          sizes="100vw"
          className="size-full rounded-md object-cover"
          alt="Image description"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="flex w-full flex-col justify-between gap-10">
        <h2 className="text-3xl font-extrabold text-primary md:text-5xl">
          Meet{" "}
          <span className="transform bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text font-Montserrat text-transparent">
            BetterVoxel
          </span>
        </h2>
        <p className="text-lg leading-relaxed text-secondary lg:text-xl">
          BetterVoxel is your gateway to the future of voxel creation. Crafted with the speed and
          reliability of the Rust language, it empowers creators with unparalleled tools to bring
          their voxel dreams to life.
        </p>
        <div className="space-y-4 text-lg">
          <div className="flex items-center">
            <span className="mr-2 size-4 rounded-sm bg-pink-300"></span>
            <p className="text-gray-800 dark:text-gray-300">Blazing fast performance</p>
          </div>
          <div className="flex items-center">
            <span className="mr-2 size-4 rounded-sm bg-purple-300"></span>
            <p className="text-gray-800 dark:text-gray-300">Intuitive and seamless design</p>
          </div>
          <div className="flex items-center">
            <span className="mr-2 size-4 rounded-sm bg-blue-300"></span>
            <p className="text-gray-800 dark:text-gray-300">Advanced voxel manipulation tools</p>
          </div>
        </div>
      </div>
    </div>
  )
}
