import { GetStarted, Hero, Statistic, Step } from '@/components'
import React from 'react'

const HomePage = () => {
    return (
        <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:px-8">
             <Hero />
             <Statistic />
             <Step/>
             <GetStarted />
        </div>
    )
}

export default HomePage