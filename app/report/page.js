// "use client"
// import { useState } from "react";
// import axios from "axios";

// export default function Report() {
//   const [report, setReport] = useState({ title: "", description: "",latitude: 25.3176, longitude: 82.9739 });
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("")
    
//     try {
//       const response = await fetch("/api/reports", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(report),
//       });
  
//       const data = await response.json();

//       if (response.ok) {
//          alert("✅ Report Submitted Successfully!");
//         // Clear input fields
//         setReport({ title: "", description: "", latitude: 25.3176, longitude: 82.9739 }); // Clear form

//       } else {
//         alert("❌ Error: " + data.error);
//       }
//     } catch (error) {
//       console.error("Error submitting report:", error);
//       alert("An error occurred.");
//     }
//   };
  
  
  

//   return (
//     <div className="flex flex-col items-center p-4">
//       <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>
//       <form className="w-full max-w-md" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter location"
//           value={report.title || ""}
//           className="w-full p-2 border text-black rounded mb-2"
//           onChange={(e) => setReport({ ...report, title: e.target.value })}
          
//         />
//         <textarea
//           placeholder="Describe the issue"
//           value={report.description || ""}
//           className="w-full p-2 border text-black rounded mb-2"
//           onChange={(e) => setReport({ ...report, description: e.target.value })}
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//           Submit Report
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import Link from "next/link"; // ✅ Import Link to navigate

const Reports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await fetch("/api/reports");
            const data = await res.json();
            setReports(data);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Submitted Reports</h2>
            
            {reports.length === 0 ? (
                <p>No reports found.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#2796f0]">
                            <th className="border border-gray-300 px-4 py-2">Title</th>
                            <th className="border border-gray-300 px-4 py-2">Description</th>
                            <th className="border border-gray-300 px-4 py-2">Latitude</th>
                            <th className="border border-gray-300 px-4 py-2">Longitude</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{report.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{report.description}</td>
                                <td className="border border-gray-300 px-4 py-2">{report.latitude}</td>
                                <td className="border border-gray-300 px-4 py-2">{report.longitude}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link
                                        href={`/map?lat=${report.latitude}&lng=${report.longitude}`}
                                        className="text-blue-500 underline"
                                    >
                                        View on Map
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Reports;
