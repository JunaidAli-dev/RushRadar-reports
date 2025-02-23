"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";
import MapIcon from "@/components/Mapicon";
import HomeButton from "@/components/HomeButton";
import AboutButton from "@/components/AboutButton";

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
        <div className="container mx-auto p-4 bg-gradient-to-br from-gray-800 to-gray-900 w-full min-h-[85vh] mt-[1%] rounded-2xl shadow-xl">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
                <div className="flex justify-between items-center">
                    <HomeButton />
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white pt-6">
                        Submitted Reports
                        <div className="mx-auto mt-2 w-24 h-1 bg-blue-500 rounded-full"></div>
                    </h2>
                    <AboutButton />
                </div>

                {reports.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="inline-block p-4 bg-gray-700 rounded-lg">
                            <span className="text-gray-300 text-lg">📭 No reports found</span>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto mt-[2%] overflow-y-auto h-[75vh] custom-scrollbar">
                        {/* Desktop Table */}
                        <table className="hidden md:table w-full border-collapse">
                            <thead className="sticky top-0">
                                <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                                    <th className="px-4 py-3 text-left rounded-l-xl">S.No</th>
                                    <th className="px-4 py-3 text-left">Issue</th>
                                    <th className="px-4 py-3 text-left">Details</th>
                                    <th className="px-4 py-3 text-left">Date & Time</th>
                                    <th className="px-4 py-3">Location</th>
                                    <th className="px-4 py-3 rounded-r-xl">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr
                                        key={report.id}
                                        className="transition-all duration-200 hover:bg-gray-700/30 even:bg-gray-800/20"
                                    >
                                        <td className="px-4 py-3 text-gray-200 font-medium">
                                            {report.id}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="text-blue-400">
                                                    {CategoryIcon(report.title)}
                                                </div>
                                                <span className="text-gray-100 font-medium">
                                                    {report.title}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 w-[40vw]">
                                            <div className="text-gray-300 text-sm line-clamp-30">
                                                {report.description}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-300 text-sm">
                                            {new Date(report.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <Link
                                                href={`/map?lat=${report.latitude}&lng=${report.longitude}`}
                                                className="inline-flex items-center justify-center p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors group"
                                            >
                                                <MapIcon className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                                                <span className="ml-2 text-sm text-blue-300 group-hover:text-blue-200">
                                                    View
                                                </span>
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                report.status
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-red-500/20 text-red-400"
                                                }`}
                                            >
                                                {report.status ? "Resolved" : "Pending"}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Mobile Cards */}
                        <div className="md:hidden space-y-4">
                            {reports.map((report) => (
                                <div
                                    key={report.id}
                                    className="bg-gray-700/30 rounded-lg p-4 shadow-sm"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-2">
                                            {CategoryIcon(report.title)}
                                            <span className="text-gray-100 ml-2 font-medium">
                                                {report.id} {report.title}
                                            </span>
                                        </div>
                                        <div className={`text-xs px-2 py-1 rounded-full ${
                                            report.status
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-red-500/20 text-red-400"
                                            }`}
                                        >
                                            {report.status ? "Resolved" : "Pending"}
                                        </div>
                                    </div>
                                    <div className="text-gray-300 text-sm mb-2 line-clamp-40">
                                        {report.description}
                                    </div>
                                    <div className="text-gray-400 text-xs mb-3">
                                        {new Date(report.createdAt).toLocaleString()}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={`/map?lat=${report.latitude}&lng=${report.longitude}`}
                                            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            <MapIcon className="w-5 h-5" />
                                            <span className="text-sm">View Location</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.1);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.2);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.3);
                }
                @media (max-width: 767px) {
                    .container {
                        margin-top: 1rem;
                        border-radius: 1rem;
                        padding: 1rem;
                    }
                    h2 {
                        font-size: 1.5rem;
                        padding-top: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Reports;