"use client";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import HomeButton from "@/components/HomeButton";
import Link from "next/link";
import Image from "next/image";

const MapComponent = dynamic(() => import('@/components/Map'), {
    ssr: false,
    loading: () => (
        <div className="md:h-[80vh] h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
            <p className="text-white text-lg animate-pulse">Loading emergency map...</p>
        </div>
    )
});

export default function ReportPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-2 sm:p-6">
            {/* Header - Maintained exactly from Map.js */}
            <div className="flex items-center mb-4 mt-3 md:mb-1 md:mt-0 justify-between">
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
                        <div className="bg-gradient-to-r md:px-6 md:py-3 from-purple-600 to-blue-500 md:w-48 flex justify-center items-center p-2 rounded-xl cursor-pointer group">
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

            {/* Map Container with Suspense */}
            <Suspense fallback={
                <div className="h-[60vh] sm:h-[80vh] flex items-center justify-center">
                    <div className="text-white text-lg">Initializing crisis mapping system...</div>
                </div>
            }>

                <MapComponent />
            </Suspense>

            {/* Footer - Preserved exactly from original */}
            <footer className="text-center mt-6 text-gray-200">
                <h1 className="text-2xl sm:text-3xl md:hidden block font-bold md:mt-[1%] mt-[2%] text-center mb-4 text-white">
                    Report Map
                </h1>
                <p>© 2025 Report Map. All rights reserved.</p>
            </footer>
        </div>
    );
}