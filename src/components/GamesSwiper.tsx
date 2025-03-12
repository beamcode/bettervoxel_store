"use client"

// components/GameSwiper.jsx
import React, { useRef, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import Image from "next/image"
import { AiFillLike } from "react-icons/ai"
import Link from "next/link"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export interface Game {
  id: number
  title: string
  description: string
  likes: number
  image: string
}

export default function GameSwiper({
  gamesList,
  className,
}: {
  gamesList: Game[]
  className?: string
}): JSX.Element {
  // create random unique id for each swiper instance
  const swiperId = `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  useEffect(() => {
    // Swiper requires the refs to be ready before it initializes
  }, [])

  console.log(gamesList)

  return (
    <div className={`relative h-52 overflow-hidden rounded-lg px-8 ${className}`}>
      {/* Custom Left Arrow */}
      <button
        ref={prevRef}
        className={`swiper-button-prev-custom-${swiperId} absolute inset-y-0 left-0 transform bg-gray-700 p-2 text-white opacity-50 shadow-md hover:opacity-100`}
      >
        &#8592; {/* Unicode Right Arrow */}
      </button>

      {/* Custom Right Arrow */}
      <button
        ref={nextRef}
        className={`swiper-button-next-custom-${swiperId} absolute inset-y-0 right-0 transform bg-gray-700 p-2 text-white opacity-50 shadow-md hover:opacity-100`}
      >
        &#8594; {/* Unicode Right Arrow */}
      </button>
      <div className="h-full overflow-hidden rounded-md">
        <Swiper
          className="h-full"
          modules={[Navigation, Pagination]}
          slidesPerGroup={3}
          slidesPerView={3}
          spaceBetween={24}
          pagination={false}
          navigation={{
            prevEl: `.swiper-button-prev-custom-${swiperId}`,
            nextEl: `.swiper-button-next-custom-${swiperId}`,
          }}
          breakpoints={{
            1440: { slidesPerView: 7, spaceBetween: 16, slidesPerGroup: 7 },
            1280: { slidesPerView: 6, spaceBetween: 16, slidesPerGroup: 6 },
            1024: { slidesPerView: 5, spaceBetween: 16, slidesPerGroup: 5 },
            768: { slidesPerView: 4, spaceBetween: 16, slidesPerGroup: 4 },
            640: { slidesPerView: 3, spaceBetween: 8, slidesPerGroup: 3 },
            0: { slidesPerView: 2, spaceBetween: 8, slidesPerGroup: 2 },
          }}
        >
          {gamesList.map((game) => (
            <SwiperSlide key={game.id}>
              <Link href="#" className="group flex h-full flex-col overflow-hidden rounded-md">
                <div className="relative h-full grow">
                  <Image
                    src={game.image}
                    alt={game.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="absolute inset-0 size-full overflow-hidden rounded-md border bg-primary object-cover"
                  />

                  <div className="absolute inset-0 rounded-md bg-gradient-radial from-transparent to-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex h-fit flex-col gap-1 py-1">
                  <h3 className="text-lg font-semibold">{game.title}</h3>
                  <span className="flex items-center gap-1 text-sm leading-none">
                    <AiFillLike className="inline-block" />
                    {game.likes}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
