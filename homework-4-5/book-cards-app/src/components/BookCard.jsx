import React from "react";
import "./BookCard.css"; // Импорт стилей

const BookCard = ({ title, authors, coverImage }) => {
  return (
    <div className="book-card">
      {coverImage ? (
        <img
          src={coverImage}
          alt={title}
          className="book-card-image"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/150x200?text=No+Cover"; // Placeholder для пропущенных изображений
          }}
        />
      ) : (
        <div className="no-cover-placeholder">No Cover</div>
      )}

      <h3 className="book-card-title">{title}</h3>

      <p className="book-card-authors">{authors.join(", ")}</p>
    </div>
  );
};

export default BookCard;