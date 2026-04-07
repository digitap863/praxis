"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
              className="w-auto h-10"
              width={290}
              height={170}

            />
          </div>

          {/* 🔹 Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <Link
                  href={link.path}
                  className={`flex items-center gap-1.5 font-medium transition text-sm lg:text-base ${
                    pathname === link.path ? "text-[#262626]" : "text-gray-500 hover:text-purple-600"
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
                className={`flex items-center gap-2 font-medium transition ${
                  pathname === link.path ? "text-purple-700" : "text-gray-700 hover:text-purple-600"
                }`}
                onClick={() => setOpen(false)}
              >
                {pathname === link.path && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                )}
                {link.name}
              </Link>
            ))}

            <Link href="/contact" className="flex items-center gap-3 bg-[#1E1B4B] text-white px-6 py-2.5 rounded-full hover:bg-opacity-90 transition text-sm font-medium group" onClick={() => setOpen(false)}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-pink-500 transition-all duration-300"></span>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}