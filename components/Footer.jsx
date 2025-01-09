import React from 'react';
import { Fot1,Fot2 } from '.';

const Footer = () => {
    const footNavbar = [
        {href: "/term-condition", name: "Terms & Condition"},{href:"/licence", name:"Licence"},{href:"/privacy", name:"Privacy"},{href:"/about-us", name:"About"} 
    ]
    return (
        <footer className="pt-10">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="justify-between sm:flex">
                    <div className="space-y-6">
                        <img src="https://www.floatui.com/logo.svg" className='w-32' alt='Corilla Logo' />
                        <p className="max-w-md">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim repellendus aliquid animi dolorum eaque quae suscipit maiores voluptatum voluptas cupiditate sequi vitae architecto praesentium quibusdam debitis doloremque, ad cumque laudantium.
                        </p>
                        <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
                            {
                                footNavbar.map((item, id) => (
                                    <li className="text-gray-800 hover:text-gray-500 duration-150">
                                        <a key={id} href={item.href}>{item.name}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-700 font-semibold"> Get the App</p>
                        <div className="flex items-center gap-3 mt-3 sm:block">
                            <a href="#"> <Fot1 /> </a>
                            <a href="#" className="mt-0 block sm:mt-3"> <Fot2 /> </a>
                        </div>
                    </div>
                </div>
                <div className="mt-10 py-10 border-t md:text-center">
                    <p>Copyright 2025  Coryase Technology. All right reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer