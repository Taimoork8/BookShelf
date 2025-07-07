import { type NextRequest, NextResponse } from "next/server"
import { books, updateBook, deleteBook } from "@/lib/data"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const book = books.find((b) => b._id === params.id)

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  return NextResponse.json(book)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedBook = updateBook(params.id, body)

    if (!updatedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json(updatedBook)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const success = deleteBook(params.id)

  if (!success) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  return NextResponse.json({ message: "Book deleted successfully" })
}
