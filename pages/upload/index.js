import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import Hero from "../../components/Hero"
import Link from "next/link"
export default function AvatarUploadPage() {
  const router = useRouter()
  const inputFileRef = useRef(null)
  const [blob, setBlob] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/")
    }
  }, [])

  return (
    <div>
      <Hero heading="Upload Panel" message="Upload Your Project" />

      <div className="h-[600px] ">
        <div className="flex justify-center">
          {" "}
          <form
            onSubmit={async (event) => {
              event.preventDefault()

              const file = inputFileRef.current.files[0]

              const response = await fetch(
                `/api/upload/route?filename=${file.name}`,
                {
                  method: "POST",
                  body: file,
                }
              )

              const newBlob = await response.json()

              setBlob(newBlob)
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {" "}
              <input name="file" ref={inputFileRef} type="file" required />
              <button
                type="submit"
                className="mt-5 bg-blue-500 mx-4 p-2 rounded-md text-white font-bold hover:bg-blue-700 transition-all ease-in-out duration-300"
              >
                Upload
              </button>
            </div>
          </form>{" "}
        </div>
        {blob && (
          <div className="flex justify-center">
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Link href="/display">
            <button className="mt-5 bg-blue-500 mx-4 p-2 rounded-md text-white font-bold hover:bg-blue-700 transition-all ease-in-out duration-300">
              Go to Display and Remove
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
