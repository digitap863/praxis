"use client";

import React, { useState } from "react";
import Image from "next/image";

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
    <section className="w-full px-4 md:px-10 lg:px-20 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          
          {/* Left: FAQ Content */}
          <div className="w-full lg:w-[55%]">
            <div className="mb-10">
              <span className="text-[#262626] font-medium text-sm tracking-widest mb-2 block uppercase">
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl text-[#262626] leading-[1.1] tracking-tighter font-medium">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200">
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
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-[#4B5563] text-sm md:text-base leading-relaxed pl-9">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-[45%] sticky top-24 self-start">
            <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square w-full rounded-[2.5rem] overflow-hidden shadow-xl">
              <Image
                src="/home/faqimg.png"
                alt="Medical Professional in Surgery"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
