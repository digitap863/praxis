"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/navigation"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from 'swiper/react'


import { useUserBlogStore } from "@/store/blogStore"
import { useEffect } from "react"
import Link from "next/link"

// Helper to strip HTML and create excerpt
const createExcerpt = (html, maxLength = 100) => {
  if (!html) return "";
  const plainText = html.replace(/<[^>]*>/g, "");
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + "..." 
    : plainText;
};

export default function Blog() {
  const { blogs, loading, fetchBlogs } = useUserBlogStore()
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    fetchBlogs({ limit: 8 })
  }, [fetchBlogs])

  if (loading && blogs.length === 0) {
    return (
      <div className="w-full py-24 bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#33187F]/20 border-t-[#33187F] rounded-full animate-spin" />
      </div>
    )
  }

  if (blogs.length === 0) return null



  return (
    <div className="relative h-auto overflow-hidden bg-[#FAFAFA]  relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-3 lg:py-12 py-6 relative bg-[#FAFAFA] ">
        <div className="lg:pr-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="flex lg:flex-row flex-col lg:gap-x-52 gap-0 mb-0 w-full"
          >
            <div className='lg:w-[59%] w-full'>
              <span className="text-[#262626] font-medium text-sm  mb-4">Blogs</span>
              <h2 className="md:text-5xl text-4xl text-[#262626] leading-[1.1] mb-8 tracking-tighter text-nowrap font-medium ">
                News and Events
              </h2>
            </div>
          </motion.div>
        </div>
        <div className="relative">
          <Swiper
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            spaceBetween={10}
            slidesPerView={1}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            navigation={{
              prevEl: '.slidePrev-btnn',
              nextEl: '.slideNext-btnn'
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 10 },
              1024: { slidesPerView: 3, spaceBetween: 10 },
              1280: { slidesPerView: 3, spaceBetween: 10 },
              1440: { slidesPerView: 3.5, spaceBetween: 10 },
              1920: { slidesPerView: 3.5, spaceBetween: 10 },
            }}
          >
            {blogs.map((post, index) => (
              <SwiperSlide
                key={post._id || index}
                className={`w-full`}
              >
                <motion.div 
                  className={`bg-[#FAFAFA] rounded-lg overflow-hidden h-full flex flex-col group`}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="w-full relative overflow-hidden rounded-xl">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-auto object-cover aspect-[4.5/3] transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="py-4 lg:px-2 px-1 flex flex-col w-full">
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="mb-2 text-lg font-medium text-[#262626] hover:text-[#33187F] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-[#6B7280] line-clamp-3">
                      {createExcerpt(post.content)}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>


        </div>
      </div>
    </div>
  )
}
