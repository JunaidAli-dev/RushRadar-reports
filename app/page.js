import AboutButton from "@/components/AboutButton";
import Map from "@/components/Map";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <div className="h-screen w-full p-6 bg-gray-800">
      <div className="flex justify-between">

      <div className="bg-[#912fe2] hover:bg-[#c44ff2]  md:w-[20%] ml-[2%] flex justify-center items-center p-[4px] mb-2  w-[45%] rounded-xl cursor-pointer">
     <Link href='/'><h1 className="md:text-2xl font-bold text-[14px] ">RushRadar--Reports</h1></Link> 
      </div>
    

      <div className="mr-[2%] flex gap-2">
      <div className="mb-1">
      <Image src="/Indiangov.png" alt="" width={30} height={30} />
      </div>
      <AboutButton/>
      </div>

      </div>
      <Map />
      <div className="text-center mt-4">
        <Link href="/report" className="bg-[#a245ee] hover:bg-[#c44ff2] m-auto text-white px-4 py-2 rounded-xl">
         See All Cases
        </Link>
      </div>
    </div>
  );
}
