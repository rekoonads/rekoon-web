import React from 'react';
import { Header } from '../sections/Header';
import { Hero } from '../sections/Hero';
import { LogoTicker } from '../sections/LogoTicker';
import { ProductShowcase } from '../sections/ProductShowcase';
import { Pricing } from '../sections/Pricing';
import { Testimonials } from '../sections/Testimonials';
import { CallToAction } from '../sections/CallToAction';
import { Footer } from '../sections/Footer';
import UpcomingFeatures from '../sections/UpcomingFeatures';

export default function NewHome() {
  return (
    <>
      <Header />
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <UpcomingFeatures />
      {/* <Pricing /> */}
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}
