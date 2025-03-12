import { MotionDiv } from "@/components/motionWrapper"
import Link from "next/link"
import ShineBorder from "@/components/magicui/ShineBorder"
import WordRotate from "../magicui/WordRotate"
import AnimatedTech from "./AnimatedTech"

export default function Hero({}) {
  return (
    <div className="flex min-h-[calc(100vh-500px)] w-full flex-1 flex-col items-center justify-center">
      <MotionDiv
        className="flex min-h-[500px] flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center justify-center pb-10 text-[3rem] transition-all sm:text-[3.5rem] md:text-[5rem]">
          <div className="flex">
            <span className="pointer-events-none whitespace-pre py-2 font-semibold leading-none">
              The voxel{" "}
            </span>
            <WordRotate
              duration={3000}
              words={["editor", "engine"]}
              className="pointer-events-none min-w-[7.2rem] font-semibold leading-none lg:min-w-[15rem]"
            />
          </div>
          <span className="pointer-events-none min-w-[11.5rem] font-semibold leading-none">
            for the future.
          </span>
          <p className="max-w-xl text-balance pt-10 text-center text-lg font-medium tracking-tight text-primary">
            Groundbreaking voxel engine and editor built from the ground up using{" "}
            <b>
              <a
                className="text-yellow-700 underline decoration-text-primary"
                href="https://www.rust-lang.org/"
              >
                Rust
              </a>
            </b>{" "}
            and{" "}
            <b>
              <a
                className="text-green-600 underline decoration-text-primary"
                href="https://bevyengine.org/"
              >
                Bevy
              </a>
            </b>
            , perfect for indie game devs to create <b>voxel-based games</b>.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            className="group relative inline-flex h-10 items-center justify-center gap-1 overflow-hidden whitespace-pre rounded-md border border-primary bg-default px-8 text-sm font-semibold tracking-tighter shadow-sm transition-all duration-150 ease-in-out will-change-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 md:flex"
            href="/docs"
          >
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>

          <Link
            className="group relative inline-flex h-10 items-center justify-center gap-1 overflow-hidden whitespace-pre rounded-md border border-primary bg-default px-8 text-sm font-semibold tracking-tighter shadow-sm transition-all duration-150 ease-in-out will-change-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 md:flex"
            href="/blog"
          >
            Blog
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
          <Link
            href="/download"
            className="block w-fit transition-all will-change-transform hover:scale-105"
          >
            <ShineBorder
              className="relative flex size-fit flex-col items-center justify-center overflow-hidden rounded-md bg-default md:shadow-xl"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
              <span className="px-6 py-2">Download</span>
            </ShineBorder>
          </Link>
        </div>
      </MotionDiv>

      {/* <AnimatedTech className="sm:-mt-20" /> */}
    </div>
  )
}
