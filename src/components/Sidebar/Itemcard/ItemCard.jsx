import "./ItemCard.css";
import testImg from "../../../assets/11+Picture-Perfect+Views+of+the+Golden+Gate+Bridge+in+San+Francisco.jpg";

function ItemCard({ place, onLike, liked }) {
  const handleLikeClick = () => {
    onLike(place.name);
  };

  return (
    <div className="item-card">
      <img src={testImg} alt={place.name} className="item-card__img" />
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
