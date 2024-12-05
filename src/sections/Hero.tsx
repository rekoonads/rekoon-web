'use client';

import { ArrowRight } from 'lucide-react';
import ipadImage from '../assets/ipad.png';
import cylinderImage from '../assets/cylinder.png';
import noodleImage from '../assets/noodle.png';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
    >
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <div className="tag text-black font-bold">Sweven is here</div>
            <h1 className="text-3xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001e80] text-transparent bg-clip-text mt-6">
              Precision Ads, Proven Growth
            </h1>
            <p className="text-lg text-[#010d3e] tracking-tight mt-6">
              Sweven is an innovative AdTech company at the forefront <br /> of
              digital advertising solutions.
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <button className="btn btn-primary">
                <a href="/auth/sign-up">Join us now</a>
              </button>
              <button className="btn btn-text gap-1">
                <span>Learn more</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            {/* <motion.img
              src={ipadImage}
              alt="Cog Image"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-16 lg:-left-12"
              animate={{
                translateY: [-30, 30],
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 2,
                ease: 'easeInOut',
              }}
            /> */}
            {/* <motion.img
              src={cylinderImage}
              width={220}
              height={220}
              alt="Cylinder image"
              className="hidden md:block -top-8 -left-40 md:absolute"
              style={{
                translateY: translateY,
              }}
            />
            <motion.img
              src={noodleImage}
              width={220}
              alt="Noodle image"
              className="absolute hidden lg:block top-[524px] left-[420px] rotate-[30deg]"
              style={{
                rotate: 30,
                translateY: translateY,
              }}
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
