// src/components/SearchAndSort.js

import React from "react";
import "./SearchAndSort.css";

const SearchAndSort = ({
  onSearch,
  onSortChange,
  onToggleSortDirection,
}) => {
  const handleSearchChange = (event) => {
    const value = event.target.value;
    console.log("Обновляем строку поиска:", value);
    onSearch(value);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    console.log("Обновляем параметр сортировки:", value);
    onSortChange(value); // Передаем выбранный параметр сортировки
  };

  const handleSortDirectionToggle = () => {
    console.log("Переключаем направление сортировки");
    onToggleSortDirection(); // Переключаем направление сортировки
  };

  return (
    <div className="search-and-sort-container">
      {/* Поиск */}
      <input
        type="text"
        placeholder="Поиск по названию или автору..."
        onChange={handleSearchChange}
        className="search-input"
      />

      {/* Выбор параметра сортировки */}
      <select onChange={handleSortChange} className="sort-select">
        <option value="title">Сортировать по названию</option>
        <option value="author">Сортировать по автору</option>
      </select>

      {/* Кнопка переключения направления сортировки */}
      <button onClick={handleSortDirectionToggle} className="toggle-sort-button">
        Переключить сортировку
      </button>
    </div>
  );
};

export default SearchAndSort;