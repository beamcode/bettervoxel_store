"use client"

import Container from "@/components/Container"
import { FaFile } from "react-icons/fa6"
import React from "react"
import { twMerge } from "tailwind-merge"
import filesList from "@/data/filesList.json"
import Image from "next/image"
import type { Metadata } from "next"
import { useEffect, useState } from "react"

// export const metadata: Metadata = {
//   title: "Download",
//   description: "Download BetterVoxel for Windows, Mac or Linux.",
// }

interface File {
  title: string
  fileName: string
  downloadLink: string
  size: string
  version: string
  date: string
}

function FileTable({ files }: { files: File[] }) {
  return (
    <>
      <div className="hidden overflow-auto md:block">
        <table className="w-full">
          <thead className="border-b border-secondary">
            <tr className="">
              <th className="w-24 rounded-l-md p-3 text-left text-sm font-semibold tracking-wide">
                File
              </th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">Title</th>
              <th className="w-24 p-3 text-left text-sm font-semibold tracking-wide">Size</th>
              <th className="w-24 p-3 text-left text-sm font-semibold tracking-wide">Version</th>
              <th className="w-32 rounded-r p-3 text-left text-sm font-semibold tracking-wide">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-secondary-bg">
            {files.length > 0 ? (
              files.map((file: File, index) => (
                <tr
                  className="group cursor-pointer [&>*]:whitespace-nowrap [&>*]:p-3 [&>*]:text-sm [&>*]:group-hover:bg-secondary"
                  key={index}
                  onClick={(e) => {
                    const link = document.createElement("a")
                    link.href = file.downloadLink
                    link.download = file.fileName
                    link.click()
                  }}
                >
                  <td className="flex items-center gap-2 rounded-l-md">
                    <FaFile className="inline text-blue-500" />
                    <a
                      href={file.downloadLink}
                      download
                      className="font-bold text-blue-500 hover:underline group-hover:underline"
                    >
                      {file.fileName}
                    </a>
                  </td>
                  <td className="">{file.title}</td>
                  <td className="">{file.size}</td>
                  <td className="">{file.version}</td>
                  <td className="rounded-r-md">{file.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-sm">
                  No files available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
        {files.length > 0 ? (
          files.map((file: File, index) => (
            <div className="space-y-2 overflow-hidden rounded-md bg-secondary p-4" key={index}>
              <div className="text-sm">{file.fileName}</div>
              <div className="flex w-full justify-between">
                <div className="text-sm font-semibold">Date:</div>
                <div className="text-sm">{file.date}</div>
              </div>
              <div className="flex w-full justify-between">
                <div className="text-sm font-semibold">Version:</div>
                <div className="text-sm">{file.version}</div>
              </div>
              <div className="flex w-full justify-between">
                <div className="text-sm font-semibold">Size:</div>
                <div className="text-sm">{file.size}</div>
              </div>
              <a
                href={file.downloadLink}
                download
                className="block w-full overflow-hidden rounded-md bg-blue-200 bg-opacity-50 p-1.5 text-center text-xs font-medium uppercase tracking-wider text-blue-500 hover:bg-blue-300 dark:bg-blue-600 dark:text-blue-100"
              >
                Download
              </a>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-sm">No files available</p>
        )}
      </div>
    </>
  )
}

const svgIcons = {
  windows: (
    <svg
      className="fill-current"
      enableBackground="new 0 0 76.00 76.00"
      viewBox="19 19 38 38"
      width={24}
      height={24}
    >
      <path
        strokeLinejoin="round"
        d="M 19,19L 37,19L 37,37L 19,37L 19,19 Z M 57,19L 57,37L 39,37L 39,19L 57,19 Z M 57,57L 39,57L 39,39L 57,39L 57,57 Z M 19,57L 19,39L 37,39L 37,57L 19,57 Z "
      />
    </svg>
  ),
  macos: (
    <svg
      fill="CurrentColor"
      height="24px"
      width="24px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 22.773 22.773"
      xmlSpace="preserve"
    >
      <path
        d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573
			c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"
      />
      <path
        d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334
			c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0
			c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019
			c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464
			c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648
			c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"
      />
    </svg>
  ),
  linux: (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
      <path d="M11.442 6.298c.043.021.078.073.13.073.046 0 .12-.018.124-.065.008-.06-.082-.099-.138-.124-.073-.03-.167-.043-.236-.005-.017.009-.034.03-.026.048.013.055.099.047.146.073Zm-.941.072c.052 0 .086-.05.13-.072.046-.026.132-.018.15-.07.008-.016-.01-.038-.026-.046-.069-.04-.164-.026-.237.004-.055.026-.146.064-.137.125.004.042.077.064.12.06Zm-1.1 1.019c.086.082.202.193.344.305.284.223.679.455 1.173.455.498 0 .967-.253 1.366-.464.21-.111.469-.3.636-.446.168-.147.254-.271.133-.284-.12-.013-.111.112-.257.22-.19.137-.417.317-.598.42-.318.18-.838.438-1.284.438-.447 0-.804-.206-1.07-.416-.133-.108-.245-.215-.331-.297-.064-.06-.082-.197-.185-.21-.06-.005-.077.159.073.279Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 18.35c-.154-.173-.227-.499-.308-.847-.078-.348-.168-.722-.452-.962a1.173 1.173 0 0 0-.348-.211c.396-1.173.24-2.342-.159-3.399-.49-1.293-1.344-2.423-1.998-3.196-.734-.924-1.447-1.8-1.435-3.094.022-1.972.22-5.637-3.256-5.641-4.4-.009-3.3 4.443-3.347 5.809-.073 1.005-.275 1.796-.967 2.78-.812.966-1.955 2.526-2.496 4.154-.258.77-.378 1.551-.267 2.29-.279.25-.49.632-.713.868-.18.185-.442.254-.73.357-.288.103-.602.258-.795.623a1.1 1.1 0 0 0-.12.533c0 .167.025.34.051.507.052.348.108.674.034.893-.223.62-.253 1.049-.094 1.363.163.313.49.45.864.528.743.155 1.753.116 2.547.537.851.447 1.715.606 2.402.447.499-.112.907-.413 1.113-.868.537-.004 1.13-.232 2.075-.284.64-.051 1.444.228 2.367.177.026.098.06.197.108.287v.005c.357.717 1.022 1.044 1.731.988.714-.056 1.466-.473 2.076-1.199.584-.705 1.546-.997 2.187-1.383.317-.194.575-.434.597-.787.017-.352-.19-.743-.666-1.276Zm-8.433-13.6c.42-.953 1.47-.936 1.89-.016.28.61.155 1.327-.184 1.735a5.318 5.318 0 0 0-.542-.21c.047-.052.133-.116.168-.198.206-.507-.009-1.16-.391-1.173-.314-.021-.597.464-.507.989a3.058 3.058 0 0 0-.559-.19 1.711 1.711 0 0 1 .125-.936Zm-1.749-.493c.434 0 .894.61.82 1.44-.15.042-.304.107-.438.197.052-.383-.141-.864-.412-.842-.36.03-.421.91-.077 1.207.043.034.081-.009-.254.236-.67-.627-.451-2.238.361-2.238Zm-.584 2.608c.266-.198.584-.43.606-.451.201-.19.58-.61 1.198-.61.305 0 .67.098 1.113.382.27.176.486.189.971.4.361.15.589.416.451.781-.112.306-.472.62-.975.778-.477.155-.85.688-1.641.64a1.197 1.197 0 0 1-.413-.09c-.344-.15-.524-.447-.86-.644-.369-.207-.566-.447-.63-.658-.06-.21 0-.386.18-.528Zm.142 14.35c-.116 1.508-1.887 1.478-3.236.773-1.284-.678-2.947-.279-3.287-.94-.103-.202-.103-.546.112-1.135v-.008c.103-.327.026-.688-.026-1.027-.051-.335-.077-.645.039-.86.15-.287.365-.39.636-.485.442-.159.507-.146.842-.425.236-.245.408-.555.614-.774.22-.236.43-.348.76-.296.349.051.65.292.942.687l.842 1.53c.408.855 1.852 2.08 1.762 2.96Zm-.06-1.113a9.234 9.234 0 0 0-.62-.842c.306 0 .61-.094.718-.382.099-.267 0-.64-.318-1.07-.58-.782-1.645-1.396-1.645-1.396-.58-.361-.907-.804-1.057-1.285-.15-.481-.13-1.001-.013-1.512.223-.984.799-1.942 1.169-2.544.098-.073.034.138-.374.894-.365.691-1.049 2.29-.112 3.54a7.42 7.42 0 0 1 .593-2.642c.516-1.178 1.603-3.218 1.688-4.842.048.034.198.137.267.176.197.116.348.288.541.442.533.43 1.225.396 1.822.052.266-.15.481-.322.683-.387.425-.133.765-.37.958-.644.331 1.306 1.104 3.192 1.598 4.111.263.49.787 1.526 1.014 2.776.142-.004.301.017.469.06.593-1.534-.503-3.188-1.001-3.648-.202-.197-.21-.283-.112-.279.541.481 1.255 1.448 1.512 2.535.12.498.142 1.018.018 1.534.704.292 1.542.769 1.319 1.495-.095-.004-.138 0-.18 0 .137-.434-.168-.756-.98-1.121-.843-.37-1.547-.37-1.646.537-.52.18-.786.631-.92 1.173-.12.48-.154 1.06-.189 1.714-.021.33-.154.773-.292 1.246-1.379.984-3.295 1.413-4.91.31Zm11.059-.494c-.039.722-1.77.855-2.716 1.998-.567.675-1.263 1.048-1.873 1.096-.61.047-1.139-.207-1.448-.83-.202-.476-.103-.992.047-1.56.16-.61.396-1.236.426-1.744.034-.653.073-1.224.18-1.662.112-.443.284-.74.589-.907.013-.008.03-.013.043-.021.034.567.313 1.143.807 1.267.542.142 1.32-.322 1.65-.7.387-.013.675-.039.971.219.426.365.305 1.302.735 1.787.455.499.601.838.589 1.057Z"
      />
    </svg>
  ),
}

const osMessages: Record<OS, { text: string; icon: JSX.Element }> = {
  windows: { text: "Download for Windows", icon: svgIcons.windows },
  macos: { text: "Download for macOS", icon: svgIcons.macos },
  linux: { text: "Download for Linux", icon: svgIcons.linux },
  unknown: { text: "Download for Windows", icon: svgIcons.windows },
}

type OS = "windows" | "macos" | "linux" | "unknown"

export default function Page() {
  const [os, setOS] = useState<OS>("unknown")

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    if (userAgent.includes("win")) {
      setOS("windows")
    } else if (userAgent.includes("mac")) {
      setOS("macos")
    } else if (userAgent.includes("linux")) {
      setOS("linux")
    }
  }, [])

  const { text, icon } = osMessages[os]

  return (
    <Container mainContainer className="">
      <div className="size-full space-y-4 overflow-hidden rounded-md border border-primary bg-primary p-2">
        <h1 className="px-2 text-2xl">Binaries</h1>
        <FileTable files={filesList.binaries} />

        <div className="py-2" />

        <h1 className="px-2 text-2xl">Sample Projects</h1>
        <FileTable files={filesList.exampleProjects} />
      </div>
    </Container>
  )
}
