"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const targetAudiences = [
  {
    id: 1,
    text: "Early-career doctors\nseeking practical confidence",
    top: "20%",
    left: "17%",
  },
  {
    id: 2,
    text: "Institutions aiming to strengthen\nclinical standards among their teams",
    top: "35%",
    right: "0%",
  },
  {
    id: 3,
    text: "Practicing clinicians updating\ntheir procedural skills",
    bottom: "35%",
    left: "24%",
  },
  {
    id: 4,
    text: "Medical professionals transitioning\ninto advanced roles",
    bottom: "5%",
    left: "40%",
  },
];

export default function Design() {
  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-24 bg-[#FAFAFA]  overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-stretch gap-16 lg:gap-24">

          {/* Left: Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-[40%] flex flex-col text-left"
          >
            <span className="text-[#262626] font-medium text-sm  mb-4">Who Praxis is for</span>
            <h2 className="text-5xl text-[#262626] leading-[1.1] mb-8 tracking-tighter text-nowrap font-medium ">
              Designed for Doctors <br /> Committed to Excellence
            </h2>

            <div className="mt-auto">
              <p className="text-[#4B5563] text-sm leading-relaxed mb-10 max-w-lg">
                Praxis offers focused medical training programs tailored to enhance clinical capability across various specialties and skill levels.
              </p>
              <button className="flex items-center gap-3 bg-[#33187F] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition shadow-lg group font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-125 transition"></span>
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Right: The Diagram Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-[60%] relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-[650px] aspect-[4.5/3.4]">
              {/* The BG Circle Image */}
              <div className="absolute inset-0">
                <Image
                  src="/home/roundimg.png"
                  alt="Design Background"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Data Points */}
              {targetAudiences.map((point, index) => (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + (index * 0.2) }}
                  className="absolute p-2"
                  style={{
                    top: point.top,
                    left: point.left,
                    right: point.right,
                    bottom: point.bottom,
                  }}
                >
                  <div className="flex items-center gap-3 md:gap-4 group">
                    {/* Pink Dot */}
                    <div className="relative flex items-center justify-center shrink-0">
                      <div className="w-4 h-4  bg-[#FF00D6] rounded-full shadow-[0_0_15px_rgba(255,0,214,0.6)] group-hover:scale-125 transition-transform duration-300"></div>
                      {/* Ripple Effect Animation */}
                      <div className="absolute w-5 h-5 bg-[#FF00D6]/20 rounded-full animate-ping"></div>
                    </div>

                    {/* Text Label */}
                    <p className="text-[#1E1B4B] font-medium text-xs md:text-sm lg:text-sm leading-tight whitespace-pre-line drop-shadow-sm max-w-[180px] md:max-w-[240px]">
                      {point.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
