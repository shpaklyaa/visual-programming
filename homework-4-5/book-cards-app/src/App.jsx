// src/App.js

import React, { useState, useEffect } from "react";
import BookCard from "./components/BookCard";
import SearchAndSort from "./components/SearchAndSort";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("title"); // Параметр сортировки (title или author)
  const [sortDirection, setSortDirection] = useState("asc"); // Направление сортировки (asc или desc)
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

    const currentSearchQuery = searchQuery; // Сохраняем текущее значение строки поиска

    const filtered = books.filter((book) => {
      console.log("Проверяем книгу:", book);

      // Проверяем совпадение в названии книги
      const titleMatch = typeof book.title === "string" &&
        book.title.toLowerCase().includes(currentSearchQuery.toLowerCase());

      console.log("Совпадение по названию:", titleMatch);

      // Проверяем совпадение в авторах
      let authorMatch = false;

      if (Array.isArray(book.authors)) {
        // Если authors — массив, проверяем каждый элемент
        authorMatch = book.authors.some((author) =>
          typeof author === "string" &&
          author.toLowerCase().includes(currentSearchQuery.toLowerCase())
        );
      } else if (typeof book.authors === "string") {
        // Если authors — строка, проверяем её напрямую
        authorMatch = book.authors.toLowerCase().includes(currentSearchQuery.toLowerCase());
      }

      console.log("Совпадение по автору:", authorMatch);

      return titleMatch || authorMatch;
    });

    console.log("Отфильтрованные книги:", filtered);

    setFilteredBooks(filtered);
  }, [books, searchQuery]);

  // Сортировка книг
  useEffect(() => {
    const sortedBooks = [...filteredBooks];

    if (sortField === "title") {
      sortedBooks.sort((a, b) =>
        a.title.localeCompare(b.title) * (sortDirection === "asc" ? 1 : -1)
      );
    } else if (sortField === "author") {
      sortedBooks.sort((a, b) =>
        (a.authors?.[0] || "").localeCompare(b.authors?.[0] || "") *
        (sortDirection === "asc" ? 1 : -1)
      );
    }

    setFilteredBooks(sortedBooks);
  }, [filteredBooks, sortField, sortDirection]);

  // Переключение направления сортировки
  const toggleSortDirection = () => {
    setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div>
      {/* Компонент поиска и сортировки */}
      <SearchAndSort
        onSearch={setSearchQuery}
        onSortChange={setSortField} // Устанавливаем поле сортировки
        onToggleSortDirection={toggleSortDirection} // Переключаем направление
      />

      {/* Отображение карточек книг */}
      <div className="container">
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