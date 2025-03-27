import React from 'react'
import Header from '../components/Header'
import PropertyDetails from '../components/PropertyDetails'
import Footer from '../components/Footer'
import ReraInformation from '../components/Rera'
import VideoTour from '../components/VideoTour'
import FAQ from '../components/FAQ'
import Banks from '../components/Banks'
import Blogs from '../components/Blogs'
import ContactUs from '../components/ContactUs'
import Location from '../components/Location'
import PropertyPrices from '../components/PropertyPrices'
import AmenitiesSection from '../components/AmenitiesSection'
import UnitLayouts from '../components/UnitLayouts'
import FloorPlans from '../components/FloorPlans'
import MasterLayout from '../components/MasterLayout'
import Gallery from '../components/Gallary'
import FloatingButtons from '../components/FloatingButtons'
import LocationAdvantages from '../components/LocationAdvantages'


const HomePage = () => {
  return (
    <>
      <Header />
      <PropertyPrices />
      <PropertyDetails />
      <LocationAdvantages />
      <AmenitiesSection />
      <UnitLayouts />
      <FloorPlans />
      <Location />
      <MasterLayout />
      <ReraInformation />
      <Banks />
      <Gallery />
      <VideoTour />
      <Blogs />
      <FAQ />
      <ContactUs />
      <Footer />
      <FloatingButtons />
    </>
  )
}

export default HomePage