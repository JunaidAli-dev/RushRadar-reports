"use client"; // Ensures this component runs only on the client side

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useSearchParams } from "next/navigation";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef, useMemo } from "react";
import CategoryIcon from "./CategoryIcon";
import RedIcon from "./Redicon";
import Greenicon from "./Greenicon";
import MapIcon from "./Mapicon";
import dynamic from "next/dynamic";

// Component to set the map's center
function SetCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center]);
  return null;
}

// Default center coordinates
const defaultCenter = {
  lat: 25.3176,
  lng: 82.9739,
};

// Main map component
const MapComponent = () => {
  const searchParams = useSearchParams();
  const [reports, setReports] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const markerRef = useRef(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Get coordinates from URL query parameters (if provided)
  const urlLat = searchParams.get("lat");
  const urlLng = searchParams.get("lng");
  const initialCenter = urlLat && urlLng
    ? { lat: parseFloat(urlLat), lng: parseFloat(urlLng) }
    : defaultCenter;

  // Fetch reports from the API when the component mounts
  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then(setReports)
      .catch(console.error);
  }, []);

  // Get the user's current location or use URL/default coordinates
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (urlLat && urlLng) {
      setUserLocation(initialCenter);
      setMarkerPosition(initialCenter);
      setLoadingLocation(false);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const newLocation = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          };
          setUserLocation(newLocation);
          setMarkerPosition(newLocation);
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setUserLocation(defaultCenter);
          setMarkerPosition(defaultCenter);
          setLoadingLocation(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setUserLocation(defaultCenter);
      setMarkerPosition(defaultCenter);
      setLoadingLocation(false);
    }
  }, [urlLat, urlLng]);

  // Event handlers for the draggable marker
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          const newPosition = marker.getLatLng();
          if (!title.trim() || !description.trim()) {
            if (typeof window !== "undefined") {
              window.alert("Please enter a title and description before submitting.");
            }
            return;
          }

          fetch("/api/reports", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title,
              description,
              latitude: newPosition.lat,
              longitude: newPosition.lng,
              status: false,
              createdAt: new Date().toISOString(),
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              setReports([...reports, data]);
              setTitle("");
              setDescription("");
              setMarkerPosition(userLocation || defaultCenter);
            })
            .catch(console.error);
        }
      },
    }),
    [title, description, reports, userLocation]
  );

  // Render a loading screen during SSR or while fetching location
  if (typeof window === "undefined" || loadingLocation) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <p className="text-lg text-gray-700">Loading map...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={initialCenter}
      zoom={13}
      className="h-[80vh] w-full rounded-3xl"
    >
      <SetCenter center={userLocation || initialCenter} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Display existing reports as markers */}
      {reports.map((report) => (
        <Marker
          icon={report.status ? Greenicon : RedIcon}
          key={report.id}
          position={[report.latitude, report.longitude]}
        >
          <Popup>
            <div className="mb-2">
              <b>
                {CategoryIcon(report.title)} {report.title}
              </b>
            </div>
            {report.description} <br />
            <div className="flex items-center font-bold">
              <span className={report.status ? "text-green-500" : "text-red-600"}>
                {report.status ? "Resolved" : "Not Resolved"}
              </span>
              <input
                type="checkbox"
                className="ml-2 accent-green-500 mt-3 mb-1 cursor-pointer"
                checked={report.status}
                onChange={async () => {
                  await fetch("/api/reports", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: report.id,
                      status: !report.status,
                    }),
                  })
                    .then((res) => res.json())
                    .then((updatedReports) => setReports(updatedReports))
                    .catch(console.error);
                }}
              />
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${report.latitude},${report.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold mt-1"
            >
              <div className="flex justify-center items-center gap-1">
                Get Directions <MapIcon size={18} />
              </div>
            </a>
          </Popup>
        </Marker>
      ))}

      {/* Draggable marker for new reports */}
      <Marker
        draggable
        position={[markerPosition.lat, markerPosition.lng]}
        ref={markerRef}
        eventHandlers={eventHandlers}
      >
        <Popup>
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-1 border rounded w-full"
          >
            <option value="">Select Category</option>
            <option value="Police">🚔 Police</option>
            <option value="Medical">🏥 Medical</option>
            <option value="Fire">🔥 Fire</option>
            <option value="Towing">🆘 Towing</option>
            <option value="Electric">💡 Electrical</option>
            <option value="Construction">🚧 Construction</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-1 border rounded w-full mt-1"
          />
          <br />
          <span className="font-bold">Drag and drop to set position!</span>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

// Export the component with SSR disabled
export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });