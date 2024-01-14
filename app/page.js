import Image from 'next/image';
import Hero from '../public/Hero2.png'
import React from 'react'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const Homepage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-black">
    <div className="flex flex-col lg:flex-row lg:w-3/4">
     
      <div className="lg:w-1/2 p-6 ">
        <h1 className="text-3xl font-play font-bold mb-9 border-t-4 border-l-4 p-1 border-black pl-5" >Welcome to Wine Delight</h1>
        <p className="text-lg mb-8 border-b-4 border-l-4 border-black font-play pl-5">
          Explore our exquisite collection of fine wines.
        </p>
        <Button>
          <Link href='/wines'>Explore Wines</Link>
        </Button>
        
      </div>

      <div className="lg:w-1/2">
        <Image src={Hero} alt="Wine Delight" className=" object-fit" />
        
      </div>
    </div>
  </div>
  )
}

export default Homepage
