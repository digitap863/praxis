"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const aboutImages = [
    { src: "/home/abouimg1.png", width: 20 },
    { src: "/home/abouimg2.png", width: 30 },
    { src: "/home/abouimg3.png", width: 20 },
    { src: "/home/abouimg4.png", width: 20 },
     { src: "/home/abouimg1.png", width: 20 },
    { src: "/home/abouimg2.png", width: 30 },
    { src: "/home/abouimg3.png", width: 20 },
    { src: "/home/abouimg4.png", width: 20 },
];

export default function AboutHero() {
    return (
        <section className="w-full py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4   md:pt-20">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium text-[#262626] leading-[1.1] tracking-tighter">
                        Learning That <br /> Transforms Practice
                    </h1>
                </div>
            </div>

            <div className="w-full">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={10}
                    slidesPerView="auto"      // ← key change: lets each slide control its own width
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    className="w-full"
                >
                    {aboutImages.map((img, index) => (
                        <SwiperSlide
                            key={index}
                            style={{ width: `${img.width}vw` }}
                        >
                            <div className="relative w-full h-[280px] md:h-[300px] rounded-xl overflow-hidden shadow-sm">
                                {/* ↑ replace aspect-[4/3] md:aspect-[16/10] with a fixed height */}
                                <Image
                                    src={img.src}
                                    alt={`About Praxis ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}