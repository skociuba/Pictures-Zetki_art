"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import Hero from "../../components/Hero"
const Importer = () => {
  const [images, setImages] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/")
    }
  }, [])
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

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div>
      <Hero heading="Projects" message="Remove project" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Link href="/upload">
          <button className="mt-5 bg-blue-500 mx-4 p-2 rounded-md text-white font-bold hover:bg-blue-700 transition-all ease-in-out duration-300">
            Back to Upload Page
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">
        {images?.map((image) => (
          <div
            className="flex flex-row justify-center items-center"
            key={image.url}
          >
            <div>
              {" "}
              <Image
                src={image.url}
                alt="GitHub Logo"
                width={400}
                height={600}
                priority
              />
            </div>
            <div>
              <button
                className="bg-red-500 ml-4 p-2 rounded-md text-white font-bold hover:bg-red-700 transition-all ease-in-out duration-300"
                onClick={async () => {
                  const response = await fetch(`/api/remove/route`, {
                    method: "DELETE",
                    body: image.url,
                  })
                  if (response.ok) {
                    fetchImages()
                  }
                  return response
                }}
              >
                Usuń
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Importer
