import React, { createContext, useContext, useState, ReactNode, useEffect } from "react"
import Modal from "@/components/Modal"

interface ModalContextType {
  openModal: (content: ReactNode) => void
  closeModal: () => void
  isOpen: boolean
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  function openModal(content: ReactNode) {
    setModalContent(content)
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setTimeout(() => setModalContent(null), 300) // wait for the transition to end
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      {modalContent && <Modal>{modalContent}</Modal>}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
