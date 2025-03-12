"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation, Variants, Transition } from "framer-motion"

import { cn } from "@/utils/utils"

interface WordRotateProps {
  words: string[]
  duration?: number
  variants?: Variants
  transition?: Transition
  className?: string
}

export default function WordRotate({
  words,
  duration = 2500,
  variants,
  transition = { duration: 0.25, ease: "easeOut" },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)
  const controls = useAnimation()

  // Default animation variants
  const defaultVariants: Variants = {
    initial: { opacity: 0, y: "-50%" },
    animate: { opacity: 1, y: "0%" },
    exit: { opacity: 0, y: "50%" },
  }

  // Merge default variants with custom variants if provided
  const combinedVariants = { ...defaultVariants, ...variants }

  useEffect(() => {
    // Start the enter animation when the component mounts
    controls.start("animate")

    // Set up the interval to change words
    const interval = setInterval(() => {
      // Start the exit animation
      controls.start("exit").then(() => {
        // After exit animation completes, update the index
        setIndex((prevIndex) => (prevIndex + 1) % words.length)
      })
    }, duration)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [duration, words.length])

  // Ensure controls.set is called after the index updates
  useEffect(() => {
    controls.set("initial")
    controls.start("animate")
  }, [index])

  return (
    <div className="overflow-hidden py-2">
      <motion.h1
        className={cn(className)}
        variants={combinedVariants}
        initial="initial"
        animate={controls}
        transition={transition}
      >
        {words[index]}
      </motion.h1>
    </div>
  )
}
