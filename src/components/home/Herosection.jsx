"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function Herosection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover"
      >
        <source src="/video/vdooo.mp4" type="video/mp4" />
      </video>

      {/* Bottom white gradient blend */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] h-40 bg-gradient-to-t from-[#FAFAFA] to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 sm:pt-36 pb-20">
        {/* Main Heading */}
        <div className="max-w-3xl relative">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-[3.5vw] font- leading-[1.2]  text-[#1F1F1F] mb-6"
            style={{ fontFamily: "var(--font-neuropolitical), sans-serif" }}
          >
          <span>Evolve Your Surgical </span>
            <br className="md:block hidden" />
            <span>DNA</span>
            <br className="md:hidden block" />
            <span> with Precision by</span>
             <br className="md:block hidden"/>
            <span>Practice Till Perfection.</span>
          </motion.h1>

           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
             className="flex justify-center sm:justify-end sm:pr-16 md:pr-32 relative absolute -bottom-2 md:-right-60 -right-10 "
           >
            <div className="flex flex-col gap-2">
              {/* Stat row: big number + label side by side */}
              <div className="flex items-center gap-3">
                <span className="text-3xl   pt-2 text-[#1F1F1F] tracking-tighter leading-none">
                  100%
                </span>
                <div className="flex flex-col ">
                  <span className="text-xs sm:text-sm font-semibold text-[#1F1F1F]">
                    Commitment To
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#1F1F1F]">
                    Your Learning
                  </span>
                </div>
              </div>
              {/* Blue bar with slant SVG ending */}
              <div className="flex items-center absolute -bottom-13 md:right-1 -right-8 ">
                <Image src="/home/m100.png" alt="stat accent" width={300} height={150} className="md:h-26 h-24 w-auto" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats & Info Row */}
        <div className="flex flex-col gap-12 pt-20">

          {/* 99% Stat + Spring + Description */}
          <div className="flex flex-col sm:flex-row items-end justify-end gap-10 sm:gap-6 mt-4  relative ">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex items-center gap-2 absolute -top-10 md:right-[50%] right-[30%] p-8 pl-28 pr-10 "
            >
              <span className="text-3xl text-[#1F1F1F] tracking-tighter leading-none ">
                  99%
                </span>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-semibold text-[#1F1F1F]">
                    Student
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#1F1F1F]">
                    Satisfaction
                  </span>
                </div>

                 <div className="flex items-center absolute -bottom-5 right-6 ">
                <Image src="/home/m100.png" alt="stat accent" width={320} height={150} className="h-28 w-60 -scale-x-100" />
              </div>
            </motion.div>

            {/* Spring / Coil SVG */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className=" md:flex  hidden "
            >
              <div className="hidden sm:flex items-end justify-center  ">
                <Image src="/home/round.png" alt="spring" width={100} height={200} style={{ width: 'auto', height: 'auto' }} />
            </div>

            {/* Description Text */}
              <div className="max-w-xs pl-3 ">
                <p className="text-xs sm:text-sm text-gray-900 leading-relaxed py-4">
                Designed by experts. Delivered
                <br />
                through hands-on learning.
                <br />
                Focused on outcomes that
                <br />
                improve patient care.
              </p>
            </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Herosection;