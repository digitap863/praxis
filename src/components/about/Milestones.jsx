"use client";

import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const milestones = [
  {
    value: "95",
    suffix: "%",
    label: "Client Satisfaction",
  },
  {
    value: "20",
    suffix: "Y",
    label: "Of Expertise",
  },
  {
    value: "10",
    suffix: "K+",
    label: "Students Trained",
  },
  {
    value: "99",
    suffix: "%",
    label: "Reliability",
  },
];

function Counter({ value, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, parseInt(value), {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setVal(Math.round(latest)),
      });
      return controls.stop;
    }
  }, [inView, value]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function Milestones() {
  return (
    <section className="w-full py-4 bg-[#FAFAFA] ">
      <div className="max-w-7xl mx-auto px-4 md:px-4 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl text-[#262626] font-medium mb-16 tracking-tight "
        >
          Milestones that define excellence
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#EEEEEE] rounded-[2rem] p-10 flex flex-col items-center justify-center text-center border border-white border-2 shadow-sm"
            >
              <span className="text-4xl md:text-5xl font-medium text-[#262626] mb-3 font-neuropolitical " style={{ fontFamily: "var(--font-neuropolitical), sans-serif" }}>
                <Counter value={item.value} suffix={item.suffix} />
              </span>
              <p className="text-sm md:text-base font- text-[#6B7280]  ">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
