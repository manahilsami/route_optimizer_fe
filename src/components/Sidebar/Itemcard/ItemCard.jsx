import "./ItemCard.css";
import { useState } from "react";

function ItemCard({ place, onLike, liked }) {
  const [imageError, setImageError] = useState(false);

  const handleLikeClick = () => {
    onLike(place.name);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="item-card">
      {!place.image || imageError ? (
        <div className="item-card__img item-card__img--error">
          <span>No Image</span>
        </div>
      ) : (
        <img
          src={place.image}
          alt={place.name}
          className="item-card__img"
          onError={handleImageError}
        />
      )}
      <div className="info">
        <h3 className="item-card__name">{place.name}</h3>
        <p className="item-card__town">{place.town}</p>
        <p className="item-card__rating">⭐ {place.rating}</p>
      </div>

      <button
        className={`item-card__button ${liked ? "liked" : ""}`}
        onClick={handleLikeClick}
      ></button>
    </div>
  );
}

export default ItemCard;
