"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { useRef, useState } from "react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from 'swiper/react'

import { isMobile } from "react-device-detect"

gsap.registerPlugin(ScrollTrigger);

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
    <div className="relative h-auto overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl  mx-auto px-4 lg:py-12 py-6 relative bg-[#FAFAFA] ">
        <div className="lg:pr-24">
          <div className="flex lg:flex-row flex-col lg:gap-x-52 gap-0 mb-0 w-full">
            <div className='lg:w-[59%] w-full'>
              <span className="text-[#262626] font-medium text-sm  mb-4">Courses</span>
              <h2 className="text-5xl text-[#262626] leading-[1.1] mb-8 tracking-tighter text-nowrap font-medium ">
                Explore Our Training <br /> Programs
              </h2>
              <p className="text-sm ">
                Praxis offers focused medical training programs tailored to enhance clinical <br className="lg:block hidden" />
                capability across various specialties and skill levels.
              </p>
            </div>
          </div>
        </div>
        <div className="relative mt-10">
          <Swiper
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            spaceBetween={20}
            slidesPerView={1}
            modules={[Navigation]}
            className="mySwiper"
            navigation={{
              prevEl,
              nextEl,
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 3, spaceBetween: 20 },
              1440: { slidesPerView: 3.5, spaceBetween: 20 },
              1920: { slidesPerView: 3.5, spaceBetween: 20 },
            }}
          >
            {blogPosts.map((post, index) => (
              <SwiperSlide
                key={index}
                className={`w-full ${index === activeIndex && !isMobile ? 'first-visible-slide' : ''}`}
              >
                <div className={`bg-[#FAFAFA]  rounded-lg overflow-hidden h-full flex flex-col`}>
                  <div className="w-full">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-auto rounded-xl object-cover aspect-[5.9/3] border border-white border-2"
                    />
                  </div>
                  <div className="py-6 lg:px-2 px-1 flex flex-col w-full">
                    <h3 className="mb-2 text-lg font-medium text-[#262626]">{post.title}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-between items-center mt-12 px-2">
            <div className="flex gap-4">
              <button
                ref={(node) => setPrevEl(node)}
                className="w-12 h-12 rounded-full bg-[#33187F] text-white flex items-center justify-center hover:bg-opacity-90 transition shadow-lg cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                ref={(node) => setNextEl(node)}
                className="w-12 h-12 rounded-full bg-[#33187F] text-white flex items-center justify-center hover:bg-opacity-90 transition shadow-lg cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <Link href="/courses">
              <button className="flex items-center gap-3 bg-[#33187F] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition group font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:scale-125 transition"></span>
                See All Programs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
