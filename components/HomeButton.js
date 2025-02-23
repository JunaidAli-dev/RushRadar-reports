"use client"
import Link from "next/link";

const HomeButton = () => {
  return (
    <Link href="/">
      <button className="
        bg-gradient-to-r from-purple-600 to-blue-500
        text-white font-semibold
        px-4 py-2
        sm:px-5 sm:py-2.5
        md:px-6 md:py-3
        rounded-lg
        transition-all duration-300
        transform hover:scale-105
        shadow-md hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        text-sm sm:text-base md:text-lg
        flex items-center justify-center
        space-x-1.5 sm:space-x-2
        min-w-[120px] sm:min-w-[140px]
      ">
        <span>Home</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 sm:h-5 sm:w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </button>
    </Link>
  );
};

export default HomeButton;