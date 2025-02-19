import Map from "@/components/Map";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Traffic Reporting App</h1>
      <Map />
      <div className="text-center mt-4">
        <Link href="/report" className="bg-blue-500 text-white px-4 py-2 rounded">
         See All Cases
        </Link>
      </div>
    </div>
  );
}
