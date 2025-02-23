"use client"
import AboutButton from "@/components/AboutButton";
import Map from "@/components/Map";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full p-4 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-6 backdrop-blur-sm bg-gray-900/80 rounded-2xl p-4 shadow-2xl">
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




        <AboutButton className="hover:scale-105 transition-transform" />

      </header>

      {/* Main Map Section */}
      <main className="h-[70vh] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
        <Map />
      </main>

      {/* Footer CTA */}
      <footer className="mt-1 text-center animate-bounce-slow">
        <Link
          href="/report"
          className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <span className="mr-2">📋</span>
          View All Emergency Cases
          <span className="ml-2">→</span>
        </Link>
      </footer>

      {/* Watermark Text */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center text-sm text-white/50 mt-4">
        Serving Citizens • Enhancing Safety • Building Trust
      </div>
    </div>
  );
}