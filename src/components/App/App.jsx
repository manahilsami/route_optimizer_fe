import { useState } from "react";
<<<<<<< HEAD
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "../Header/Header";
import Map from "../Map/Map";
import Sidebar from "../Sidebar/Sidebar";

=======
>>>>>>> b16d4b65996453a6dca3b1bf0aef23919d3a795c
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";

function App() {
  return (
    <>
<<<<<<< HEAD
      <Header />
      <div className="app-container">
        <div className="map-area">
          <Map />
        </div>
        <Sidebar />
=======
      <div className="page">
        <div className="page__content">
          <Header />
          <Main />
        </div>
>>>>>>> b16d4b65996453a6dca3b1bf0aef23919d3a795c
      </div>
    </>
  );
}

export default App;
