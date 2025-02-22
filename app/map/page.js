"use client"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useSearchParams } from "next/navigation";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import CategoryIcon from "@/components/CategoryIcon";
import RedIcon from "@/components/Redicon";
import Greenicon from "@/components/Greenicon";
import MapIcon from "@/components/Mapicon";




<CategoryIcon />


const center = {
    lat: 25.3176,
    lng: 82.9739,
}

const Map = () => {
    const searchParams = useSearchParams();
    const [reports, setReports] = useState([]);
    const [position, setPosition] = useState(center);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const markerRef = useRef(null);


    //  Get coordinates from URL (if any)
    const urlLat = searchParams.get("lat");
    const urlLng = searchParams.get("lng");

    const initialCenter = urlLat && urlLng ? { lat: parseFloat(urlLat), lng: parseFloat(urlLng) } : center;

    // Fetch reports on mount
    useEffect(() => {
        fetch("/api/reports")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setReports(data)
            })
            .catch((err) => console.error("Error fetching reports:", err));
    }, []);


    const [isChecked, setisChecked] = useState(false);






    // Drag event handler
    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker) {
                const newPosition = marker.getLatLng();
                //  Prevent empty title/description submissions
                if (!title.trim() || !description.trim()) {
                    alert("Please enter a title and description before submitting.");
                    return;
                }

                setPosition(newPosition);

                //  Send the updated data to the backend
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
                        setReports([...reports, data]); // Add new marker as static
                        setTitle(""); // Reset title
                        setDescription(""); // Reset description
                        setPosition(center); // Reset position for new draggable marker
                    })
                    .catch((err) => console.error("Error updating marker:", err));
            }
        },
    }), [title, description, reports,]);

    return (
        <div className="p-3">

            <MapContainer center={[center.lat, center.lng]} zoom={13} className="h-[97vh] rounded-2xl w-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {reports.map((report) => (
                    <Marker icon={report.status ? Greenicon : RedIcon} key={report.id} position={[report.latitude, report.longitude]}>
                        <Popup>
                            <b>{CategoryIcon(report.title)} {report.title}</b> <br />
                            {report.description} <br />
                            <div className="flex items-center font-bold">
                                <span className={report.status ? "text-green-500" : "text-red-600"}>{report.status ? "Resolved" : "Not Resolved"}</span>

                            </div>
                           
                            {/* Add Google Maps direction link */}
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${report.latitude},${report.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-bold"
                            >
                                <div className="flex justify-center items-center gap-1">Get Directions <MapIcon size={18} /></div>
                            </a>
                        </Popup>
                    </Marker>
                ))}




            </MapContainer>
        </div>
    );
};

export default Map;

