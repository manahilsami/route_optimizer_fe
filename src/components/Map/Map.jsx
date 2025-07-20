import { useEffect, useRef } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";

import "./Map.css";

const center = { lat: 33.8121, lng: -117.919 }; // Disneyland

const locations = [
  { key: "operaHouse", location: { lat: 33.8121, lng: -117.919 } },
  { key: "tarongaZoo", location: { lat: 27.992, lng: -81.695 } },
  { key: "manlyBeach", location: { lat: 27.995, lng: -81.689 } },
];

const PoiMarkers = ({ pois }) => {
  return (
    <>
      {pois.map((poi) => (
        <AdvancedMarker key={poi.key} position={poi.location}>
          <Pin className="pin" />
        </AdvancedMarker>
      ))}
    </>
  );
};

const Route = ({ points }) => {
  const map = useMap();
  const directionsRendererRef = useRef(null);

  useEffect(() => {
    if (!map || points.length < 2) return;

    const directionsService = new window.google.maps.DirectionsService();
    if (!directionsRendererRef.current) {
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer(
        {
          suppressMarkers: true,
          preserveViewport: true,
        }
      );
      directionsRendererRef.current.setMap(map);
    }

    const waypoints = points.slice(1, -1).map((point) => ({
      location: point.location,
      stopover: true,
    }));

    directionsService.route(
      {
        origin: points[0].location,
        destination: points[points.length - 1].location,
        waypoints: waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRendererRef.current.setDirections(result);
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  }, [map, points]);

  return null;
};

function GoogleMap() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="map-container">
        <Map
          className="map"
          defaultZoom={6}
          defaultCenter={center}
          mapId="DEMO_MAP_ID"
        >
          <PoiMarkers pois={locations} />
          <Route points={locations} />
        </Map>
      </div>
    </APIProvider>
  );
}

export default GoogleMap;
