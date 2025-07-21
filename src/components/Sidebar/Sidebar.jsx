import "./Sidebar.css";
import { useEffect, useState } from "react";
import ItemCard from "./Itemcard/ItemCard";

function Sidebar({ Data, likedPlaces, handleLike, handleMakeRoute }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    setPlaces(Data);
  }, [Data]);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__items">
          {places.map((place, index) => (
            <ItemCard
              key={index}
              place={place}
              onLike={handleLike}
              liked={likedPlaces.includes(place.name)}
            />
          ))}
        </div>
        <div className="sidebar__bottom">
          <button className="make__route-btn" onClick={handleMakeRoute}>
            {" "}
            Make Route
          </button>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
