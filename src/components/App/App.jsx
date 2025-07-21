import { useState } from "react";
import Header from "../Header/Header";
import GoogleMap from "../Map/Map";
import Sidebar from "../Sidebar/Sidebar";
import "./App.css";
import { SidebarData as defaultSidebarData, url } from "../utils/constants";

function App() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [sidebarData, setSidebarData] = useState(defaultSidebarData);
  const [likedPlaces, setLikedPlaces] = useState([]);
  const [routePoints, setRoutePoints] = useState([]);

  const handleSearch = () => {
    fetch(
      `${url}/places?fromCity=${encodeURIComponent(
        fromCity
      )}&toCity=${encodeURIComponent(toCity)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setSidebarData(data))
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  const handleLike = (placeName) => {
    setLikedPlaces((prev) =>
      prev.includes(placeName)
        ? prev.filter((name) => name !== placeName)
        : [...prev, placeName]
    );
  };

  const handleMakeRoute = () => {
    console.log("Making route with liked places:", likedPlaces);
    if (likedPlaces.length < 2) {
      alert(
        "Please select at least two places first by clicking the heart button!"
      );
      return;
    }

    fetch(`${url}/optimize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location_ids: likedPlaces }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRoutePoints(data);
      })

      .catch((err) => {
        console.error("API error:", err);
      });
  };
  return (
    <>
      <Header
        fromCity={fromCity}
        toCity={toCity}
        setFromCity={setFromCity}
        setToCity={setToCity}
        onSearch={handleSearch}
      />
      <div className="app-container">
        <div className="map-area">
          <GoogleMap locations={routePoints} />
        </div>
        <Sidebar
          Data={sidebarData}
          likedPlaces={likedPlaces}
          handleLike={handleLike}
          handleMakeRoute={handleMakeRoute}
        />
      </div>
    </>
  );
}

export default App;
