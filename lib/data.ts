interface Book {
  _id: string
  title: string
  author: string
  genre: string
  coverImageUrl?: string
  description: string
  publishedYear: number
}

// Shared in-memory storage
export const books: Book[] = [
  {
    _id: "1",
    title: "hasaan here",
    author: "hasaan",
    genre: "Fiction",
    description: "A great book about adventures.",
    publishedYear: 2023,
    coverImageUrl: "",
  },
  {
    _id: "2",
    title: "Test book",
    author: "Hassan",
    genre: "Non-fiction",
    description: "An informative book.",
    publishedYear: 2024,
    coverImageUrl: "",
  },
]

let nextId = 3

export function addBook(bookData: Omit<Book, "_id">): Book {
  const newBook: Book = {
    _id: nextId.toString(),
    ...bookData,
  }
  books.push(newBook)
  nextId++
  return newBook
}

export function updateBook(id: string, bookData: Partial<Omit<Book, "_id">>): Book | null {
  const bookIndex = books.findIndex((b) => b._id === id)

  if (bookIndex === -1) {
    return null
  }

  books[bookIndex] = { ...books[bookIndex], ...bookData }
  return books[bookIndex]
}

export function deleteBook(id: string): boolean {
  const bookIndex = books.findIndex((b) => b._id === id)

  if (bookIndex === -1) {
    return false
  }

  books.splice(bookIndex, 1)
  return true
}

export function getBook(id: string): Book | null {
  return books.find((b) => b._id === id) || null
}
