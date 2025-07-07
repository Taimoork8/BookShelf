"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

interface Book {
  _id: string
  title: string
  author: string
  genre: string
  coverImageUrl?: string
  description: string
  publishedYear: number
}

export default function BookShelf() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books")
      if (response.ok) {
        const data = await response.json()
        setBooks(data)
      }
    } catch (error) {
      console.error("Error fetching books:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My BookShelf</h1>
          <Link href="/add-book">
            <Button className="bg-blue-600 hover:bg-blue-700">Add New Book</Button>
          </Link>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">No books in your shelf yet. Add your first book!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <Card key={book._id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    {book.coverImageUrl ? (
                      <img
                        src={book.coverImageUrl || "/placeholder.svg"}
                        alt={book.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/book/${book._id}`} className="w-full">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
