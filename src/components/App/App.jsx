import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "../Header/Header";
import Map from "../Map/Map";
import Sidebar from "../Sidebar/Sidebar";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="app-container">
        <div className="map-area">
          <Map />
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default App;
