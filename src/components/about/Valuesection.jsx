"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Valuesection() {
  return (
    <section className="w-full px-4 md:px-4 py-24 bg-[#FAFAFA]  overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10 "
        >
          <div className="lg:w-[45%]">
            <span className="text-[#262626] font-medium text-sm  mb-1 block">
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
        </motion.div>

        {/* Grid Layout Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-stretch h-full">

          {/* Left Column: Mission + val1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-4 flex flex-col gap-4"
          >
            <div className="bg-[#EEEEEE] rounded-[1.5rem] px-5 py-4  flex flex-col grow justify-center border border-white border-2">
              <h3 className="text-xl font-medium text-[#262626] mb-4 text-center">
                Our Mission
              </h3>
              <p className="text-[#4B5563] text-sm leading-relaxed text-center">
                To redefine surgical education through The Surgical Gene framework—a 360-degree ecosystem that combines bespoke skill curation, elite wetlab training at prominent market hubs, and individualized digital mentorship. We are committed to bridging the gap between potential and mastery, providing surgeons with the continuous support and 'Digital Synapse' needed to perform at the pinnacle of their craft."
              </p>
            </div>
            <div className="relative w-full aspect-[14/9] rounded-[1.5rem] overflow-hidden border border-white border-2 group">
              <Image src="/home/val1.svg" alt="Value 1" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </motion.div>

          {/* Middle Column: val2 (Tall) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4 min-h-[200px] lg:min-h-0"
          >
            <div className="relative h-full w-full rounded-[1.5rem] overflow-hidden border border-white border-2 group shadow-sm min-h-[300px] md:min-h-0 ">
              <Image src="/home/val2.svg" alt="Value 2" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </motion.div>

          {/* Right Column: Vision + val3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-4 flex flex-col gap-4"
          >
            <div className="bg-[#EEEEEE] rounded-[1.5rem] px-5 py-2 flex flex-col grow justify-center border border-white border-2">
              <h3 className="text-xl font-medium text-[#262626] mb-4 text-center">
                Our Vision
              </h3>
              <p className="text-[#4B5563] text-sm leading-relaxed text-center">
                To be the global architect of surgical excellence, where every medical professional has the
                digital and physical infrastructure to evolve their skills without limits, ensuring a world of 100%
                risk-free, precision-led patient care.
              </p>
            </div>
            <div className="relative w-full aspect-[12/9] rounded-[1.5rem] overflow-hidden border border-white border-2 group">
              <Image src="/home/val3.svg" alt="Value 3" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
