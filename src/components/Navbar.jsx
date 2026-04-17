"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full fixed top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-4 py-3">
        <div className="flex items-center justify-between">

          {/* 🔹 Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/home/logo.png"
              alt="logo"
              className="w-auto h-10"
              width={290}
              height={170}
              loading="eager"
              priority
            />
          </div>

          {/* 🔹 Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <Link
                  href={link.path}
                  className={`flex items-center gap-1.5 font-medium transition text-sm lg:text-base ${pathname === link.path ? "text-[#262626]" : "text-gray-500 hover:text-purple-600"
                    }`}
                >
                  {pathname === link.path && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
                  )}
                  {link.name}
                </Link>
                {index < navLinks.length - 1 && (
                  <span className="text-gray-800 pointer-events-none text-sm">/</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* 🔹 Contact Button */}
          <div className="hidden md:block">
            <Link href="/contact" className="flex items-center gap-2 bg-[#33187F] text-white px-5 py-2.5 rounded-full hover:bg-purple-800 transition group shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block group-hover:bg-pink-500  transition-all duration-300"></span>
              Contact us
            </Link>
          </div>

          {/* 🔹 Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-3xl text-purple-700"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* 🔹 Mobile Menu Overlay */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="fixed inset-0 z-[200] md:hidden bg-gradient-to-br from-[#1E1B4B] via-[#311A86] to-[#0F172A] flex flex-col p-8"
            >
              {/* Top Header inside Overlay */}
              <div className="flex items-center justify-between mb-20">
                <Image
                  src="/home/logo.png"
                  alt="logo"
                  className="w-auto h-10 brightness-0 invert"
                  width={290}
                  height={170}
                />
                <button
                  onClick={() => setOpen(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col gap-8 items-center justify-center flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      href={link.path}
                      className={`text-4xl font-medium transition-all duration-300 ${
                        pathname === link.path ? "text-blue-400" : "text-white/80 hover:text-white"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto w-full"
              >
                <Link 
                  href="/contact" 
                  className="flex justify-center items-center gap-3 bg-white text-[#1E1B4B] w-full py-5 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all active:scale-95 rounded-full "
                  onClick={() => setOpen(false)}
                >
                 <span className="w-2.5 h-2.5  rounded-full bg-blue-400 inline-block group-hover:bg-pink-500  transition-all duration-300"></span>
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}