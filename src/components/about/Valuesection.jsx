"use client";

import Image from "next/image";

export default function Valuesection() {
  return (
    <section className="w-full px-4 md:px-4 py-24 bg-[#FAFAFA]  overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 border border-white  ">
          <div className="lg:w-[45%]">
            <span className="text-[#262626] font-medium text-sm tracking-widest mb-1 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-5xl text-[#262626] leading-[1.1] tracking-tighter font-medium">
              Learning That <br /> Transforms Practice
            </h2>
          </div>
          <div className="lg:w-[45%]">
            <p className="text-[#4B5563] text-sm md:text-base leading-relaxed font-medium lg:max-w-xl">
              We believe that every surgeon learns differently. The "Case-Only" model is outdated and inefficient. Our philosophy is rooted in Precision Education, identifying the specific technical and cognitive needs of the individual and providing a 360-degree support structure to meet them.
            </p>
          </div>
        </div>

        {/* Grid Layout Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-stretch h-full">

          {/* Left Column: Mission + val1 */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="bg-[#EEEEEE] rounded-[1.5rem] px-5 py-2  flex flex-col grow justify-center">
              <h3 className="text-xl font-medium text-[#262626] mb-4 text-center">
                Our Mission
              </h3>
              <p className="text-[#4B5563] text-sm leading-relaxed text-center">
                To redefine surgical education through The Surgical Gene framework—a 360-degree ecosystem that combines bespoke skill curation, elite wetlab training at prominent market hubs, and individualized digital mentorship. We are committed to bridging the gap between potential and mastery, providing surgeons with the continuous support and 'Digital Synapse' needed to perform at the pinnacle of their craft."
              </p>
            </div>
            <div className="relative w-full aspect-[14/9] rounded-[1.5rem] overflow-hidden shadow-sm">
              <Image src="/home/val1.svg" alt="Value 1" fill className="object-cover" />
            </div>
          </div>

          {/* Middle Column: val2 (Tall) */}
          <div className="md:col-span-4 min-h-[200px] lg:min-h-0">
            <div className="relative h-full w-full rounded-[1.5rem] overflow-hidden shadow-sm">
              <Image src="/home/val2.svg" alt="Value 2" fill className="object-cover" />
            </div>
          </div>

          {/* Right Column: Vision + val3 */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="bg-[#EEEEEE] rounded-[1.5rem] px-5 py-2 flex flex-col grow justify-center">
              <h3 className="text-xl font-medium text-[#262626] mb-4 text-center">
                Our Vision
              </h3>
              <p className="text-[#4B5563] text-sm leading-relaxed text-center">
                To be the global architect of surgical excellence, where every medical professional has the
                digital and physical infrastructure to evolve their skills without limits, ensuring a world of 100%
                risk-free, precision-led patient care.
              </p>
            </div>
            <div className="relative w-full aspect-[12/9] rounded-[1.5rem] overflow-hidden shadow-sm">
              <Image src="/home/val3.svg" alt="Value 3" fill className="object-cover" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
