// src/App.js

import React, { useState, useEffect } from "react";
import BookCard from "./components/BookCard";
import SearchAndSort from "./components/SearchAndSort";

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("title-asc");
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
      setFilteredBooks(data); // Инициализируем отфильтрованный список
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
        setFilteredBooks(updatedBooks); // Обновляем отфильтрованный список
      };
      fetchCovers();
    }
  }, [books]);

  // Фильтрация книг по строке поиска
  useEffect(() => {
    console.log("Текущие книги:", books);
    console.log("Строка поиска:", searchQuery);

    const filtered = books.filter((book) => {
      console.log("Проверяем книгу:", book);

      // Проверяем совпадение в названии книги
      const titleMatch = typeof book.title === "string" &&
        book.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Проверяем совпадение в авторах
      let authorMatch = false;

      if (book.authors) {
        if (Array.isArray(book.authors) && book.authors.length > 0) {
          authorMatch = book.authors.some((author) =>
            typeof author === "string" &&
            author.toLowerCase().includes(searchQuery.toLowerCase())
          );
        } else if (typeof book.authors === "string") {
          authorMatch = book.authors.toLowerCase().includes(searchQuery.toLowerCase());
        }
      }

      console.log(
        `Книга "${book.title}" подходит по поиску:`,
        titleMatch || authorMatch
      );

      return titleMatch || authorMatch;
    });

    setFilteredBooks(filtered);
  }, [books, searchQuery]);

  // Сортировка книг
  useEffect(() => {
    const sortedBooks = [...filteredBooks];

    if (sortOption === "title-asc") {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "title-desc") {
      sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "author-asc") {
      sortedBooks.sort((a, b) =>
        (a.authors?.[0] || "").localeCompare(b.authors?.[0] || "")
      );
    } else if (sortOption === "author-desc") {
      sortedBooks.sort((a, b) =>
        (b.authors?.[0] || "").localeCompare(a.authors?.[0] || "")
      );
    }

    setFilteredBooks(sortedBooks);
  }, [filteredBooks, sortOption]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Компонент поиска и сортировки */}
      <SearchAndSort
        onSearch={setSearchQuery}
        onSortChange={setSortOption}
      />

      {/* Отображение карточек книг */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredBooks.length === 0 ? (
          <div style={{ textAlign: "center", color: "#666" }}>
            Ничего не найдено
          </div>
        ) : (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              authors={book.authors}
              coverImage={book.cover}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;