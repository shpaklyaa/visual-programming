import React, { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import SearchAndSort from "./components/SearchAndSort";
import './App.css';

const API_BOOKS = "https://fakeapi.extendsclass.com/books";
const API_COVER = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetch(API_BOOKS)
      .then((res) => res.json())
      .then(async (data) => {
        const booksWithCovers = await Promise.all(
          data.map(async (book) => {
            const cover = await fetchCover(book.isbn);
            return { ...book, cover };
          })
        );
        setBooks(booksWithCovers);
        setFilteredBooks(booksWithCovers); // Инициализируем отфильтрованный список
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const fetchCover = async (isbn) => {
    try {
      const res = await fetch(`${API_COVER}${isbn}`);
      const data = await res.json();
      return data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail || "no-cover.png";
    } catch {
      return "no-cover.png";
    }
  };

  return (
    <div className="app-container">
      <h1>Book List</h1>
      <SearchAndSort books={books} setFilteredBooks={setFilteredBooks} />
      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              authors={book.authors}
              cover={book.cover}
            />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default App;