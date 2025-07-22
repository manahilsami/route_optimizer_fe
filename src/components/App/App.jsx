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
    // First, get the route points coordinates for map display
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
          // Create markers for start and end points
          const markers = [
            {
              key: "start",
              position: { lat: data.data.start.lat, lng: data.data.start.lng },
              color: data.data.start.color,
              label: data.data.start.city
            },
            {
              key: "end", 
              position: { lat: data.data.end.lat, lng: data.data.end.lng },
              color: data.data.end.color,
              label: data.data.end.city
            }
          ];
          setMapMarkers(markers);
        }
      })
      .catch((error) => {
        console.error("Route points API error:", error);
      });

    // Then, get the attractions along the route
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
    console.log("Available sidebar data:", sidebarData.map(item => ({ name: item.name, id: item.id })));
    
    if (likedPlaces.length < 2) {
      alert(
        "Please select at least two places first by clicking the heart button!"
      );
      return;
    }

    // Extract location data from the liked attractions
    const locationData = likedPlaces.map(placeName => {
      // Find the attraction in sidebarData by name (try exact match first, then partial match)
      let attraction = sidebarData.find(attraction => attraction.name === placeName);
      
      if (!attraction) {
        // Try partial match if exact match fails
        attraction = sidebarData.find(attraction => 
          attraction.name.includes(placeName) || placeName.includes(attraction.name)
        );
      }
      
      console.log(`Looking for "${placeName}" in attractions:`, attraction);
      
      if (attraction && attraction.location) {
        // Create a unique key from the attraction name
        const key = attraction.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
        return {
          key: key,
          location: attraction.location
        };
      }
      return null;
    }).filter(location => location !== null);

    console.log("Location data for optimization:", locationData);
    console.log("JSON being sent:", JSON.stringify(locationData, null, 2));

    if (locationData.length < 2) {
      console.log("Failed to find valid location data. Available attractions:", sidebarData);
      alert("Could not find valid location data for selected attractions. Please try selecting different attractions.");
      return;
    }

    fetch(`${url}/optimize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(locationData),
    })
      .then(async (response) => {
        console.log("Response status:", response.status);
        console.log("Response headers:", Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        return response.json();
      })
      .then((data) => {
        console.log("Optimization response:", data);
        if (data.success) {
          setRoutePoints(data.data.optimized_route);
        } else {
          alert("Failed to optimize route: " + (data.message || "Unknown error"));
        }
      })
      .catch((err) => {
        console.error("API error:", err);
        alert("Failed to optimize route. Please try again.");
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
