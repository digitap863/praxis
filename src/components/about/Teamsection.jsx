"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const teamMembers = [
  {
    name: "Dr. Matthew Harris",
    role: "Founder & CEO",
    description: "Dentist providing comprehensive dental care, from checkups to cosmetic solutions.",
    image: "/home/doc.png",
    isMain: true,
  },
  {
    name: "Dr. Benjamin Lee",
    role: "Founder & CEO",
    description: "Dermatologist specializing in skin health and advanced cosmetic treatments.",
    image: "/home/doc.png",
    isMain: true,
  },
  {
    name: "Dr. Sarah Mitchell",
    role: "Founder & CEO",
    description: "Expert cardiologist focused on preventive heart care and advanced treatments.",
    image: "/home/doc.png",
    isMain: true,
  },
  {
    name: "Dr. Daniel Hayes",
    role: "Founder & CEO",
    description: "Neurologist specializing in brain and nervous system disorders with a patient-centered approach.",
    image: "/home/doc.png",
    isMain: true,
  },
];

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function TeamCard({ member, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative rounded-[1.5rem] overflow-hidden min-h-[400px] shadow-sm group cursor-pointer h-full"
    >
      {/* Background Image - Always present */}
      <div className="absolute inset-0">
        <Image
          src={member.image}
          fill
          className="object-cover object-center"
          alt={member.name}
        />
      </div>

      {/* Animated Overlay - Water flow effect */}
      <motion.div
        className="absolute inset-0 bg-[#007BFF]"
        initial={{ y: "0%" }}
        animate={{
          y: isHovered ? "-100%" : "0%",
        }}
        transition={{
          duration: 0.6,
          ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for smooth water-like flow
        }}
      />

      {/* Content Container */}
      <div className="relative h-full p-8 flex flex-col justify-between z-10 min-h-[400px]">
        {/* Top Content */}
        <motion.div
          animate={{
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <h3
            className={`text-2xl font-medium mb-1 transition-colors duration-300 ${
              member.isMain
                ? isHovered
                  ? " text-[#262626]   "
                  : "  text-white"
                : "text-[#262626]"
            }`}
          >
            {member.name}
          </h3>
          <p
            className={`text-sm font-medium transition-colors duration-300 ${
              member.isMain
                ? isHovered
                  ? "  text-[#262626]  "
                  : "text-white    "
                : "text-[#262626]"
            }`}
          >
            {member.role}
          </p>
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          animate={{
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <p
            className={`text-sm transition-colors duration-300 ${
              member.isMain
                ? isHovered
                  ? "text-[#262626]"
                  : "text-white"
                : "text-[#262626]"
            }`}
          >
            {member.description}
          </p>
        </motion.div>

        {/* Hover Indicator */}
        <motion.div
          className="absolute bottom-6 right-6 w-10 h-10 rounded-full border-2 border-white flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8h10M8 3l5 5-5 5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Ripple effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-white/10 to-transparent"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Teamsection() {
  return (
    <section className="w-full px-4 md:px-10 lg:px-20 md:py-24 py-16 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[#262626] font-medium text-sm mb-4 block">
            Our Team
          </span>
          <h2 className="text-3xl md:text-5xl text-[#262626] leading-[1.1] tracking-tighter font-medium">
            Meet the Core Team Providing <br className="hidden md:block" /> Expert Training
          </h2>
        </motion.div>

        {/* Mobile: Swiper */}
        <div className="sm:hidden w-full">
          <Swiper
            spaceBetween={16}
            slidesPerView={1.2}
            className="w-full !overflow-visible"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <TeamCard member={member} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop/Tablet: Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}