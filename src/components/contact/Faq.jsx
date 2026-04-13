"use client";

import { motion } from "framer-motion";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const faqs = [
  {
    question: "Who are Praxis training programs designed for?",
    answer: "Praxis programs are created for qualified medical doctors seeking to strengthen their clinical skills",
  },
  {
    question: "Are the training programs evidence-based?",
    answer: "Praxis programs are created for qualified medical doctors seeking to strengthen their clinical skills",
  },
  {
    question: "What types of skills will I develop at Praxis?",
    answer: "Praxis programs are created for qualified medical doctors seeking to strengthen their clinical skills",
  },
  {
    question: "How long are the training sessions?",
    answer: "Praxis programs are created for qualified medical doctors seeking to strengthen their clinical skills",
  },
];

export default function ContactFaq() {
  return (
    <section className="w-full px-4 md:px-10 lg:px-20 md:py-10 py-10 bg-[#FAFAFA]  overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl text-[#262626] font-medium leading-[1.1] tracking-tighter"
        >
          Frequently Asked <br /> Questions
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full"
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.8,
              },
            }}
            className="w-full"
          >
            {faqs.map((faq, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#EEEEEE] rounded-[1.5rem] p-6 min-h-[160px] flex flex-col gap-4 shadow-sm transition-all duration-300 border border-2 border-white hover:-translate-y-1">
                  <h3 className="text-lg  font-medium text-[#262626] leading-snug">
                    {faq.question}
                  </h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
