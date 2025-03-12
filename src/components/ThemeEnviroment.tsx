"use client"

import { useTheme } from "next-themes"
import { ToastContainer, Slide } from "react-toastify"

export default function ThemeEnviroment() {
  const { theme } = useTheme()

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme === "dark" ? "dark" : "light"}
      transition={Slide}
    />
  )
}
