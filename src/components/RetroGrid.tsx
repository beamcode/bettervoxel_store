import { twMerge } from "tailwind-merge"

export default function RetroGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 w-full overflow-hidden opacity-50 [perspective:250px]">
      <div className="absolute inset-0 [transform:rotateX(35deg)]">
        <div
          className={twMerge(
            "animate-grid",

            "[background-repeat:repeat] [background-size:40px_20px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",

            // Light Styles
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",

            // Dark styles
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_0)]"
          )}
        />
      </div>

      {/* <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" /> */}
    </div>
  )
}
