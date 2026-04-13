"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Herosection() {
  return (
    <section className="w-full px-4 md:px-10 lg:px-20 bg-[#FAFAFA]  overflow-hidden lg:pt-40 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-[3.5vw] text-[#262626] font-medium mb-5 tracking-tighter"
        >
          The Training Journey
        </motion.h1>

        {/* content grid */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-10 w-full lg:w-[52%]"
          >
            <div className="relative w-full aspect-[20/10] overflow-hidden border border-white border-2 rounded-[2rem] group">
              <Image
                src="/courses/img1.svg"
                alt="The Training Journey"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
            </div>

            <p className="text-[#4B5563] text-sm md:text-base leading-relaxed font-normal lg:pr-0">
              We believe that every surgeon learns differently. The "Case-Only" model is
              outdated and inefficient. Our philosophy is rooted in Precision
              Education, identifying the specific technical and cognitive needs of the
              individual and providing a 360-degree support structure to meet them.
            </p>
          </motion.div>

          {/* Right Column - Tall Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full lg:min-h-0 aspect-[3.5/4] lg:aspect-[5/4] h-full overflow-hidden border border-white border-2 rounded-[2rem] group w-full lg:w-[46%]"
          >
            <Image
              src="/courses/img2.svg"
              alt="Expert Training"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
