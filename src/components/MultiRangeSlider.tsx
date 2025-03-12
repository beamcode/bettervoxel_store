import { useCallback, useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import "./multiRangeSlider.css"

const MultiRangeSlider = ({ min, max }: { min: number; max: number }) => {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const minValRef = useRef(min)
  const maxValRef = useRef(max)
  const range = useRef<HTMLDivElement>(null)

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal)
    const maxPercent = getPercent(maxValRef.current)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, getPercent])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(maxVal)

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxVal, getPercent])

  return (
    <div className="">
      <div className="mb-1 flex w-full justify-between">
        <div className="w-fit rounded-lg bg-gray-200 px-2 py-0.5 text-[15px]">{minVal}</div>
        <div className="w-fit rounded-lg bg-gray-200 px-2 py-0.5 text-[15px]">{maxVal}</div>
      </div>
      <div className="relative flex h-[21px] items-center justify-center">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1)
            setMinVal(value)
            minValRef.current = value
          }}
          className="thumb thumb--left pointer-events-none absolute z-30 mt-[-4px] h-0 w-full appearance-none outline-none"
          style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1)
            setMaxVal(value)
            maxValRef.current = value
          }}
          className="thumb thumb--right pointer-events-none absolute z-40 mt-[-4px] h-0 w-full appearance-none outline-none"
        />

        <div className="slider relative h-[calc(100%-10px)] w-full">
          <div className="slider__track absolute z-10 h-[10px] w-full rounded-full bg-[#dfdfdf]" />
          <div
            ref={range}
            className="slider__range absolute z-20 h-[10px] rounded-full bg-orange-400"
          />
        </div>
      </div>
    </div>
  )
}

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
}

export default MultiRangeSlider
