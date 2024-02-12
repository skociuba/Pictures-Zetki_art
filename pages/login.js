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
    <form onSubmit={handleSubmit} className="mt-20">
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log in</button>
    </form>
  )
}
