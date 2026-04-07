"use client";

import Image from "next/image";
import React from "react";

export default function About() {
  const supportList = [
    "Hands-on procedural training",
    "Continuous professional development",
    "Evidence-based curriculum"
  ];

  return (
    <section className="w-full px-4 md:px-2 py-20 bg-[#FAFAFA]  overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* 🔹 Top Support Pillar Section (The 360° Support Pillar) */}
        <div className="w-full bg-[#F3F3F3]/70 rounded-[1.2rem] px-28 py-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md w-full">
            <h2 className="text-3xl md:text-4xl font-medium text-[#262626] mb-6 tracking-tight">
              The 360° <br /> Support Pillar
            </h2>
            <button className="flex items-center gap-3 bg-[#33187F] text-white px-8 py-3.5 rounded-full hover:bg-opacity-90 transition shadow-lg group font-medium whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-125 transition"></span>
              Explore the Praxis Method
            </button>
          </div>

          <div className="w-full md:w-auto">
            <ul className="space-y-4 text-[#4B5563] font-medium text-lg lg:text-xl">
              {supportList.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E879F9] flex-shrink-0 animate-pulse"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 🔹 Bottom Content Section (Learning That Transforms Practice) */}
        <div className="flex flex-col lg:flex-row items-stretch gap-16 lg:gap-24">

          {/* Left: Content Area */}
          <div className="w-full lg:w-[40%] flex flex-col text-left">
            <span className="text-[#262626] font-medium text-sm tracking-widest mb-4">About Us</span>
            <h2 className="text-5xl text-[#262626] leading-[1.1] mb-8 tracking-tighter text-nowrap">
              Learning That <br /> Transforms Practice
            </h2>

            <div className="mt-auto">
              <p className="text-[#4B5563] text-sm leading-relaxed mb-10 max-w-lg">
                At Praxis, your evolution is powered by The Digital Synapse —
                individualized attention from senior surgeons and 24/7 digital
                mentorship that follows you into your own operating theater.
              </p>
              <button className="flex items-center gap-3 bg-[#262626] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition shadow-lg group font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-125 transition"></span>
                Learn More
              </button>
            </div>
          </div>

          {/* Right: The Flex Layout */}
          <div className="w-full lg:w-[72%] space-y-4 md:space-y-6">

            {/* Row 1: Items 1, 2, 3, 3.5 */}
            <div className="flex gap-4 md:gap-6 w-full">
              {/* Item 1: 40+ */}
              <div className="w-[calc(28%-0.75rem)] bg-[#EEEEEE] rounded-[2rem] p-4 md:p-6 flex flex-col justify-center items-center text-center aspect-[4.5/5]">
                <span className="text-4xl md:text-5xl font-medium text-[#262626] mb-2 font-neuropolitical" style={{ fontFamily: "var(--font-neuropolitical), sans-serif" }} >40+</span>
                <p className="text-[#262626] font-bold text-[8px] md:text-xs uppercase leading-tight tracking-widest">
                  Original <br /> Equipments
                </p>
              </div>

              {/* Item 2: Machine */}
              <div className="w-[calc(28%-0.75rem)] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-[4.5/5] relative">
                <Image src="/home/about1.png" alt="Medical Machine" fill className="object-cover transition-transform hover:scale-110 duration-500" />
              </div>

              {/* Item 3: Screen */}
              <div className="w-[calc(28%-0.75rem)] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-[4.5/5] relative">
                <Image src="/home/about2.png" alt="Medical Screen" fill className="object-cover transition-transform hover:scale-110 duration-500" />
              </div>

              {/* Item 3.5: Spacer */}
              <div className="w-[calc(5%-0.5rem)] overflow-hidden relative hidden md:block">
              </div>
            </div>

            {/* Row 2: Items 3.9, 4, 5, 6 */}
            <div className="flex gap-4 md:gap-6">
              {/* Item 3.9: Spacer */}
              <div className="w-[calc(15%-0.75rem)] rounded-[2.5rem] overflow-hidden aspect-[4.5/5] relative hidden md:block">
              </div>

              {/* Item 4: Textured Object (about4) */}
              <div className="w-[calc(28%-0.75rem)] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-[4.5/5] relative bg-[#EBEBEB]">
                <Image src="/home/about4.png" alt="Textured Object" fill className="object-cover p-2 md:p-4 transition-transform hover:scale-110 duration-500" />
              </div>

              {/* Item 5: 10Y */}
              <div className="w-[calc(28%-0.75rem)] bg-[#EEEEEE] rounded-[2rem] p-4 md:p-6 flex flex-col justify-center items-center text-center aspect-[4.5/5]">
                <span className="text-4xl md:text-5xl font-medium text-[#262626] mb-2 tracking-tighter uppercase font-neuropolitical" style={{ fontFamily: "var(--font-neuropolitical), sans-serif" }} >10y</span>
                <p className="text-[#262626] font-bold text-[8px] md:text-xs uppercase leading-tight tracking-widest">
                  Of Expertise
                </p>
              </div>

              {/* Item 6: Laptop Hands */}
              <div className="w-[calc(28%-0.75rem)] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-[4.5/5] relative">
                <Image src="/home/about3.png" alt="Gloved Hands Laptop" fill className="object-cover transition-transform hover:scale-110 duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Section: Marquee & Why Praxis Image */}
      <div className="mt-24 space-y-20">

        {/* Marquee Section */}
        <div className="w-full overflow-hidden py-2 bg-[#FAFAFA] ">
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
            {/* Multiple renders for seamless loop */}
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-[#0A7BFF] text-3xl md:text-5xl font-medium uppercase tracking-tighter" style={{ fontFamily: "var(--font-neuropolitical), sans-serif" }}>
                  From Knowledge to Clinical Mastery
                </span>
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl flex-shrink-0 bg-[#FAFAFA] ">
                  <Image src="/home/marimg.png" alt="Marquee Icon" width={80} height={80} className="object-cover rounded-xl" />
                </div>
                <span className="text-[#0A7BFF] text-3xl md:text-5xl font-medium uppercase tracking-tighter" style={{ fontFamily: "var(--font-neuropolitical), sans-serif" }}>
                  The Science of Healing, The Art of Care
                </span>
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl flex-shrink-0 bg-[#FAFAFA] ">
                  <Image src="/home/marimg.png" alt="Marquee Icon 2" width={80} height={80} className=" rounded-xl" />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Why Doctors Choose Praxis Image */}
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="relative w-full rounded-[3rem] overflow-hidden ">
            <Image
              src="/home/aboutimg.png"
              alt="Why Doctors Choose Praxis"
              width={1600}
              height={900}
              className="w-full h-auto object-cover"
            />
            {/* Overlay Text */}
            <div className="absolute top-[45%] left-10 md:top-[45%] md:left-24 max-w-sm">
              <h2 className="text-white text-3xl md:text-5xl font-medium  ">
                Why Doctors <br /> Choose Praxis?
              </h2>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
