import Map from "@/components/Map";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full p-6">
      <div className="bg-[blue] m-auto md:w-[20%] p-[1px] mb-2  w-[35%] rounded-xl">
      <h1 className="md:text-2xl font-bold text-center  text-[10px] mb-4">Traffic Reporting App</h1>
      </div>
      <Map />
      <div className="text-center mt-4">
        <Link href="/report" className="bg-[#f35327] m-auto text-white px-4 py-2 rounded">
         See All Cases
        </Link>
      </div>
    </div>
  );
}
