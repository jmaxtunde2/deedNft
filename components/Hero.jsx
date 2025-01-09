import React from 'react';
import { ImgHero } from ".";
import Link from 'next/link';
import Image from "next/image";

const Hero = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-2 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-[#262D33]">DEEDNFT
                    <br className="hidden lg:inline-block"/>Securing Property, Empowering Ownership
                </h1>
                <p className="mb-8 leading-relaxed">NFT-based land registry system using blockchain technology to create and manage digital representations of property deeds. Deed, refers to the legal document that certifies ownership of a property.
                NFT (Non-Fungible Token): Represents a unique, immutable digital asset on the blockchain. In this case, NFT serve as a secure, tamper-proof digital deed.
                </p>
                <div className="flex justify-center">
                    <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Get Started</button>
                    <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Contact Us</button>
                </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <Image className="object-cover object-center rounded" alt="hero" src={ImgHero}/>
                </div>
            </div>
        </section>
    )
}

export default Hero