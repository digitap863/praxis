"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/navigation"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from 'swiper/react'


const blogPosts = [
  {
    id: 1,
    title: "From Theory to Practice",
    category: "ARTICLE",
    date: "JAN 18, 2023",
    image: "/home/blogimg.png",
    excerpt: "Learn the essential strategies to attract investors and secure the funding your startup needs to grow.",
    featured: true,
  },
  {
    id: 2,
    title: "Procedural Skills Training",
    category: "ARTICLE",
    date: "JAN 15, 2023",
    image: "/home/blogimg.png",
    excerpt: "Discover how effective branding can set your startup apart from competitors.",
  },
  {
    id: 3,
    title: "Acute & Critical Care Training",
    category: "GUIDE",
    date: "JAN 12, 2023",
    image: "/home/blogimg.png",
    excerpt: "A curated list of the best business blogs every entrepreneur should follow.",
  },
  {
    id: 4,
    title: "From Theory to Practice",
    category: "GUIDE",
    date: "JAN 10, 2023",
    image: "/home/blogimg.png",
    excerpt: "Implement these proven strategies to triple your business growth in record time.",
  },
  {
    id: 5,
    title: "Procedural Skills Training",
    category: "ARTICLE",
    date: "JAN 8, 2023",
    image: "/home/blogimg.png",
    excerpt: "How to create a business model that stands the test of time and market fluctuations.",
  },
  {
    id: 6,
    title: "Acute & Critical Care Training",
    category: "GUIDE",
    date: "JAN 12, 2023",
    image: "/home/blogimg.png",
    excerpt: "A curated list of the best business blogs every entrepreneur should follow.",
  },
  {
    id: 7,
    title: "Diagnostics & Clinical Decision-Making",
    category: "GUIDE",
    date: "JAN 12, 2023",
    image: "/home/blogimg.png",
    excerpt: "A curated list of the best business blogs every entrepreneur should follow.",
  },
]

export default function Blog() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)



  return (
    <div className="relative h-auto overflow-hidden bg-[#FAFAFA]  relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 lg:py-12 py-6 relative bg-[#FAFAFA] ">
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
              <h2 className="text-5xl text-[#262626] leading-[1.1] mb-8 tracking-tighter text-nowrap font-medium ">
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
            {blogPosts.map((post, index) => (
              <SwiperSlide
                key={index}
                className={`w-full`}
              >
                <motion.div 
                  // initial={{ opacity: 0, y: 30 }}
                  // whileInView={{ opacity: 1, y: 0 }}
                  // viewport={{ once: true }}
                  // transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-[#FAFAFA]  rounded-lg overflow-hidden h-full flex flex-col`}
                >
                  <div className="w-full">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-auto rounded-xl object-cover aspect-[4.5/3]"
                    />
                  </div>
                  <div className="py-4 lg:px-2 px-1 flex flex-col w-full">
                    <h3 className="mb-2 text-lg font-medium text-[#262626]">{post.title}</h3>
                    <p className="text-sm text-[#262626]">{post.excerpt}</p>
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
