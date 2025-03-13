import React from "react";
import "./SearchAndSort.css";

const SearchAndSort = ({
  onSearch,
  onSortChange,
  onToggleSortDirection,
}) => {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  const handleSortChange = (event) => {
    onSortChange(event.target.value); // Передаем выбранный параметр сортировки
  };

  const handleSortDirectionToggle = () => {
    onToggleSortDirection(); // Переключаем направление сортировки
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

      {/* Выбор параметра сортировки */}
      <select
        onChange={handleSortChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
        }}
      >
        <option value="title">Сортировать по названию</option>
        <option value="author">Сортировать по автору</option>
      </select>

      {/* Кнопка переключения направления сортировки */}
      <button
        onClick={handleSortDirectionToggle}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "4px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Переключить сортировку
      </button>
    </div>
  );
};

export default SearchAndSort;