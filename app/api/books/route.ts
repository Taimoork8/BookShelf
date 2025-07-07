import { type NextRequest, NextResponse } from "next/server"
import { books, addBook } from "@/lib/data"

export async function GET() {
  return NextResponse.json(books)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newBook = addBook(body)
    return NextResponse.json(newBook, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
