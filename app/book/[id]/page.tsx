"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen } from "lucide-react"

interface Book {
  _id: string
  title: string
  author: string
  genre: string
  coverImageUrl?: string
  description: string
  publishedYear: number
}

export default function BookDetails() {
  const router = useRouter()
  const params = useParams()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchBook(params.id as string)
    }
  }, [params.id])

  const fetchBook = async (id: string) => {
    try {
      const response = await fetch(`/api/books/${id}`)
      if (response.ok) {
        const data = await response.json()
        setBook(data)
      }
    } catch (error) {
      console.error("Error fetching book:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!book || !confirm("Are you sure you want to delete this book?")) return

    try {
      const response = await fetch(`/api/books/${book._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.push("/")
      } else {
        alert("Error deleting book")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error deleting book")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Book not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to BookShelf
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 3D Card on the Left */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div
                  className="w-80 h-96 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl shadow-2xl transform transition-all duration-500 hover:rotate-y-12 hover:scale-105"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  {/* Card Front */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    {book.coverImageUrl ? (
                      <img
                        src={book.coverImageUrl || "/placeholder.svg"}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white p-8">
                        <BookOpen className="h-16 w-16 mb-4 opacity-80" />
                        <h3 className="text-xl font-bold text-center mb-2">{book.title}</h3>
                        <p className="text-sm opacity-80 text-center">by {book.author}</p>
                      </div>
                    )}

                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* 3D Effect - Side shadow */}
                  <div
                    className="absolute top-2 left-2 w-full h-full bg-black/20 rounded-2xl -z-10"
                    style={{ transform: "translateZ(-10px)" }}
                  />
                </div>
              </div>
            </div>

            {/* Text Content on the Right */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{book.title}</h1>
                <div className="flex flex-col space-y-2">
                  <p className="text-xl text-gray-700 font-medium">
                    by <span className="text-blue-600">{book.author}</span>
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {book.genre}
                    </span>
                    <span className="text-gray-500">Published {book.publishedYear}</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-gray max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">{book.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href={`/edit-book/${book._id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base font-medium border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 bg-transparent"
                  >
                    Edit Book
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="flex-1 h-12 text-base font-medium border-2 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 transition-all duration-200 bg-transparent"
                >
                  Delete Book
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
