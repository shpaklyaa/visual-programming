import React, { useState } from "react";
import "./SearchAndSort.css"

const SearchAndSort = ({ books, setFilteredBooks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.authors.some((author) => author.toLowerCase().includes(term))
    );
    setFilteredBooks(filtered);
  };

  const handleSort = () => {
    const sortedBooks = [...books].sort((a, b) => {
      const fieldA = a[sortField].toString().toLowerCase();
      const fieldB = b[sortField].toString().toLowerCase();

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredBooks(sortedBooks);
  };

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    handleSort();
  };

  return (
    <div className="search-and-sort">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <select value={sortField} onChange={handleSortFieldChange}>
        <option value="title">Sort by Title</option>
        <option value="authors">Sort by Author</option>
      </select>
      <button onClick={handleSortOrderChange}>
        Sort {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>
    </div>
  );
};

export default SearchAndSort;