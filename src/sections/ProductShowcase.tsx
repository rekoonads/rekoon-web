'use client';

import productImage from '../assets/sweven.png';
import pyramidImage from '../assets/pyramid.png';
import tubeImage from '../assets/tube.png';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip"
      id="features"
    >
      <div className="container">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag font-bold">Boost your advertisement</div>
          </div>
          <h2 className="section-title mt-5 text-5xl">
            A More Effective Way to publish advertisement
          </h2>
          <p className="section-description mt-5">
            Effortlessly turn your ideas into a fully functional, responsive,
            Adtech website in just minutes with our dashboard.
          </p>
        </div>
        <div className="relative">
          <img src={productImage} alt="Product Image" className="mt-10" />
          <motion.img
            src={pyramidImage}
            alt="Pyramid Image"
            height={262}
            width={262}
            className="hidden md:block absolute -right-36 -top-32"
            style={{
              translateY,
            }}
          />
          <motion.img
            src={tubeImage}
            alt="Tube image"
            height={248}
            width={248}
            className="hidden md:block absolute  bottom-24 -left-36"
            style={{
              translateY,
            }}
          />
        </div>
      </div>
    </section>
  );
};
