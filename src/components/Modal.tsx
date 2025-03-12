"use client"

import React, { useEffect, useState } from "react"
import { useModal } from "../context/ModalContext"

const Modal = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, closeModal } = useModal()
  const [displayStyle, setDisplayStyle] = useState("invisible scale-125 opacity-0")

  useEffect(() => {
    if (isOpen) {
      setDisplayStyle("visible scale-100 opacity-100")
    } else {
      setDisplayStyle("invisible scale-110 opacity-0")
    }
  }, [isOpen])

  return (
    <div
      onClick={closeModal}
      className={`fixed inset-0 z-50 content-center space-y-4 px-5 transition-opacity duration-200 ${
        isOpen ? "visible bg-black/40 backdrop-blur-[5px]" : "invisible opacity-0"
      }`}
    >
      <div
        className={`relative flex-col items-center justify-center overflow-hidden transition-all duration-200 md:flex ${displayStyle}`}
      >
        <div className="flex w-full max-w-[1400px] flex-col items-center space-y-4 p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full flex-col space-y-2 md:w-fit"
          >
            <button
              className="flex size-8 cursor-pointer items-center justify-center self-end rounded-md bg-secondary pb-1 text-2xl leading-none text-tertiary transition-all hover:text-primary"
              onClick={closeModal}
            >
              &times;
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
