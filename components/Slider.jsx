import Image from "next/image"
import React, { useState, useEffect } from "react"
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa"

const Slider = () => {
  const [images, setImages] = useState([])
  const [current, setCurrent] = useState(0)
  const length = images.length

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/download/route")

        if (response.ok) {
          const data = await response.json()
          setImages(data)
        } else {
          console.error("Błąd pobierania listy obrazów:", response.statusText)
        }
      } catch (error) {
        console.error("Błąd pobierania listy obrazów:", error)
      }
    }

    fetchImages()
  }, [])

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  if (!Array.isArray(images) || images.length <= 0) {
    return null
  }

  return (
    <div id="gallery" className="max-w-[1240px] mx-auto">
      <div className="relative flex justify-center p-4">
        {images?.map((slide, index) => {
          return (
            <div
              key={index}
              className={
                index === current
                  ? "opacity-[1] ease-in duration-1000"
                  : "opacity-"
              }
            >
              <FaArrowCircleLeft
                onClick={prevSlide}
                className="bg-black opacity-7 absolute top-[50%] left-[30px] text-white/70 cursor-pointer select-none z-[2]"
                size={50}
              />
              {index === current && (
                <Image
                  src={slide?.url}
                  alt="/"
                  width= "400"
                  height="600"
                  objectFit="cover"
                />
              )}
              <FaArrowCircleRight
                onClick={nextSlide}
                className="bg-black opacity-6 absolute top-[50%] right-[30px] text-white/70 cursor-pointer select-none z-[2]"
                size={50}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Slider
