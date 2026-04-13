"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from 'swiper/react'

import { isMobile } from "react-device-detect"

const blogPosts = [
  {
    id: 1,
    title: "Diagnostics & Clinical Decision-Making",
    category: "ARTICLE",
    date: "JAN 18, 2023",
    image: "/home/serv1.png",
    excerpt: "Learn the essential strategies to attract investors and secure the funding your startup needs to grow.",
    featured: true,
  },
  {
    id: 2,
    title: "Procedural Skills Training",
    category: "ARTICLE",
    date: "JAN 15, 2023",
    image: "/home/serv2.png",
    excerpt: "Discover how effective branding can set your startup apart from competitors.",
  },
  {
    id: 3,
    title: "Acute & Critical Care Training",
    category: "GUIDE",
    date: "JAN 12, 2023",
    image: "/home/serv1.png",
    excerpt: "A curated list of the best business blogs every entrepreneur should follow.",
  },
  {
    id: 4,
    title: "Diagnostics & Clinical Decision-Making",
    category: "GUIDE",
    date: "JAN 10, 2023",
    image: "/home/serv2.png",
    excerpt: "Implement these proven strategies to triple your business growth in record time.",
  },
  {
    id: 5,
    title: "Procedural Skills Training",
    category: "ARTICLE",
    date: "JAN 8, 2023",
    image: "/home/serv1.png",
    excerpt: "How to create a business model that stands the test of time and market fluctuations.",
  },
  {
    id: 6,
    title: "Acute & Critical Care Training",
    category: "GUIDE",
    date: "JAN 12, 2023",
    image: "/home/serv2.png",
    excerpt: "A curated list of the best business blogs every entrepreneur should follow.",
  },
  {
    id: 7,
    title: "Diagnostics & Clinical Decision-Making",
    category: "GUIDE",
    date: "JAN 12, 2023",
    image: "/home/serv2.png",
    excerpt: "A curated list of the best business blogs every entrepreneur should follow.",
  },
]

export default function Service() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevEl, setPrevEl] = useState(null)
  const [nextEl, setNextEl] = useState(null)


  return (
    <div className="relative h-auto overflow-hidden bg-[#FAFAFA]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative">
        <div className="lg:pr-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex lg:flex-row flex-col lg:gap-x-52 gap-0 mb-0 w-full"
          >
            <div className='lg:w-[59%] w-full'>
              <span className="text-[#262626] font-medium text-xs md:text-sm mb-4 block">Courses</span>
              <h2 className="text-3xl md:text-5xl text-[#262626] leading-tight md:leading-[1.1] mb-6 md:mb-8 tracking-tighter md:text-nowrap font-medium">
                Explore Our Training <br className="hidden md:block" /> Programs
              </h2>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-2xl">
                Praxis offers focused medical training programs tailored to enhance clinical 
                capability across various specialties and skill levels.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="relative mt-12">
          <Swiper
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            spaceBetween={20}
            slidesPerView={1.15}
            modules={[Navigation]}
            className="mySwiper !overflow-visible"
            navigation={{
              prevEl,
              nextEl,
            }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1440: { slidesPerView: 3.5, spaceBetween: 24 },
            }}
          >
            {blogPosts.map((post, index) => (
              <SwiperSlide
                key={index}
                className={`pb-4 ${index === activeIndex && !isMobile ? 'first-visible-slide' : ''}`}>
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: index * 0.1 }}
                   className="flex flex-col h-full"
                >
                  <div className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden  md:aspect-[5.9/3] aspect-[4.5/3] bg-gray-100 shadow-sm border border-white border-2">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                                          {/* className="w-full h-auto rounded-xl object-cover border border-white border-2" */}

                  </div>
                  <div className="py-5 px-1">
                    <h3 className="text-xl md:text-2xl font-medium text-[#262626] leading-tight">{post.title}</h3>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-row justify-between md:justify-between items-center mt-8 md:mt-12"
          >
            <div className="hidden md:block">
              <Link href="/courses">
                <button className="flex items-center gap-3 bg-[#33187F] text-white px-8 py-3.5 rounded-full hover:bg-opacity-90 transition group font-medium text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:scale-125 transition"></span>
                  See All Programs
                </button>
              </Link>
            </div>

            <div className="flex gap-4 ml-auto">
              <button
                ref={(node) => setPrevEl(node)}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all disabled:opacity-30"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                ref={(node) => setNextEl(node)}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#311A86] text-white flex items-center justify-center hover:bg-opacity-90 transition-all shadow-lg shadow-indigo-100 disabled:opacity-30"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
