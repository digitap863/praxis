"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Who Are Praxis Training Programs Designed For?",
    answer: "Praxis programs are created for qualified medical doctors seeking to strengthen their clinical skills, improve procedural confidence, and stay aligned with modern evidence-based practices. We also collaborate with healthcare institutions aiming to elevate clinical standards across their teams.",
  },
  {
    question: "How Is Praxis Different From Traditional Medical Education?",
    answer: "Unlike traditional lecture-based education, Praxis focuses on hands-on procedural training and real-world clinical application using advanced simulations and senior mentorship.",
  },
  {
    question: "Are The Training Programs Evidence-Based?",
    answer: "Yes, all our curriculum and clinical protocols are derived from the latest peer-reviewed medical research and international clinical guidelines.",
  },
  {
    question: "What Types Of Skills Will I Develop At Praxis?",
    answer: "You will develop both technical procedural skills and clinical decision-making capabilities across various specialties, depending on your chosen pathway.",
  },
  {
    question: "Who Conducts The Training Sessions?",
    answer: "Training sessions are led by senior surgeons, specialized clinicians, and experts with extensive experience in their respective medical fields.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full px-3 md:px-10 lg:px-20 md:py-24 py-10 bg-[#FAFAFA] ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

          {/* Left: FAQ Content */}
          <div className="w-full lg:w-[55%]">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="md:mb-10 mb-6"
            >
              <span className="text-[#262626] font-medium text-sm  mb-2 block uppercase">
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl text-[#262626] leading-[1.1] tracking-tighter font-medium">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b border-gray-200"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                    className="w-full py-5 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-xl font-medium transition-colors ${openIndex === index ? 'text-blue-600' : 'text-blue-500'}`}>
                        {openIndex === index ? "−" : "+"}
                      </span>
                      <span className="text-lg md:text-xl font-medium text-[#262626] group-hover:text-blue-600 transition-colors">
                        {faq.question}
                      </span>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <p className="text-[#4B5563] text-sm md:text-base leading-relaxed pl-9">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-[45%] sticky top-24 self-start"
          >
            <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square w-full rounded-[2.5rem] overflow-hidden shadow-xl">
              <Image
                src="/home/faqimg.png"
                alt="Medical Professional in Surgery"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
