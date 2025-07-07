"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

interface Book {
  _id: string
  title: string
  author: string
  genre: string
  coverImageUrl?: string
  description: string
  publishedYear: number
}

export default function EditBook() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    coverImageUrl: "",
    description: "",
    publishedYear: new Date().getFullYear(),
  })

  useEffect(() => {
    if (params.id) {
      fetchBook(params.id as string)
    }
  }, [params.id])

  const fetchBook = async (id: string) => {
    try {
      const response = await fetch(`/api/books/${id}`)
      if (response.ok) {
        const book: Book = await response.json()
        setFormData({
          title: book.title,
          author: book.author,
          genre: book.genre,
          coverImageUrl: book.coverImageUrl || "",
          description: book.description,
          publishedYear: book.publishedYear,
        })
      }
    } catch (error) {
      console.error("Error fetching book:", error)
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/books/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push(`/book/${params.id}`)
      } else {
        alert("Error updating book")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error updating book")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "publishedYear" ? Number.parseInt(value) || 0 : value,
    }))
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Link href={`/book/${params.id}`} className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Book Details
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-center mb-8">Edit Book</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required className="mt-1" />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="genre">Genre</Label>
              <Input id="genre" name="genre" value={formData.genre} onChange={handleChange} required className="mt-1" />
            </div>

            <div>
              <Label htmlFor="coverImageUrl">Cover Image URL</Label>
              <Input
                id="coverImageUrl"
                name="coverImageUrl"
                value={formData.coverImageUrl}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="publishedYear">Published Year</Label>
              <Input
                id="publishedYear"
                name="publishedYear"
                type="number"
                value={formData.publishedYear}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
              {loading ? "Updating..." : "Update Book"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
