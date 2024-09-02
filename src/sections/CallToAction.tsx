'use client';

// import ArrowRight from '../assets/arrow-right.svg';
import starImage from '../assets/iPhone.png';
import springImage from '../assets/ipadPro.png';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <>
      <section
        ref={sectionRef}
        className="bg-gradient-to-b from-white  to-[#d2dcff]  py-24 overflow-x-clip"
      >
        <div className="container">
          <div className="section-heading relative">
            <h2 className="section-title">Sign up for free today</h2>
            <p className="section-description mt-5">
              Celebrate the joy of accomplishment with an app designed to track
              your progress and motivate your efforts.
            </p>
            <motion.img
              src={starImage}
              alt="Star Image"
              width={360}
              className="absolute -left-[350px] -top-[137px]"
              style={{
                translateY,
              }}
            />
            <motion.img
              src={springImage}
              alt="Spring Image"
              width={600}
              className="absolute -right-[520px] -top-[19px]"
              style={{
                translateY,
              }}
            />
          </div>
          <div className="flex gap-2 mt-10 justify-center">
            <button className="btn btn-primary">
              <a href="/auth/sign-up">Join us now</a>
            </button>
            <button className="btn btn-text gap-1">
              <span>Learn more</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Get In Touch
          </h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <Input
                type="text"
                placeholder="Subject"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Textarea
                placeholder="Your Message"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                rows={6}
              />
              <Button
                size="lg"
                className="w-full bg-white text-emerald-600 hover:bg-emerald-50"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
