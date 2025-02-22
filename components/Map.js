"use client"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useSearchParams } from "next/navigation";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef, useMemo } from "react";
import CategoryIcon from "./CategoryIcon";
import RedIcon from "./Redicon";
import Greenicon from "./Greenicon";
import MapIcon from "./Mapicon";

function SetCenter({ center }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center]);
    return null;
}

const defaultCenter = {
    lat: 25.3176,
    lng: 82.9739,
}

const Map = () => {
    const searchParams = useSearchParams();
    const [reports, setReports] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(defaultCenter);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const markerRef = useRef(null);
    const [loadingLocation, setLoadingLocation] = useState(true);

    // Get coordinates from URL (if any)
    const urlLat = searchParams.get("lat");
    const urlLng = searchParams.get("lng");
    const initialCenter = urlLat && urlLng ? { 
        lat: parseFloat(urlLat), 
        lng: parseFloat(urlLng) 
    } : defaultCenter;

    // Fetch reports on mount
    useEffect(() => {
        fetch("/api/reports")
            .then((res) => res.json())
            .then(setReports)
            .catch(console.error);
    }, []);

    // Get user's current location
    useEffect(() => {
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

    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker) {
                const newPosition = marker.getLatLng();
                if (!title.trim() || !description.trim()) {
                    alert("Please enter a title and description before submitting.");
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
    }), [title, description, reports, userLocation]);

    if (loadingLocation) return <div>Loading map...</div>;

    return (
        <div>
            <MapContainer 
                center={initialCenter} 
                zoom={13} 
                className="h-[80vh] w-full rounded-3xl"
            >
                <SetCenter center={userLocation || initialCenter} />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {reports.map((report) => (
                    <Marker
                        icon={report.status ? Greenicon : RedIcon}
                        key={report.id}
                        position={[report.latitude, report.longitude]}
                    >
                        <Popup>
                            <b>{CategoryIcon(report.title)} {report.title}</b> <br />
                            {report.description} <br />
                            <div className="flex items-center font-bold">
                                <span className={report.status ? "text-green-500" : "text-red-600"}>
                                    {report.status ? "Resolved" : "Not Resolved"}
                                </span>
                                <input
                                    type="checkbox"
                                    className="ml-2 accent-green-500"
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
                                            .then(setReports)
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
                                    Get Directions <MapIcon size={18}/>
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
                            <option value="Towing">🚘🆘 Towing</option>
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
        </div>
    );
};

export default Map;