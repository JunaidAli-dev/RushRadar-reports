"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
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
        <div className={`container mx-auto p-4 ${isClient ? "md:bg-gray-800 w-full  h-[88vh] m-auto mt-[3%]" : ""}`}>
            <h2 className="text-2xl font-bold mb-4">Submitted Reports</h2>
            
            {reports.length === 0 ? (
                <p>No reports found.</p>
            ) : (
                <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                    <thead>
                        <tr className="bg-[#2796f0] text-white">
                            <th className="border border-gray-300 px-2 md:px-4 py-2">S.No.</th>
                            <th className="border border-gray-300 px-2 md:px-4 py-2">Title</th>
                            <th className="border border-gray-300 px-2 md:px-4 py-2">Description</th>
                            <th className="border border-gray-300 px-2 md:px-4 py-2">Latitude</th>
                            <th className="border border-gray-300 px-2 md:px-4 py-2">Longitude</th>
                            <th className="border border-gray-300 px-2 md:px-4 py-2">Action</th>
                            <th className="border border-gray-300 px-2 md:px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={report.id} className="text-center text-black odd:bg-gray-100 even:bg-gray-200">
                                <td className="border border-gray-300 px-2 md:px-4 py-2 font-bold">{report.id}</td>
                                <td className="border border-gray-300 px-2 md:px-4 py-2">{report.title}</td>
                                <td className="border border-gray-300 px-2 md:px-4 py-2">{report.description}</td>
                                <td className="border border-gray-300 px-2 md:px-4 py-2">{report.latitude}</td>
                                <td className="border border-gray-300 px-2 md:px-4 py-2">{report.longitude}</td>
                                <td className="border border-gray-300 px-2 md:px-4 py-2">
                                    <Link
                                        href={`/map?lat=${report.latitude}&lng=${report.longitude}`}
                                        className="text-blue-500 underline"
                                    >
                                        View on Map
                                    </Link>
                                </td>
                                <td className="border border-gray-300 px-2 md:px-4 py-2">
                                    {report.status ? (
                                        <div className="text-green-500 font-bold">Resolved</div>
                                    ) : (
                                        <div className="text-red-600 font-bold">Not resolved</div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
};

export default Reports;
