"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const aboutImages = [
    { src: "/home/abouimg1.png", width: 20 ,mobwidth: 40 },
    { src: "/home/abouimg2.png", width: 30 ,mobwidth: 60 },
    { src: "/home/abouimg3.png", width: 20 ,mobwidth: 40 },
    { src: "/home/abouimg4.png", width: 20 ,mobwidth: 40 },
    { src: "/home/abouimg1.png", width: 20 ,mobwidth: 40 },
    { src: "/home/abouimg2.png", width: 30 ,mobwidth: 60 },
    { src: "/home/abouimg3.png", width: 20 ,mobwidth: 40 },
    { src: "/home/abouimg4.png", width: 20 ,mobwidth: 40 },
];

export default function AboutHero() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section className="w-full py-20 bg-[#FAFAFA]  overflow-hidden">
            <div className="max-w-7xl mx-auto px-4  pt-10 md:pt-20">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <h1 className="text-3xl md:text-5xl font-medium text-[#262626] leading-[1.1] tracking-tighter">
                        Learning That <br /> Transforms Practice
                    </h1>
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full"
            >
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={12}
                    slidesPerView="auto"
                    loop={true}
                    speed={6000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    onSwiper={(swiper) => {
                        swiper.wrapperEl.style.transitionTimingFunction = "linear";
                    }}
                    breakpoints={{
                        769: {
                            spaceBetween: 20,
                        },
                    }}
                    className="w-full about-hero-swiper"
                >
                    {aboutImages.map((img, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ width: isMobile ? `${img.mobwidth}vw` : `${img.width + 5}vw` }}
                            className=""
                        >
                            <div className="relative w-full h-[200px] md:h-[300px] md:rounded-[2rem] rounded-2xl overflow-hidden border border-white border-2 group">
                                <Image
                                    src={img.src}
                                    alt={`About Praxis ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 60vw, 35vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </section>
    );
}