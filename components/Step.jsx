import React from 'react';
import { ImgStep } from ".";
import Image from "next/image";

const Step = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-14 mx-auto flex flex-wrap">
                <div className="flex flex-wrap w-full">
                    <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Key Advantages:</h1>
                    </div>
                <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                    <div className="flex relative pb-12">
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                    </div>
                    <div className="flex-grow pl-4">
                        <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Authenticity</h2>
                        <p className="leading-relaxed">NFTs ensure that each property deed is unique and cannot be duplicated or tampered with.</p>
                    </div>
                    </div>
                    <div className="flex relative pb-12">
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                    </div>
                    <div className="flex-grow pl-4">
                        <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Transparency</h2>
                        <p className="leading-relaxed">All transactions related to the property deed are recorded on the blockchain, ensuring a transparent history of ownership.</p>
                    </div>
                    </div>
                    <div className="flex relative pb-12">
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <circle cx="12" cy="5" r="3"></circle>
                        <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                        </svg>
                    </div>
                    <div className="flex-grow pl-4">
                        <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Accessibility</h2>
                        <p className="leading-relaxed">Owners can access their property deeds digitally from anywhere, eliminating the risk of loss or damage to physical copies.</p>
                    </div>
                    </div>
                    <div className="flex relative pb-12">
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div className="flex-grow pl-4">
                        <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Smart Contracts</h2>
                        <p className="leading-relaxed">These can automate processes like transfer of ownership, mortgage agreements, or inheritance without the need for intermediaries.</p>
                    </div>
                    </div>
                    <div className="flex relative">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                    </div>
                    <div className="flex-grow pl-4">
                        <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Conclusion</h2>
                        <p className="leading-relaxed">DeedNFT is a revolutionary approach to property management, merging the legal significance of deeds with the technological advantages of NFTs.</p>
                    </div>
                    </div>
                </div>
                <Image 
                     src={ImgStep}
                     className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12" 
                     alt="step"
                />
                </div>
            </div>
        </section>
    )
}

export default Step