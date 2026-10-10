import React from 'react';
import Hero from '../components/Hero';
import WellnessBenefits from '../components/WellnessBenefits';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Treatments from '../components/Treatments';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import Booking from '../components/Booking';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="spa-landing-page">
      <Hero />
      <WellnessBenefits />
      <About />
      <WhyChooseUs />
      <Treatments />
      <Gallery />
      <Reviews />
      <Booking />
      <FAQ />
      <Contact />
    </div>
  );
};

export default Home;
