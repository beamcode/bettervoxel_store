import { useState } from "react"

export default function DistanceFilter() {
  const [minimum, setMinimum] = useState(0)
  const [maximum, setMaximum] = useState(10)

  const handleMinChange = (e: any) => {
    setMinimum(() => e.target.value)
  }

  const handleMaxChange = (e: any) => {
    setMaximum(() => e.target.value)
  }

  return (
    <div className="w-full">
      <header>
        <h3>Price Range</h3>
      </header>
      <div className="my-6 flex w-full justify-between">
        <div className="flex h-[45px] w-1/3 flex-grow items-center gap-2">
          <span className="">Min</span>
          <input
            type="number"
            className="bg-tertiarymid w-full rounded-md border text-center"
            value={minimum}
            id="minimum"
            onChange={(e) => handleMinChange(e)}
          />
        </div>
        <div className="flex items-center justify-center px-3 text-center">
          <p>-</p>
        </div>
        <div className="flex w-1/3 flex-grow items-center gap-2">
          <span>Max</span>
          <input
            type="number"
            className="w-full rounded-md border border-primary text-center"
            value={maximum}
            onChange={(e) => handleMaxChange(e)}
          />
        </div>
      </div>

      <div className="slider">
        <div
          className={`progress left-[${(minimum / 50) * 100}%] right-[${
            100 - (maximum / 50) * 100
          }%]`}
        ></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min="0"
          max="50"
          value={minimum}
          step="1"
          onChange={(e) => handleMinChange(e)}
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max="50"
          value={maximum}
          step="1"
          onChange={(e) => handleMaxChange(e)}
        />
      </div>
    </div>
  )
}
