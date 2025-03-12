import React from "react";

const SearchAndSort = ({ onSearch, onSortChange }) => {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      {/* Поиск */}
      <input
        type="text"
        placeholder="Поиск по названию или автору..."
        onChange={handleSearchChange}
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "16px",
          borderRadius: "4px",
        }}
      />

      {/* Сортировка */}
      <select
        onChange={handleSortChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
        }}
      >
        <option value="title-asc">Сортировать по названию (A-Z)</option>
        <option value="title-desc">Сортировать по названию (Z-A)</option>
        <option value="author-asc">Сортировать по автору (A-Z)</option>
        <option value="author-desc">Сортировать по автору (Z-A)</option>
      </select>
    </div>
  );
};

export default SearchAndSort;