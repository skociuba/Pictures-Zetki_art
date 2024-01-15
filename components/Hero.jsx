import React from "react"

const Hero = ({ heading, message }) => {
  return (
    <div className="flex items-center justify-center h-screen mb-12 bg-fixed bg-center bg-cover custom-img">
      {/* Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]" />
      <div className="p-5 text-white z-[2] mt-[-10rem]">
        <h2 className="text-5xl font-bold">{heading}</h2>
        <p className="py-5 text-xl">{message}</p>
        <p className="pt-5 text-7xl font-bold">マンガ</p>
        <p className=" absolute bottom-20 left-20 right-0 z-[2]">
          Copyright {"\u{00A9}"} 2024 Zetki art. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Hero
