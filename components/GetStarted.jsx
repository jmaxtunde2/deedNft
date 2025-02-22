import React from 'react'

const GetStarted = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
                <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5">Get Started</h2>
                <div className="md:w-3/5 md:pl-6">
                <div className="flex md:mt-4 mt-6">
                    <button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">Get Started Now</button>
                    <a className="text-indigo-500 inline-flex items-center ml-4">Learn More
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                    </a>
                </div>
                </div>
            </div>
        </section>
    )
}

export default GetStarted