
export default async function handle(req, res) {
  const { email, password } = req.body
  console.log({ email, password })

  if (password === "Amelia123!" && email === "user@example.com") {
    res.status(200).json({ message: true })

    return
  } else if (email !== "user@example.com") {
    res.status(400).json({ error: "Invalid email." })
    return
  } else if (password !== "Amelia123!") {
    res.status(400).json({ error: "Invalid password." })
    return
  }
}
