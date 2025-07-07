-- Create books table for MongoDB-like structure
-- This is a reference for the data structure used in the application

-- Book Schema:
-- {
--   _id: string (unique identifier)
--   title: string (required)
--   author: string (required)
--   genre: string (required)
--   coverImageUrl: string (optional)
--   description: string (required)
--   publishedYear: number (required)
--   createdAt: Date (auto-generated)
--   updatedAt: Date (auto-generated)
-- }

-- If using SQL database instead of MongoDB, use this table structure:
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    cover_image_url TEXT,
    description TEXT NOT NULL,
    published_year INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO books (title, author, genre, description, published_year) VALUES
('hasaan here', 'hasaan', 'Fiction', 'A great book about adventures.', 2023),
('Test book', 'Hassan', 'Non-fiction', 'An informative book.', 2024);
