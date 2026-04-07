"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <nav className="w-full fixed top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 py-3">
        <div className="flex items-center justify-between">

          {/* 🔹 Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/home/logo.png" // put inside public folder
              alt="logo"
              className="w-auto h-auto"
              width={270}
              height={150}

            />
          </div>

          {/* 🔹 Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <Link
                  href={link.path}
                  className="text-[#262626] font-medium hover:text-purple-600 transition text-sm lg:text-base"
                >
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
            <Link href="/contact" className="flex items-center gap-2 bg-[#33187F] text-white px-5 py-2 rounded-full hover:bg-purple-800 transition">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
              Contact us
            </Link>
          </div>

          {/* 🔹 Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-purple-700"
          >
            ☰
          </button>
        </div>

        {/* 🔹 Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96 mt-4" : "max-h-0"
            }`}
        >
          <div className="flex flex-col gap-4 bg-[#FAFAFA]  p-4 rounded-xl shadow-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-gray-700 font-medium hover:text-purple-600"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link href="/contact" className="flex items-center gap-3 bg-[#1E1B4B] text-white px-6 py-2.5 rounded-full hover:bg-opacity-90 transition text-sm font-medium" onClick={() => setOpen(false)}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}