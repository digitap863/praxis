
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Skill-Gap Analysis",
    description:
      "Before you touch a handpiece, we conduct a deep-dive analysis of your current surgical proficiency to identify specific areas for improvement.",
    image: "/home/why1.png",
  },
  {
    title: "Bespoke Curriculum",
    description:
      'No "one-size-fits-all." We curate your course objectives based on your assessment, focusing on the specific maneuvers and technologies you need to master.',
    image: "/home/why2.png",
  },
  {
    title: "Real-World Simulation",
    description:
      "Train in environments that mirror actual OR conditions — from instrumentation to patient positioning — so you're prepared before day one.",
    image: "/home/why3.png",
  },
];

const HERO_BUDGET = 600;

export default function WhyPraxis() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const firstCardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile on mount and resize
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const section = sectionRef.current;
      const cardsContainer = cardsContainerRef.current;
      const firstCard = firstCardRef.current;

      if (!section || !cardsContainer || !firstCard) return;

      const getHScrollDist = () =>
        cardsContainer.scrollWidth - cardsContainer.offsetWidth;

      // ── Set first card's initial "hero" position for desktop ─────────────
      const setHeroState = () => {
        const sectionRect = section.getBoundingClientRect();
        const cardRect = firstCard.getBoundingClientRect();
        
        // Calculate scale to make card roughly 90% of section width
        const targetScale = (sectionRect.width * 0.87) / cardRect.width;
        
        // Calculate X to center the card exactly
        const targetX = (sectionRect.width / 2) - (cardRect.left - sectionRect.left + cardRect.width / 2);

        gsap.set(firstCard, {
          x: targetX,
          y: 50,
          scale: targetScale,
          zIndex: 10,
          transformOrigin: "center center",
        });

        // Hide other cards initially
        const otherCards = gsap.utils.toArray(".praxis-card-desktop").slice(1);
        gsap.set(otherCards, { opacity: 0 });
      };

      setHeroState();
      ScrollTrigger.addEventListener("refreshInit", setHeroState);

      const tl = gsap.timeline();

      // Phase 1 — hero card settles
      tl.to(firstCard, {
        x: 0,
        y: 0,
        scale: 1,
        zIndex: 1,
        ease: "power2.inOut",
        duration: HERO_BUDGET,
      });

      // Show other cards after hero settles
      const otherCards = gsap.utils.toArray(".praxis-card-desktop").slice(1);
      tl.to(otherCards, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 300, // Small part of the budget or fixed duration? 
        ease: "power2.out",
      });

      // Phase 2 — horizontal scroll
      tl.to(cardsContainer, {
        x: () => -getHScrollDist(),
        ease: "none",
        duration: () => getHScrollDist(),
      });

      ScrollTrigger.create({
        animation: tl,
        trigger: cardsContainer,
        start: "top 27%",
        end: () => `+=${HERO_BUDGET + getHScrollDist()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers:true
      });

      // Remove old standalone stagger

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", setHeroState);
      };
    });

    return () => {
      mm.revert();
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen bg-[#FAFAFA] flex flex-col overflow-hidden px-6 md:px-16 py-16 gap-12 mx-auto "
    >
      {/* Heading + description */}
      <div className="w-full max-w-7xl mx-auto">
      <div className="flex-shrink-0 w-full  ">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
          Why Doctors
          <br />
          Choose Praxis?
        </h2>
        <p className="mt-5 text-sm md:text-base text-gray-500 leading-relaxed max-w-3xl">
          Praxis bridges the critical gap between classroom knowledge and
          real-world medical practice through structured, practical, and
          clinically relevant training.
        </p>
      </div>
      </div>

      {/* Desktop View (GSAP Horizontal Scroll) */}
      {!isMobile && (
        <div className="hidden md:block flex-1 overflow-visible w-full pt-40">
          <div
            ref={cardsContainerRef}
            className="flex flex-row md:gap-12 md:flex-nowrap will-change-transform"
          >
            {cards.map((card, i) => (
              <div
                key={i}
                ref={i === 0 ? firstCardRef : null}
                className="praxis-card-desktop flex-shrink-0 w-full md:w-[420px] lg:w-[600px] group cursor-pointer will-change-transform"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[5/3] bg-gray-100 shadow-md">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-white text-xl font-medium tracking-tight">
                    {card.title}
                  </span>
                </div>
                <p className="mt-4 ml-4 text-sm text-gray-900 leading-relaxed px-1">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile View (Swiper Carousel) */}
      {isMobile && (
        <div className="md:hidden w-full space-y-10">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1.15}
            navigation={{
              prevEl: ".why-swiper-prev",
              nextEl: ".why-swiper-next",
            }}
            className="w-full !overflow-visible"
          >
            {cards.map((card, i) => (
              <SwiperSlide key={i} className="pb-4">
                <div className="flex flex-col gap-5">
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm border border-gray-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-5 left-5 text-white text-xl font-medium tracking-tight">
                      {card.title}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed px-1">
                    {card.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="flex justify-end gap-4 pr-4">
            <button className="why-swiper-prev w-14 h-14 rounded-full border border-[#311A86] flex items-center justify-center text-[#311A86] active:scale-95 transition-all disabled:opacity-50">
              <IoArrowBack size={28} />
            </button>
            <button className="why-swiper-next w-14 h-14 rounded-full flex items-center justify-center text-[#311A86] active:scale-95 transition-all disabled:opacity-30  border border-[#311A86] ">
              <IoArrowForward size={28} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
