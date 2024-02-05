import { del } from "@vercel/blob"
import { NextResponse } from "next/server"

export const config = {
  runtime: "edge",
}

export default async function DELETE(request) {
  try {
    const json = await request.body

    await del(json)

    return NextResponse.json({})
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "An error occurred" })
  }
}
