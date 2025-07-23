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
  const [mapMarkers, setMapMarkers] = useState([]);

  const handleSearch = () => {
    fetch(
      `${url}/route-points?fromCity=${encodeURIComponent(
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
      .then((data) => {
        if (data.success) {
          const markers = [
            {
              key: "start",
              position: { lat: data.data.start.lat, lng: data.data.start.lng },
              color: data.data.start.color,
              label: data.data.start.city,
            },
            {
              key: "end",
              position: { lat: data.data.end.lat, lng: data.data.end.lng },
              color: data.data.end.color,
              label: data.data.end.city,
            },
          ];
          setMapMarkers(markers);
        }
      })
      .catch((error) => {
        console.error("Route points API error:", error);
      });

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
      .then((data) => {
        if (data.success) {
          setSidebarData(data.data.attractions);
        } else {
          setSidebarData([]);
        }
      })
      .catch((error) => {
        console.error("Places API error:", error);
        setSidebarData([]);
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

    fetch(`${url}/quick-optimize?`, {
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
          <GoogleMap locations={routePoints} markers={mapMarkers} />
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
