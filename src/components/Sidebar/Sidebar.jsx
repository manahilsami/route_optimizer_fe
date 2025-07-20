import "./Sidebar.css";
import { useEffect, useState } from "react";
import ItemCard from "./Itemcard/ItemCard";

function Sidebar() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const Data = [
      {
        name: "Cool Place",
        town: "Town Name",
        rating: 5.0,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
      },
      {
        name: "Cool Place",
        town: "Town Name",
        rating: 5.0,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
      },
      {
        name: "Cool Place",
        town: "Town Name",
        rating: 5.0,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
      },
      {
        name: "Cool Place",
        town: "Town Name",
        rating: 5.0,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
      },
      {
        name: "Cool Place",
        town: "Town Name",
        rating: 5.0,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
      },
      {
        name: "Cool Place",
        town: "Town Name",
        rating: 5.0,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
      },
    ];
    setPlaces(Data);
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__items">
          {places.map((place, index) => (
            <ItemCard key={index} place={place} />
          ))}
        </div>
        <div className="sidebar__bottom">
          <button className="make__route-btn"> Make Route</button>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
