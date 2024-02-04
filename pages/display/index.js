"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
const Importer = () => {
  const [images, setImages] = useState([])

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
  
  return (
    <div>
      <h2>Galeria Obrazów</h2>
      {images?.map((image) => (
        <div key={image.url}>
          <Image
            src={image.url}
            alt="GitHub Logo"
            width={400}
            height={600}
            priority
          />
        </div>
      ))}
    </div>
  )
}

export default Importer
