import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
  return (
    <div className='bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center py-16 px-6 md:px-20'>
      {/* About Section */}
      <div className='max-w-4xl text-center space-y-8 mb-16'>
        <h1 className='text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 text-transparent bg-clip-text pb-2'>
          About RushRadar
          <div className='mt-2 h-1 bg-gradient-to-r from-blue-400 to-blue-200 w-1/3 mx-auto rounded-full' />
        </h1>
        
        <div className='bg-gray-800/50 p-8 rounded-2xl shadow-xl border border-gray-700/50'>
          <p className='text-xl leading-relaxed text-gray-300'>
            <Link href='/' className='hover:underline'>
              <span className='font-semibold text-blue-400 hover:text-blue-300 transition-colors'>
                RushRadar - Reports
              </span>
            </Link> 
            {' '} revolutionizes emergency response coordination by providing real-time incident tracking and traffic management. Our platform bridges the gap between citizens and authorities through:
          </p>
          
          <div className='mt-6 grid md:grid-cols-3 gap-6 text-left'>
            <div className='p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors'>
              <h3 className='text-blue-400 font-semibold mb-2'>Instant Reporting</h3>
              <p className='text-gray-300'>Authorized Citizens can immediately report emergencies with precise location tracking</p>
            </div>
            <div className='p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors'>
              <h3 className='text-blue-400 font-semibold mb-2'>Real-Time Updates</h3>
              <p className='text-gray-300'>Authorities receive live incident data with navigation support</p>
            </div>
            <div className='p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors'>
              <h3 className='text-blue-400 font-semibold mb-2'>Centralized Monitoring</h3>
              <p className='text-gray-300'>Comprehensive dashboard for managing city-wide emergencies</p>
            </div>
          </div>
          <div className='p-4 bg-gray-700/30 mt-4 rounded-lg hover:bg-gray-700/50 transition-colors'>
              <h3 className='text-blue-400 font-semibold mb-2'>Reduce Traffic</h3>
              <p className='text-gray-300 text-left'>Accidents, fallen electric poles, damaged roads, or vehicles stalled due to technical failures can disrupt traffic flow and hinder everyone’s mobility. Our platform tackles these challenges head-on by delivering instant solutions to clear obstacles, restore order, and keep your journey moving smoothly. Say goodbye to delays—we’re here to ensure safer, faster, and smarter commutes for all! </p>
            </div>
          
          <blockquote className='mt-8 p-4 border-l-4 border-blue-400 bg-gray-700/30 rounded-r-lg'>
            <p className='text-gray-400 italic'>"Empowering communities through responsive emergency management"</p>
            <p className='mt-2 text-blue-400 font-medium'>— Junaid Ali, Founder</p>
          </blockquote>
        </div>
      </div>

      {/* Steps Section */}
      <div className='max-w-4xl w-full space-y-12'>
        <h2 className='text-4xl font-semibold text-center bg-gradient-to-r from-green-400 to-green-200 text-transparent bg-clip-text pb-2'>
          How It Works
          <div className='mt-2 h-1 bg-gradient-to-r from-green-400 to-green-200 w-1/4 mx-auto rounded-full' />
        </h2>

        <div className='grid md:grid-cols-3 gap-8'>
          {[
            {
              icon: '/blue.png',
              title: 'Report Incident',
              text: 'Click the interactive marker or use your current location',
              animation: 'animate-bounce'
            },
            {
              icon: '/edit-icon.png',
              title: 'Provide Details',
              text: 'Select category and describe the emergency situation',
              animation: 'animate-pulse'
            },
            {
              icon: '/submit-icon.png',
              title: 'Submit & Track',
              text: 'Drag marker to incident location and monitor resolution progress',
              animation: 'animate-bounce'
            }
          ].map((step, index) => (
            <div 
              key={index}
              className='bg-gray-800 p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300 border border-gray-700/50 shadow-lg'
            >
              <div className={`mb-4 ${step.animation}`}>
                <Image 
                  src={step.icon}
                  alt={step.title}
                  width={60}
                  height={60}
                  className='mx-auto filter drop-shadow-lg'
                />
              </div>
              <h3 className='text-xl font-semibold text-green-400 mb-2'>{step.title}</h3>
              <p className='text-gray-300 leading-relaxed'>{step.text}</p>
            </div>
          ))}
        </div>

        <div className='text-center mt-8'>
          <Link href='/'>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg'>
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;