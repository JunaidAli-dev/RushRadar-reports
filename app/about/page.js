import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  return (
    <div className='bg-gray-900 text-white min-h-screen flex flex-col items-center py-12 px-6 md:px-20'>

      {/* About Section */}
      <div className='max-w-3xl text-center'>
        <h1 className='text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text'>
          About Us
        </h1>
        <p className='text-lg leading-relaxed text-gray-300'>
         <Link href='/' > <span className='font-semibold hover:text-blue-400 text-blue-300'>RushRadar - Reports </span> </Link> 
          is designed to solve the issue of delayed responses from official authorities such as the police, ambulance, and fire departments.
          This platform enables them to stay updated on incidents occurring in the city and provides real-time navigation to the exact location.
          Additionally, central authorities can monitor and oversee all reported incidents effectively.
        </p>
        <p className='mt-4 italic text-gray-400'>— Junaid Ali (Founder)</p>
      </div>

      {/* Steps Section */}
      <div className='mt-12 max-w-3xl text-center'>
        <h2 className='text-3xl font-semibold bg-gradient-to-r from-green-400 to-green-200 text-transparent bg-clip-text mb-6'>
          Steps to Use
        </h2>

        <ol className='list-decimal list-inside text-lg text-gray-300 space-y-4 text-left md:text-center'>
          <li>
            <span className='inline-flex items-center justify-start md:justify-center'>
              Click on the blue marker
              <Image src='/marker-icon-2x.png' alt='Blue Marker' width={20} height={20} className='ml-2 transition-transform transform hover:scale-125' />
            </span>
          </li>
          <li>Select a category and add a description.</li>
          <li>If you are not at the incident location, manually adjust the marker. Otherwise, your current location will be detected automatically.</li>
        </ol>

        <p className='mt-6 text-lg text-gray-400'>
          Submit your report—you’re done!.
          Now You can view all reports, check their statuses, and take action by clicking on the red markers.
        </p>
      </div>

    </div>
  );
};

export default About;
