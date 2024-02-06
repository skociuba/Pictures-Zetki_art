import { useState, useRef } from "react"
import Hero from "../../components/Hero"
export default function AvatarUploadPage() {
  const inputFileRef = useRef(null)
  const [blob, setBlob] = useState(null)
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">      <input name="file" ref={inputFileRef} type="file" required />
            <button
              type="submit"
              className="bg-blue-500 ml-4 p-2 rounded-md text-white font-bold hover:bg-blue-700 transition-all ease-in-out duration-300"
            >
              Upload
            </button></div>  
          </form>{" "}
        </div>
        {blob && (
          <div className="flex justify-center">
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )}
      </div>
    </div>
  )
}
