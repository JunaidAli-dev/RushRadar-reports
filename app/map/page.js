"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useSearchParams } from "next/navigation";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef, useMemo } from "react";
import CategoryIcon from "@/components/CategoryIcon";
import RedIcon from "@/components/Redicon";
import Greenicon from "@/components/Greenicon";
import MapIcon from "@/components/Mapicon";
import HomeButton from "@/components/HomeButton";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Component to set the map center
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

// Fix for SSR
const MapContent = () => {
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

    // Event handlers for marker drag
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

    if (typeof window === "undefined" || loadingLocation) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
                <p className="text-lg text-gray-700">Loading map...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-2 sm:p-6">
            {/* Header */}
            <div className="flex items-center mb-[2px] justify-between ">
                <div className="flex items-center gap-4">
                    <Link href="/" className="hover:scale-105 transition-transform duration-200">
                        <Image
                            src="/Mainlogo.jpeg"
                            alt="MyLogo"
                            width={45}
                            height={45}
                            className="rounded-full bg-white p-[1px] shadow-lg"
                        />
                    </Link>
                    <Link href="/" className="hover:scale-105 transition-transform duration-200">
                        <div className="bg-gradient-to-r  md:px-6 md:py-3 from-purple-600 to-blue-500 md:w-48 flex justify-center items-center p-2 rounded-xl cursor-pointer group">
                            <h1 className="md:text-2xl font-bold text-sm text-white tracking-wide transform group-hover:scale-110 transition-transform">
                                RushRadar
                            </h1>
                            <span className="ml-2 text-xs text-white opacity-80 group-hover:opacity-100">Reports</span>
                        </div>
                    </Link>
                </div>

                <h1 className="text-2xl sm:text-3xl mr-[7vw] hidden md:block font-bold md:mt-[1%] mt-[2%] text-center mb-4 text-white">
                    Report Map
                </h1>
                <HomeButton />
            </div>

            {/* Map Container */}
            <MapContainer
                center={initialCenter}
                zoom={13}
                className="h-[60vh] sm:h-[80vh] w-full rounded-3xl shadow-2xl border-2 border-gray-200"
            >
                <SetCenter center={userLocation || initialCenter} />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Display Reports as Markers */}
                {reports.map((report) => (
                    <Marker
                        icon={report.status ? Greenicon : RedIcon}
                        key={report.id}
                        position={[report.latitude, report.longitude]}
                    >
                        <Popup>
                            <div className="p-2">
                                <div className="flex items-center gap-2">
                                    {CategoryIcon(report.title)}
                                    <b className="text-lg">{report.title}</b>
                                </div>
                                <p className="text-gray-600 mt-2">{report.description}</p>
                                <div className="flex items-center mt-2">
                                    <span className={`font-bold ${report.status ? "text-green-500" : "text-red-600"}`}>
                                        {report.status ? "Resolved" : "Not Resolved"}
                                    </span>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${report.latitude},${report.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 font-bold"
                                >
                                    Get Directions <MapIcon size={18} className="ml-1" />
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Draggable Marker */}
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

            {/* Footer */}
            <footer className="text-center mt-6 text-gray-200">
                <h1 className="text-2xl sm:text-3xl md:hidden block font-bold md:mt-[1%] mt-[2%] text-center mb-4 text-white">
                    Report Map
                </h1>
                <p>© 2025 Report Map. All rights reserved.</p>
            </footer>
        </div>
    );
};

// Export with SSR disabled
const Map = dynamic(() => Promise.resolve(MapContent), { ssr: false });
export default Map;