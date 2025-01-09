import '@/styles/globals.css'
import { Navbar,Footer } from '@/components';
import { LandRegistryProvider } from '@/context/LandRegistryContext';

export default function App({ Component, pageProps }) {
  return (
    <>
        <LandRegistryProvider>
            <Navbar/>
            <Component {...pageProps} />           
        </LandRegistryProvider>
            <Footer/>
    </>
  )
}
