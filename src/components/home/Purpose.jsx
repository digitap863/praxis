"use client";

import { motion } from "framer-motion";

export default function Purpose() {
  return (
    <section className="w-full px-4 md:px-10 py-6 bg-[#FAFAFA]  overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <span className="text-[#262626] font-medium text-sm  mb-2 block ">
            Mission & Vision
          </span>
          <h2 className="text-4xl md:text-5xl text-[#262626] leading-[1.1] tracking-tighter font-medium">
            Our Purpose
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              opacity: { duration: 0.8 },
              y: { duration: 0.8 },
              scale: { duration: 0.3 } 
            }}
            className="bg-[#EEEEEE] rounded-[1.8rem] p-8 flex flex-col justify-center border border-white border-2 cursor-pointer shadow-sm"
          >
            <h3 className="text-2xl md:text-3xl text-[#262626] font-medium mb-4">
              Our Mission
            </h3>
            <p className="text-[#262626] text-sm md:text-base max-w-full">
              To empower doctors with precise, practical, and clinically relevant training
              that enhances patient care, strengthens professional competence, and
              elevates medical practice standards.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.2 },
              y: { duration: 0.8, delay: 0.2 },
              scale: { duration: 0.3 } 
            }}
            className="bg-[#EEEEEE] rounded-[1.8rem] p-8 flex flex-col justify-center border border-white border-2 cursor-pointer shadow-sm"
          >
            <h3 className="text-2xl md:text-3xl text-[#262626] font-medium mb-4">
              Our Vision
            </h3>
            <p className="text-[#262626] text-sm md:text-base max-w-full">
              To become a trusted global leader in medical education by shaping
              highly skilled, confident, and practice-ready doctors through excellence
              in training, innovation, and continuous learning.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
