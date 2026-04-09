"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full px-4 md:px-5 py-10">
      {/* 🔹 Top Gradient CTA Section */}
      <div className="relative w-full max-w-7xl mx-auto rounded-[3rem] overflow-hidden px-10 py-10 md:px-24 md:py-20 bg-gradient-to-br from-[#D4B0FF] via-[#8594FF] to-[#0C7CFF] flex flex-col items-center text-center text-white">

        {/* Decorative Floating Images (Positioned like the mockup) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-10 left-10 hidden lg:block"
        >
          <Image src="/home/foot1.png" alt="Medical 1" width={220} height={150} className="rounded-2xl transform   transition hover:scale-105" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute top-10 right-10 hidden lg:block"
        >
          <Image src="/home/foot2.png" alt="Medical 2" width={220} height={150} className="rounded-2xl transform  transition hover:scale-105" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-16 left-28 hidden lg:block"
        >
          <Image src="/home/foot2.png" alt="Medical 3" width={220} height={150} className="rounded-2xl transform  transition hover:scale-105" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-16 right-28 hidden lg:block"
        >
          <Image src="/home/foot3.png" alt="Medical 4" width={220} height={150} className="rounded-2xl transform   transition hover:scale-105" />
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          <p className="text-white/80 text-sm font-semibold tracking-widest mb-4">Enroll Today</p>
          <h2 className="text-4xl md:text-5xl font- mb-6 tracking-tight ">
            Advance Your <br />  Clinical Confidence with Praxis
          </h2>
          <p className="text-white/90 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Join a learning environment where knowledge is applied, skills are refined,
            and doctors are prepared for the realities of modern medical practice.
          </p>

          <div className="flex flex-col gap-4 justify-center items-center">
            <button className="flex items-center gap-3 bg-[#1E1B4B] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition shadow-lg group">
              <span className="w-2 h-2 rounded-full bg-blue-400 group-hover:bg-pink-500 transition-all duration-300"></span>
              Enroll in a Program
            </button>
            <button className="flex items-center gap-3 bg-[#FAFAFA]/]  border border-white/90 text-white px-8 py-3 rounded-full hover:bg-[#FAFAFA]/30 transition group">
              <span className="w-2 h-2 rounded-full bg-pink-400  transition"></span>
              Chat with Our Team
            </button>
          </div>
        </motion.div>
      </div>

      {/* 🔹 Bottom Subscription & Logo Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-10 max-w-3xl mx-auto bg-[#EEEEEE] border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
      >
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/home/logo.png" alt="Praxis Logo" width={200} height={100} />
        </div>

        {/* Subscription Input */}
        <div className="relative w-full md:max-w-md bg-[#EEEEEE] border border-gray-400 rounded-full p-1 pl-6 flex items-center shadow-inner">
          <input
            type="email"
            placeholder="example@praxis.com"
            className="flex-grow bg-transparent border-none outline-none text-gray-700 text-sm"
          />
          <button className="flex items-center gap-3 bg-[#1E1B4B] text-white px-6 py-2.5 rounded-full hover:bg-opacity-90 transition text-sm font-medium group">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-pink-500 transition-all duration-300"></span>
            Subscribe
          </button>
        </div>
      </motion.div>

      {/* 🔹 Copyright */}
      <div className="mt-8 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Praxis Clinical Training. All rights reserved.
      </div>
    </footer>
  );
}