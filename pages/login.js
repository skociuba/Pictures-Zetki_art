import { useState } from "react"
import { useRouter } from "next/router"
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch("api/login/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (response.ok) {
      router.push("/upload")
      localStorage.setItem("token", data.message)
    } else {
      alert(data.error)
    }
  }

  return (
    <div>
      <div className="mt-20 ml-4 lg:ml-44">
        <button
          style={{
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            router.push("/#gallery")
          }}
        >
          Back to Gallery
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mt-5 mx-3 lg:mx-44">
        <div className="flex justify-center text-red-700 text-bold mb-3">
          Panel wyłącznie dla administratora !
        </div>
        <label style={{ marginBottom: "10px" }}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #000",
            }}
          />
        </label>
        <label style={{ marginBottom: "10px" }}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #000",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Log in
        </button>
      </form>
    </div>
  )
}
