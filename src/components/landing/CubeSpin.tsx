import { twMerge } from "tailwind-merge"

export default function CubeSpin() {
  const box =
    "sm:h-[250px] sm:w-[250px] xs:h-[150px] xs:w-[150px] text-center border-2 border-gray sm:py-[100px] xs:py-[50px] px-0 text-white bg-black text-3xl box-border absolute [transition:all_1s]"

  return (
    <div className="mx-auto h-full w-full [perspective:1000px]">
      <div className="absolute inset-0 animate-[roll_5s_infinite] font-sans [transform-style:preserve-3d] xs:h-[150px] xs:w-[150px] sm:h-[250px] sm:w-[250px]">
        <div
          className={twMerge(
            box,
            "xs:[transform:translateZ(75px)] sm:[transform:translateZ(125px)]"
          )}
        >
          Front
        </div>
        <div
          className={twMerge(
            box,
            "xs:[transform:translateZ(-75px)] sm:[transform:translateZ(-125px)]"
          )}
        >
          Back
        </div>
        <div
          className={twMerge(box, "[transform:rotateY(-90deg)] xs:right-[75px] sm:right-[125px]")}
        >
          Left
        </div>
        <div className={twMerge(box, "[transform:rotateY(90deg)] xs:left-[75px] sm:left-[125px]")}>
          Right
        </div>
        <div
          className={twMerge(box, "[transform:rotateX(90deg)] xs:bottom-[75px] sm:bottom-[125px]")}
        >
          Top
        </div>
        <div className={twMerge(box, "[transform:rotateX(-90deg)] xs:top-[75px] sm:top-[125px]")}>
          Bottom
        </div>
      </div>
    </div>
  )
}
