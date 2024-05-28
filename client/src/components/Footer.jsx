import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import {BsFacebook, BsInstagram, BsTwitterX, BsGithub,BsYoutube} from 'react-icons/bs';
import { IoGlobeOutline } from "react-icons/io5";
<IoGlobeOutline />
import logo1 from '../assets/logo.png'
export default function Footercom() {
  return <Footer container className="border border-t-8 border-teal-500">
    {/* first Main container */}
    <div className="w-full max-w-7xl mx-auto">

            {/* Second container */}
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">

            {/* in second container 1st child */}
            <div className="mt-5">
            <Link to='/' className='self-center whitespace-nowrap text-lg 
            sm:text-xl font-semibold dark:text-white'>
                <div className='flex'>
            <img src={logo1} alt="Logo" 
             className='w-16 h-16 dark:caret-lime-50' />
             <span className='flex items-center text-2xl'>
                <span className='px-2 py-1 text-orange-500 font-extrabold font-serif  '>
                Rent
                </span>
                ify
            </span>
            </div>
            </Link>
            </div>

            {/* in second container 2nd child container */}
            
            
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-cente sm:justify-between">
            <Footer.Copyright 
            href="#"
            by="Rentify"
            year={new Date().getFullYear()}
            />
            <div className="flex gap-6 sm:mt-0 mt-4 justify-center">
                
                <Footer.Icon href="https://karthik-reddy.vercel.app/project" icon={IoGlobeOutline} />
                <Footer.Icon href="https://github.com/MVKarthikReddy/" icon={BsGithub} />
                
            </div>
        </div>

    </div>

    </Footer>
  
}
