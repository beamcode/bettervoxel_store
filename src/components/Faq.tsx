"use client"

import { useState } from "react"

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: "What is BetterVoxel?",
    answer:
      "BetterVoxel is a state-of-the-art voxel engine designed for future gaming experiences, enabling developers to build immersive and dynamic 3D worlds.",
  },
  {
    question: "How can I get started with BetterVoxel?",
    answer:
      "You can start by downloading the BetterVoxel engine from our official website and checking out our extensive documentation and tutorials.",
  },
  {
    question: "Is BetterVoxel free to use?",
    answer:
      "Yes, BetterVoxel is available under a free license for non-commercial use. Commercial licenses are available for enterprises and developers.",
  },
  {
    question: "What platforms does BetterVoxel support?",
    answer:
      "BetterVoxel supports multiple platforms including Windows, Mac, Linux, and popular game consoles.",
  },
]

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl">Frequently Asked Questions</h1>
      </div>
      <div>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center gap-3 rounded-md border border-primary bg-primary p-3 text-left text-lg font-semibold"
              aria-expanded={activeIndex === index}
            >
              <span
                className={`transform transition-transform duration-300 -rotate-90${
                  activeIndex === index ? "rotate-0" : ""
                }`}
              >
                ▼
              </span>
              {faq.question}
            </button>
            <div
              className={`transition-height p-4 duration-500 ease-in-out ${
                activeIndex === index ? "block" : "hidden"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
