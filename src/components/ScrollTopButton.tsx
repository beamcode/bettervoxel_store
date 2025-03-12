"use client"

import { useEffect, useState } from "react"

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false)
    }
    // listen for scroll events
    window.addEventListener("scroll", toggleVisibility)

    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
  }

  return (
    <button
      className={`bottom-4 right-4 h-fit rounded-full bg-zinc-300 p-2 outline-none transition-all duration-500 ${isVisible ? "opacity-100" : "pointer-events-none opacity-0"} `}
      onClick={scrollToTop}
    >
      <svg className="h-5 w-5 fill-black" viewBox="3 3 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.657 15.657a1 1 0 0 1-.707-.293L12 10.414l-4.95 4.95a1 1 0 0 1-1.414-1.414l5.657-5.657a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1-.707 1.707z" />
      </svg>
    </button>
  )
}
