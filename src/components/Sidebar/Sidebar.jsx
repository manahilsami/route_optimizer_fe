import "./Sidebar.css";
import { useEffect, useState } from "react";
import ItemCard from "./Itemcard/ItemCard";

function Sidebar({ Data }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    setPlaces(Data);
  }, [Data]);

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
