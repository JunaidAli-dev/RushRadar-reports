"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useSearchParams } from "next/navigation";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef, useMemo } from "react";
import CategoryIcon from "./CategoryIcon";
import RedIcon from "./Redicon";
import Greenicon from "./Greenicon";
import MapIcon from "./Mapicon";
import dynamic from "next/dynamic";

function SetCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (map && center) map.setView(center);
  }, [map, center]);
  return null;
}

const defaultCenter = { lat: 25.3176, lng: 82.9739 };

const MapComponent = () => {
  const searchParams = useSearchParams();
  const [reports, setReports] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const markerRef = useRef(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  const urlLat = searchParams?.get("lat");
  const urlLng = searchParams?.get("lng");
  const initialCenter =
    urlLat && urlLng && !isNaN(parseFloat(urlLat)) && !isNaN(parseFloat(urlLng))
      ? { lat: parseFloat(urlLat), lng: parseFloat(urlLng) }
      : defaultCenter;

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then(setReports)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getLocation = () => {
      if (urlLat && urlLng) {
        setUserLocation(initialCenter);
        setMarkerPosition(initialCenter);
        setLoadingLocation(false);
        return;
      }

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const newLocation = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            setUserLocation(newLocation);
            setMarkerPosition(newLocation);
            setLoadingLocation(false);
          },
          (error) => {
            console.error("Geolocation error:", error);
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
    };

    getLocation();
  }, [urlLat, urlLng]);

  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        if (!markerRef.current) return;
        if (!title.trim() || !description.trim()) {
          alert("Please fill title and description!");
          return;
        }

        try {
          const newPos = markerRef.current.getLatLng();
          const response = await fetch("/api/reports", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title,
              description,
              latitude: newPos.lat,
              longitude: newPos.lng,
              status: false,
              createdAt: new Date().toISOString(),
            }),
          });

          const newReport = await response.json();
          setReports((prev) => [...prev, newReport]);
          setTitle("");
          setDescription("");
        } catch (error) {
          console.error("Submission error:", error);
        }
      },
    }),
    [title, description]
  );

  if (typeof window === "undefined" || loadingLocation) {
    return (
      <div className="flex justify-center items-center h-[80vh] bg-gray-900">
        <p className="text-white text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={initialCenter}
      zoom={13}
      className="h-[60vh] sm:h-[80vh] w-full rounded-3xl shadow-2xl border-2 border-white/10"
    >
      <SetCenter center={userLocation || initialCenter} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {reports.map((report) => (
        <Marker
          key={report.id}
          position={[report.latitude, report.longitude]}
          icon={report.status ? Greenicon : RedIcon}
        >
          <Popup className="!min-w-[120px] max-w-[95vw] sm:max-w-[200px]">
            <div className="mb-0.5">
              <span className="text-xs font-semibold">
                {CategoryIcon && typeof CategoryIcon === "function"
                  ? CategoryIcon(report.title)
                  : ""}
                {report.title}
              </span>
            </div>
            <p className="text-[0.7rem] text-gray-600 mb-1 leading-tight break-words line-clamp-3">
              {report.description}
            </p>
            <div className="flex items-center justify-between">
              <span
                className={`text-[0.7rem] ${
                  report.status ? "text-green-500" : "text-red-600"
                }`}
              >
                {report.status ? "Resolved" : "Pending"}
              </span>
              <input
                type="checkbox"
                className="accent-green-500 cursor-pointer scale-50"
                checked={report.status}
                onChange={async () => {
                  try {
                    const res = await fetch("/api/reports", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        id: report.id,
                        status: !report.status,
                      }),
                    });
                    const updatedReports = await res.json();
                    setReports(updatedReports);
                  } catch (error) {
                    console.error("Update error:", error);
                  }
                }}
              />
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${report.latitude},${report.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-[0.7rem] font-semibold"
            >
              <div className="flex items-center gap-0.5">
                Directions <MapIcon size={12} />
              </div>
            </a>
          </Popup>
        </Marker>
      ))}

      <Marker
        draggable
        position={[markerPosition.lat, markerPosition.lng]}
        ref={markerRef}
        eventHandlers={eventHandlers}
      >
        <Popup className="!min-w-[120px] max-w-[95vw] sm:max-w-[200px]">
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-0.5 border rounded w-full mb-1 text-[0.7rem]"
          >
            <option value="">Type</option>
            <option value="Police">🚔 Police</option>
            <option value="Medical">🏥 Medical</option>
            <option value="Fire">🔥 Fire</option>
            <option value="Towing">🆘 Towing</option>
            <option value="Electric">💡 Electric</option>
            <option value="Construction">🚧 Construction</option>
          </select>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-0.5 border rounded w-full h-12 text-[0.7rem]"
          />
          <p className="text-[0.6rem] text-red-500 mt-0.5 leading-tight">
            Drag marker to adjust location!
          </p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });