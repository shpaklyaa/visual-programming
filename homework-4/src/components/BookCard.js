import React from "react";

const BookCard = ({ title, authors, coverImage }) => {
  return (
    <div
      style={{
        width: "200px",
        margin: "10px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        display: "inline-block",
        textAlign: "center",
        verticalAlign: "top",
      }}
    >
      {/* Обложка книги */}
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          style={{ width: "150px", height: "200px", objectFit: "cover" }}
        />
      )}
      {/* Название книги */}
      <h3 style={{ marginTop: "10px", fontSize: "18px" }}>{title}</h3>
      {/* Авторы книги */}
      <p style={{ fontSize: "14px", color: "#666" }}>
        {authors.join(", ")}
      </p>
    </div>
  );
};

export default BookCard;