
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import FeaturedMenu from '@/components/home/FeaturedMenu';
import Testimonials from '@/components/home/Testimonials';
import ContactCTA from '@/components/home/ContactCTA';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <FeaturedMenu />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default Index;
