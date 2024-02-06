import { del } from "@vercel/blob"
import { NextResponse } from "next/server"

export const config = {
  runtime: "edge",
}

export default async function DELETE(request, response) {
  try {
    const json = await request.body

    await del(json)

    return   response.status(200).json({})
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "An error occurred" })
  }
}
