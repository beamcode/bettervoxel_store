"use client"

import React, { useState, MutableRefObject } from "react"
import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "@/styles/carousel.css"

function ThumbnailPlugin(mainRef: MutableRefObject<KeenSliderInstance | null>): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current?.on("animationStarted", (main: KeenSliderInstance) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

function Arrow(props: { disabled: boolean; left?: boolean; onClick: (e: any) => void }) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? "arrow--left" : "arrow--right"} ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  )
}

export default function ImageCarousel({ children }: { children?: React.ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  })
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 4,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )

  return (
    <div className="space-y-1">
      <div className="relative flex grow">
        <div ref={sliderRef} className="keen-slider content-center rounded-t bg-black">
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="keen-slider__slide flex aspect-video w-full items-center justify-center"
            >
              {child}
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
              disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
            />
          </>
        )}
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail overflow-hidden rounded-b">
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="keen-slider__slide flex aspect-video w-full items-center justify-center bg-black"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
