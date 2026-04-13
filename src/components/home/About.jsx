"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function About() {
  const supportList = [
    "Hands-on procedural training",
    "Continuous professional development",
    "Evidence-based curriculum"
  ];

  return (
    <section className="w-full px-3 md:px-6 py-16 md:py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">

        {/* 🔹 Top Support Pillar Section (The 360° Support Pillar) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[#F3F3F3]/70 rounded-[1.5rem] md:rounded-[1.2rem] px-4 md:px-28 py-8 md:py-7 flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-12 md:gap-12"
        >
          <div className="max-w-md w-full">
            <h2 className="text-2xl md:text-4xl font-medium text-[#262626] md:mb-6 mb-4  tracking-tight leading-tight">
              The 360° <br className="hidden md:block" /> Support Pillar
            </h2>
            <button className="flex items-center gap-3 bg-[#33187F] text-white px-6 md:px-8 py-3.5 rounded-full hover:bg-opacity-90 transition group font-medium text-sm md:text-base">
              <span className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-125 transition"></span>
              Explore the Praxis Method
            </button>
          </div>

          <div className="w-full md:w-auto">
            <ul className="space-y-4 text-[#4B5563] font-medium text-sm md:text-base">
              {supportList.map((item, idx) => (
                <motion.li 
                  key={idx} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF22F2] flex-shrink-0 animate-pulse"></span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* 🔹 Bottom Content Section (Learning That Transforms Practice) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-stretch gap-10 lg:gap-24">

          {/* Left: Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[40%] flex flex-col text-left"
          >
            <span className="text-[#262626] font-medium text-xs md:text-sm mb-4">About Us</span>
            <h2 className="text-3xl md:text-5xl font-medium text-[#262626] leading-tight md:leading-[1.1] mb-6 md:mb-8 tracking-tighter">
              Learning That <br className="hidden md:block" /> Transforms Practice
            </h2>

            <div className="mt-auto">
              <p className="text-[#4B5563] text-sm leading-relaxed mb-8 md:mb-10 max-w-lg">
                At Praxis, your evolution is powered by The Digital Synapse —
                individualized attention from senior surgeons and 24/7 digital
                mentorship that follows you into your own operating theater.
              </p>
              <button className="flex items-center gap-3 bg-[#33187F] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition group font-medium text-sm">
                <span className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-125 transition"></span>
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Right: The Flex Layout */}
          <div className="w-full lg:w-[72%] space-y-4 md:space-y-6">

            {/* Row 1: Items 1, 2, 3 */}
            <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 w-full">
              {/* Item 1: 40+ */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-[calc(40%-0.5rem)] md:w-[calc(28%-0.75rem)] bg-[#EEEEEE] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 flex flex-col justify-center items-center text-center aspect-square"
              >
                <span className="text-3xl md:text-5xl font-medium text-[#262626] mb-1 md:mb-2 font-neuropolitical" style={{ fontFamily: "var(--font-neuropolitical), sans-serif" }} >40+</span>
                <p className="text-[#262626] font-bold text-[10px] md:text-xs uppercase leading-tight tracking-widest">
                  Original <br /> Equipments
                </p>
              </motion.div>

              {/* Item 2: Machine */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-[calc(40%-0.5rem)] md:w-[calc(28%-0.75rem)] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-square relative border-2 border-white"
              >
                <Image src="/home/about1.png" alt="Medical Machine" fill sizes="(max-width: 768px) 40vw, 28vw" className="object-cover rounded-[1.5rem] md:rounded-[2rem] transition-transform hover:scale-110 duration-500" />
              </motion.div>

              {/* Item 3: Screen */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-[calc(40%-0.5rem)] md:w-[calc(28%-0.75rem)] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-square relative border-2 border-white hidden md:block"
              >
                <Image src="/home/about2.png" alt="Medical Screen" fill sizes="(max-width: 768px) 40vw, 28vw" className="object-cover transition-transform hover:scale-110 duration-500" />
              </motion.div>
            </div>

            {/* Row 2: Items 4, 5, 6 */}
            <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 w-full">
              {/* Item 3.9: Spacer (only for desktop layout) */}
              <div className="w-[calc(15%-0.75rem)]">
              </div>

              {/* Item 4: Textured Object (about4) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-[calc(40%-0.5rem)] md:w-[calc(28%-0.75rem)] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-square relative bg-[#EBEBEB] border-2 border-white"
              >
                <Image src="/home/about4.png" alt="Textured Object" fill sizes="(max-width: 768px) 40vw, 28vw" className="object-cover p-2 md:p-4 transition-transform hover:scale-110 duration-500" />
              </motion.div>

              {/* Item 5: 10Y */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-[calc(40%-0.5rem)] md:w-[calc(28%-0.75rem)] bg-[#EEEEEE] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 flex flex-col justify-center items-center text-center aspect-square border-2 border-white"
              >
                <span className="text-3xl md:text-5xl font-medium text-[#262626] mb-1 md:mb-2 tracking-tighter uppercase font-neuropolitical" style={{ fontFamily: "var(--font-neuropolitical), sans-serif" }} >10y</span>
                <p className="text-[#262626] font-bold text-[10px] md:text-xs uppercase leading-tight tracking-widest">
                   Of Expertise
                </p>
              </motion.div>

              {/* Item 6: Laptop Hands */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-[calc(50%-0.5rem)] md:w-[calc(28%-0.75rem)] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-square relative border-2 border-white  hidden md:block"
              >
                <Image src="/home/about3.png" alt="Gloved Hands Laptop" fill sizes="(max-width: 768px) 50vw, 28vw" className="object-cover transition-transform hover:scale-110 duration-500" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Section: Marquee */}
      <div className="mt-16 md:mt-24 space-y-12 md:space-y-20">
        <div className="w-full overflow-hidden py-4 md:py-2 bg-[#FAFAFA]">
          <div className="animate-marquee flex items-center gap-8 md:gap-12 whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-[#0A7BFF] text-2xl md:text-5xl font-medium uppercase tracking-tighter" style={{ fontFamily: "var(--font-neuropolitical), sans-serif" }}>
                  From Knowledge to Clinical Mastery
                </span>
                <div className="w-12 h-12 md:w-24 md:h-24 rounded-xl md:rounded-2xl flex-shrink-0 bg-[#FAFAFA]">
                  <Image src="/home/marimg.png" alt="Marquee Icon" width={80} height={80} className="object-cover rounded-xl" />
                </div>
                <span className="text-[#0A7BFF] text-2xl md:text-5xl font-medium uppercase tracking-tighter" style={{ fontFamily: "var(--font-neuropolitical), sans-serif" }}>
                  The Science of Healing, The Art of Care
                </span>
                <div className="w-12 h-12 md:w-24 md:h-24 rounded-xl md:rounded-2xl flex-shrink-0 bg-[#FAFAFA]">
                  <Image src="/home/marimg.png" alt="Marquee Icon 2" width={80} height={80} className="rounded-xl" />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
