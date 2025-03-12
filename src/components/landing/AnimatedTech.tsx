"use client"

import React, { forwardRef, useRef } from "react"
import Image from "next/image"

import { cn } from "@/utils/utils"
import { AnimatedBeam } from "@/components/magicui/AnimatedBeams"

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-14 items-center justify-center rounded-full bg-primary p-1",
          className
        )}
      >
        {children}
      </div>
    )
  }
)

Circle.displayName = "Circle"

export default function AnimatedTech({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  const isSafari = () => {
    const ua = navigator.userAgent.toLowerCase()
    return ua.includes("safari") && !ua.includes("chrome")
  }

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-lg",
        className
      )}
      ref={containerRef}
    >
      <div className="flex size-full h-fit flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <div ref={div1Ref}>
            <Image
              src="/images/rainbow-cube-animated.gif"
              unoptimized
              width={0}
              height={0}
              sizes="100vw"
              className="size-14 rounded-lg object-cover"
              alt="Image description"
            />
          </div>

          <div ref={div5Ref}>
            <Image
              src="/images/heart-cube.png"
              width={0}
              height={0}
              sizes="100vw"
              className="size-14 rounded-lg object-cover"
              alt="Image description"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div ref={div2Ref}>
            <Image
              src="/images/random-voxel.png"
              width={0}
              height={0}
              sizes="100vw"
              className="size-14 rounded-lg object-cover"
              alt="Image description"
            />
          </div>
          <div ref={div4Ref} className="z-10 rounded-full bg-primary p-1">
            <Image
              src="/images/rust-language.png"
              unoptimized
              width={0}
              height={0}
              sizes="100vw"
              className="size-14 rounded-lg object-cover"
              alt="Image description"
            />
          </div>
          <div ref={div6Ref}>
            <Image
              src="/images/color-cubes.png"
              unoptimized
              width={0}
              height={0}
              sizes="100vw"
              className="size-14 rounded-lg object-cover"
              alt="Image description"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div ref={div3Ref}>
            <Image
              src="/images/pumpkin-voxel.png"
              width={0}
              height={0}
              sizes="100vw"
              className="size-14 rounded-lg object-cover"
              alt="Image description"
            />
          </div>
          <div ref={div7Ref}>
            <Image
              src="/images/voxel-terrain.webp"
              unoptimized
              width={0}
              height={0}
              sizes="100vw"
              className="size-14 rounded-lg object-cover"
              alt="Image description"
            />
          </div>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div4Ref} />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div4Ref} reverse />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  )
}
