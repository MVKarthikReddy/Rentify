import React from 'react'
import { FaHome, FaUserFriends, FaHandshake } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { FiUsers } from 'react-icons/fi';

export default function About() {
  return (
   
  <div className='py-20 px-4 max-w-6xl mx-auto'>
    <section className="py-12">
       <div className="container mx-auto px-4">
           <h2 className="text-3xl font-bold text-pink-800 mb-6">About Us</h2>
           <p className="text-lg text-slate-600 leading-relaxed">
               Welcome to HouseHive, your trusted partner in real estate. We're committed to revolutionizing the
               way you buy, sell, or rent properties, ensuring a seamless and rewarding experience for every
               client.
           </p>
           <p className="text-lg text-slate-600 leading-relaxed mt-4">
               At HouseHive, we believe that finding your dream home should be exciting, not overwhelming.
               That's why we've created a platform that empowers you with all the tools and resources you need
               to make informed decisions. Whether you're searching for a cozy apartment, a spacious house, or
               an investment property, we've got you covered.
           </p>
           <p className="text-lg text-slate-600 leading-relaxed mt-4">
               Our team of dedicated professionals is here to guide you through every step of the process,
               providing expert advice, personalized recommendations, and unparalleled support. With HouseHive,
               you can rest assured knowing that you're in good hands.
           </p>
       </div>
   </section>

   {/* Why Choose Us Section */}
   <section className="bg-gray-300 py-12  rounded-tr-3xl">
       <div className="container mx-auto px-4">
           <h2 className="text-3xl font-bold text-slate-700 mb-6">Why Choose Us</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="flex items-center justify-center">
                   <FaHome className="text-8xl text-blue-500 hover:text-teal-700" />
                   <div className="ml-4 bg-teal-400 p-3 rounded-tr-3xl">
                       <h3 className="text-xl font-semibold text-gray-800">Wide Range of Properties</h3>
                       <p className="text-gray-700 mt-2">Explore a diverse selection of homes, apartments, and
                           commercial spaces to find the perfect fit for your needs.</p>
                   </div>
               </div>
               <div className="flex items-center justify-center">
                   <FaUserFriends className="text-8xl text-blue-500 hover:text-teal-700" />
                   <div className="ml-4 bg-teal-400 p-3 rounded-tr-3xl">
                       <h3 className="text-xl font-semibold text-gray-800">Expert Guidance</h3>
                       <p className="text-gray-700 mt-2">Receive personalized advice and support from our team of
                           experienced real estate professionals.</p>
                   </div>
               </div>
               <div className="flex items-center justify-center">
                   <FaHandshake className="text-8xl text-blue-500 hover:text-teal-700" />
                   <div className="ml-4 bg-teal-400 p-3 rounded-tr-3xl">
                       <h3 className="text-xl font-semibold text-gray-800">Trusted Partnerships</h3>
                       <p className="text-gray-700 mt-2">Benefit from our extensive network of trusted
                           partners, including lenders, inspectors, and contractors.</p>
                   </div>
               </div>
           </div>
       </div>
   </section>
  </div>
   
  )
}
