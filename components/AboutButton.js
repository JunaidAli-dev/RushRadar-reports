"use client"
import Link from "next/link";

const AboutButton = () => {
  return (
    <Link href="/about">
      <button className="
        bg-gradient-to-r from-purple-600 to-blue-500
        text-white font-semibold
        px-2.5 py-1.5
        sm:px-5 sm:py-2.5
        md:px-6 md:py-3
        rounded-xl
        transition-all duration-300
        transform hover:scale-105
        shadow-md hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        text-sm sm:text-base md:text-lg
        flex items-center justify-center
        space-x-1.5 sm:space-x-2
        min-w-[120px] sm:min-w-[140px]
      ">
        <span>About Us</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 sm:h-5 sm:w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>
    </Link>
  );
};

export default AboutButton;