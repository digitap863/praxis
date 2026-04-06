"use client";

import React from "react";
import Image from "next/image";

export default function Herosection() {
  return (
    <section className="w-full px-4 md:px-10 lg:px-20 bg-white overflow-hidden lg:pt-40">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl text-[#262626] font-medium mb-2 tracking-tighter">
          The Training Journey
        </h1>

        {/* content grid */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Left Column */}
          <div className="flex flex-col gap-10 w-full lg:w-[52%]">
            <div className="relative w-full aspect-[20/10]  overflow-hidden shadow-sm">
                <Image 
                    src="/courses/img1.svg" 
                    alt="The Training Journey" 
                    fill 
                    className="object-contain"
                    priority
                />
            </div>
            
            <p className="text-[#4B5563] text-sm md:text-base leading-relaxed font-normal lg:pr-0">
              We believe that every surgeon learns differently. The "Case-Only" model is 
              outdated and inefficient. Our philosophy is rooted in Precision 
              Education, identifying the specific technical and cognitive needs of the 
              individual and providing a 360-degree support structure to meet them.
            </p>
          </div>

          {/* Right Column - Tall Image */}
          <div className="relative w-full lg:min-h-0 aspect-[3.5/4] lg:aspect-[5/4] h-full overflow-hidden shadow-sm w-full lg:w-[46%]">
            <Image 
                src="/courses/img2.svg" 
                alt="Expert Training" 
                fill 
                className="object-contain object-left"
                priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
