import "./Map.css";
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

// Route distance display component
const RouteDistance = ({ points }) => {
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!points || points.length < 2) {
      setDistance(null);
      return;
    }

    setLoading(true);
    
    // Use Google Maps DirectionsService to get actual road distance
    const directionsService = new window.google.maps.DirectionsService();
    
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
        setLoading(false);
        if (status === window.google.maps.DirectionsStatus.OK) {
          // Convert meters to kilometers
          const totalDistance = result.routes[0].legs.reduce((total, leg) => {
            return total + leg.distance.value; // distance.value is in meters
          }, 0) / 1000; // Convert to kilometers
          
          setDistance(totalDistance);
        } else {
          console.error("Directions request failed due to " + status);
          setDistance(null);
        }
      }
    );
  }, [points]);

  if (!points || points.length < 2) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '6px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 1000,
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#2c3e50'
    }}>
      {loading ? (
        <span>🔄 Calculating route...</span>
      ) : distance ? (
        <span>🛣️ Route: {distance.toFixed(1)} km</span>
      ) : (
        <span>❌ Route calculation failed</span>
      )}
    </div>
  );
};

RouteDistance.propTypes = {
  points: PropTypes.array
};

// Route component that draws the route between points
const Route = ({ points }) => {
  const map = useMap();
  const directionsRendererRef = useRef(null);

  Route.propTypes = {
    points: PropTypes.array
  };

  useEffect(() => {
    if (!map || !points || !Array.isArray(points) || points.length < 2) return;

    const directionsService = new window.google.maps.DirectionsService();

    if (!directionsRendererRef.current) {
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
        preserveViewport: true,
      });
      directionsRendererRef.current.setMap(map);
    } else {
      directionsRendererRef.current.setDirections({ routes: [] });
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

// PoiMarkers component for attraction markers
const PoiMarkers = ({ locations }) => {
  if (!locations || locations.length === 0) return null;

  return locations.map((location, index) => (
    <AdvancedMarker
      key={location.key || index}
      position={location.location}
      title={location.key || `Attraction ${index + 1}`}
    >
      <Pin
        background="#FF6B6B"
        borderColor="#E53E3E"
        glyphColor="#FFFFFF"
      />
    </AdvancedMarker>
  ));
};

PoiMarkers.propTypes = {
  locations: PropTypes.array
};

// RouteMarkers component for start/end points
const RouteMarkers = ({ markers }) => {
  if (!markers || markers.length === 0) return null;

  return markers.map((marker) => (
    <AdvancedMarker
      key={marker.key}
      position={marker.position}
      title={marker.label}
    >
      <Pin
        background={marker.color === 'blue' ? "#4285F4" : "#34A853"}
        borderColor={marker.color === 'blue' ? "#1A73E8" : "#137333"}
        glyphColor="#FFFFFF"
      />
    </AdvancedMarker>
  ));
};

RouteMarkers.propTypes = {
  markers: PropTypes.array
};

function GoogleMap({ locations = [], markers = [] }) {
  // Default center (California)
  const defaultCenter = { lat: 36.7783, lng: -119.4179 };
  
  // Calculate bounds if we have data
  let center = defaultCenter;
  let zoom = 6;
  
  if (markers.length > 0 || locations.length > 0) {
    const allPoints = [...markers, ...locations];
    const lats = allPoints.map(point => point.position?.lat || point.location?.lat).filter(Boolean);
    const lngs = allPoints.map(point => point.position?.lng || point.location?.lng).filter(Boolean);
    
    if (lats.length > 0 && lngs.length > 0) {
      center = {
        lat: (Math.min(...lats) + Math.max(...lats)) / 2,
        lng: (Math.min(...lngs) + Math.max(...lngs)) / 2
      };
      zoom = 8;
    }
  }

  return (
    <div className="map-container">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"}>
        <Map
          center={center}
          zoom={zoom}
          mapId="DEMO_MAP_ID"
          style={{ width: "100%", height: "100%" }}
        >
          <RouteMarkers markers={markers} />
          <PoiMarkers locations={locations} />
          <Route points={locations} />
          <RouteDistance points={locations} />
        </Map>
      </APIProvider>
    </div>
  );
}

GoogleMap.propTypes = {
  locations: PropTypes.array,
  markers: PropTypes.array
};

export default GoogleMap;
