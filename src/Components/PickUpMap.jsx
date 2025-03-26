// import React, { useState } from "react";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix default marker issue in React Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// const PickUpMap = ({ tourPickUp, setTourPickUp }) => {
//   const [position, setPosition] = useState([tourPickUp.lat, tourPickUp.lng]);

//   // Handle map clicks to set new pickup location
//   const LocationMarker = () => {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setPosition([lat, lng]); // Update state
//         setTourPickUp((prev) => ({
//           ...prev,
//           lat,
//           lng,
//           pick_up_map: `https://www.google.com/maps?q=${lat},${lng}`, // Google Maps link
//         }));
//       },
//     });

//     return position ? <Marker position={position} /> : null;
//   };

//   return (
//     <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <LocationMarker />
//     </MapContainer>
//   );
// };

// export default PickUpMap;


// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix default marker issue in React Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

// const PickUpMap = ({ tourPickUp, setTourPickUp }) => {
//   const [position, setPosition] = useState([tourPickUp.lat, tourPickUp.lng]);

//   // Function to move the map view when lat/lng changes
//   const ChangeView = ({ coords }) => {
//     const map = useMap();
//     useEffect(() => {
//       map.setView(coords, 13, { animate: true });
//     }, [coords, map]);
//     return null;
//   };

//   // Handle map clicks to set new pickup location
//   const LocationMarker = () => {
//     useMapEvents({
//       click(e) {
//         const { lat, lng } = e.latlng;
//         setPosition([lat, lng]); // Update local position state
//         setTourPickUp((prev) => ({
//           ...prev,
//           lat,
//           lng,
//           pick_up_map: `https://www.google.com/maps?q=${lat},${lng}`, // Google Maps link
//         }));
//       },
//     });

//     return position ? <Marker position={position} /> : null;
//   };

//   // Update position if tourPickUp changes (e.g., user enters a Google Maps link)
//   useEffect(() => {
//     setPosition([tourPickUp.lat, tourPickUp.lng]);
//   }, [tourPickUp.lat, tourPickUp.lng]);

//   return (
//     <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
//       <ChangeView coords={position} />
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <LocationMarker />
//       <Marker position={position} />
//     </MapContainer>
//   );
// };

// export default PickUpMap;



import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const PickUpMap = ({ tourPickUp, setTourPickUp }) => {
  const defaultPosition = [31.2001, 29.9187]; // Default to Alexandria, Egypt
  const [position, setPosition] = useState(tourPickUp.lat && tourPickUp.lng ? [tourPickUp.lat, tourPickUp.lng] : defaultPosition);

  // Function to validate and extract lat/lng from Google Maps URL
  const extractLatLng = (url) => {
    const match = url.match(/q=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
    }
    return null; // Invalid input
  };

  // Function to geocode text address using Nominatim API
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
    return null; // Return null if geocoding fails
  };

  // Update position when pick_up_map changes
  useEffect(() => {
    const updatePosition = async () => {
      const { pick_up_map } = tourPickUp;
      if (!pick_up_map) return; // Ignore empty input

      const googleCoords = extractLatLng(pick_up_map);
      if (googleCoords) {
        // If valid Google Maps URL
        setPosition([googleCoords.lat, googleCoords.lng]);
        setTourPickUp((prev) => ({
          ...prev,
          lat: googleCoords.lat,
          lng: googleCoords.lng,
        }));
      } else {
        // If text address, try geocoding
        const geocodedCoords = await geocodeAddress(pick_up_map);
        if (geocodedCoords) {
          setPosition([geocodedCoords.lat, geocodedCoords.lng]);
          setTourPickUp((prev) => ({
            ...prev,
            lat: geocodedCoords.lat,
            lng: geocodedCoords.lng,
          }));
        } else {
          console.warn("Invalid address, location not found.");
        }
      }
    };
    updatePosition();
  }, [tourPickUp.pick_up_map, setTourPickUp]);

  // Move map view when position changes
  const ChangeView = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
      if (coords[0] !== undefined && coords[1] !== undefined) {
        map.setView(coords, 13, { animate: true });
      }
    }, [coords, map]);
    return null;
  };

  // Handle map clicks to set new pickup location
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setTourPickUp((prev) => ({
          ...prev,
          lat,
          lng,
          pick_up_map: `https://www.google.com/maps?q=${lat},${lng}`,
        }));
      },
    });
    return <Marker position={position} />;
  };

  return (
    <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
      <ChangeView coords={position} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
      <Marker position={position} />
    </MapContainer>
  );
};

export default PickUpMap;

