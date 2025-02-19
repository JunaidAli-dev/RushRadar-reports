import Map from "@/components/Map";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full p-6 bg-gray-800">
      <div className="bg-[#912fe2] m-auto md:w-[20%] flex justify-center items-center p-[4px] mb-2  w-[45%] rounded-xl">
      <h1 className="md:text-2xl font-bold text-[14px]">Traffic Reporting App</h1>
      </div>
      <Map />
      <div className="text-center mt-4">
        <Link href="/report" className="bg-[#a245ee] m-auto text-white px-4 py-2 rounded-xl">
         See All Cases
        </Link>
      </div>
    </div>
  );
}
