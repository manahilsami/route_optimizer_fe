import { useState } from "react";
import Header from "../Header/Header";
import Map from "../Map/Map";
import Sidebar from "../Sidebar/Sidebar";
import "./App.css";
import Main from "../Main/Main";
import { SidebarData as defaultSidebarData, url } from "../utils/constants";

function App() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [sidebarData, setSidebarData] = useState(defaultSidebarData);

  const handleSearch = () => {
    fetch(
      `${url}/places?fromCity=${encodeURIComponent(
        fromCity
      )}&toCity=${encodeURIComponent(toCity)}`
    )
      .then((response) => response.json())
      .then((data) => setSidebarData(data))
      .catch((error) => {
        console.error("API error:", error);
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
          <Map />
        </div>
        <Sidebar Data={sidebarData} />
      </div>
    </>
  );
}

export default App;
