import React, { useState, useEffect } from "react";
import BookCard from "./components/BookCard";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для получения данных о книгах
  const fetchBooks = async () => {
    try {
      const response = await fetch("https://fakeapi.extendsclass.com/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books data");
      }
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Функция для получения обложки книги по ISBN
  const fetchBookCover = async (isbn) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      );
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      if (data.items && data.items[0].volumeInfo.imageLinks) {
        return data.items[0].volumeInfo.imageLinks.thumbnail;
      }
      return null;
    } catch (err) {
      console.error(`Failed to fetch cover for ISBN ${isbn}:`, err);
      return null;
    }
  };

  // Эффект для загрузки книг при монтировании компонента
  useEffect(() => {
    fetchBooks();
  }, []);

  // Эффект для загрузки обложек книг
  useEffect(() => {
    if (books.length > 0) {
      const fetchCovers = async () => {
        const updatedBooks = await Promise.all(
          books.map(async (book) => {
            const cover = await fetchBookCover(book.isbn);
            return { ...book, cover };
          })
        );
        setBooks(updatedBooks);
      };
      fetchCovers();
    }
  }, [books]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
      }}
    >
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          authors={book.authors}
          coverImage={book.cover}
        />
      ))}
    </div>
  );
};

export default App;