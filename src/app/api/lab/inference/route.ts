import { NextResponse } from "next/server"

const allowedModes = new Set(["plant", "detection"])
const allowedTypes = new Set(["image/jpeg", "image/png"])
const maxFileSize = 5 * 1024 * 1024

export async function POST(request: Request) {
  const formData = await request.formData()
  const mode = formData.get("mode")
  const sampleId = formData.get("sampleId")
  const image = formData.get("image")

  if (typeof mode !== "string" || !allowedModes.has(mode)) {
    return NextResponse.json(
      { message: "Choose a supported experiment." },
      { status: 400 },
    )
  }

  if (image instanceof File) {
    if (!allowedTypes.has(image.type)) {
      return NextResponse.json(
        { message: "Only JPG and PNG images are supported." },
        { status: 415 },
      )
    }

    if (image.size > maxFileSize) {
      return NextResponse.json(
        { message: "Image must be 5 MB or smaller." },
        { status: 413 },
      )
    }
  } else if (typeof sampleId !== "string" || sampleId.length === 0) {
    return NextResponse.json(
      { message: "Choose a sample preset or upload an image." },
      { status: 400 },
    )
  }

  return NextResponse.json(
    {
      message:
        "The inference service is not configured in this deployment. No prediction was generated.",
    },
    { status: 501 },
  )
}
