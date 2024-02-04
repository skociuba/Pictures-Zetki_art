import { list } from "@vercel/blob"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { blobs } = await list()
      res.status(200).json(blobs)
    } catch (error) {
      console.error("Error fetching blobs:", error)
      res.status(500).json({ error: "Error fetching blobs" })
    }
  } else {
    res.status(405).send("Method Not Allowed")
  }
}
