// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const cards = [
//   {
//     title: "Skill-Gap Analysis",
//     description:
//       "Before you touch a handpiece, we conduct a deep-dive analysis of your current surgical proficiency to identify specific areas for improvement.",
//     image: "/home/why1.png",
//   },
//   {
//     title: "Bespoke Curriculum",
//     description:
//       'No "one-size-fits-all." We curate your course objectives based on your assessment, focusing on the specific maneuvers and technologies you need to master.',
//     image: "/home/why2.png",
//   },
//   {
//     title: "Real-World Simulation",
//     description:
//       "Train in environments that mirror actual OR conditions — from instrumentation to patient positioning — so you're prepared before day one.",
//     image: "/home/why3.png",
//   },
// ];

// export default function WhyPraxis() {
//   const sectionRef = useRef(null);
//   const cardsContainerRef = useRef(null);

//   useEffect(() => {
//     const isMobile = window.matchMedia("(max-width: 768px)").matches;
//     if (isMobile) return;

//     const section = sectionRef.current;
//     const cardsContainer = cardsContainerRef.current;

//     const ctx = gsap.context(() => {
//       const getTotalScrollWidth = () =>
//         cardsContainer.scrollWidth - cardsContainer.offsetWidth;

//       gsap.to(cardsContainer, {
//         x: () => -getTotalScrollWidth(),
//         ease: "none",
//         scrollTrigger: {
//           trigger: cardsContainer,           // ✅ pin the FULL section (heading + cards)
//           start: "top 15%",
//           end: () => `+=${getTotalScrollWidth() + 1300}`,
//           pin: true,                  // ✅ pins the whole section in place
//           scrub: 1,
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//         //   markers: true,
//         },
//       });

//       /* Stagger fade-in per card */
//       gsap.utils.toArray(".praxis-card").forEach((card, i) => {
//         gsap.from(card, {
//           opacity: 0,
//           y: 40,
//           duration: 0.6,
//           delay: i * 0.15,
//           scrollTrigger: {
//             trigger: section,
//             start: "top 80%",
//             toggleActions: "play none none none",
//           },
//         });
//       });
//     }, section);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       ref={sectionRef}  // ✅ single ref on the pinned container
//         className="w-full min-h-screen bg-[#FAFAFA] flex flex-col overflow-hidden px-6 md:px-16 py-16 gap-12"
//         >
//         {/* Heading + description — stays visible while cards scroll */}
//         <div className="flex-shrink-0 w-full lg:w-[50%]">
//             <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 leading-tight">
//             Why Doctors
//             <br />
//           Choose Praxis?
//         </h2>
//         <p className="mt-5 text-base text-gray-500 leading-relaxed">
//           Praxis bridges the critical gap between classroom knowledge and
//           real-world medical practice through structured, practical, and
//           clinically relevant training.
//         </p>
//       </div>

//       {/* Horizontally scrolling cards */}
//       <div className="flex-1 overflow-hidden w-full">
//         <div
//           ref={cardsContainerRef}
//           className="flex flex-col gap-8 md:flex-row md:gap-12 md:flex-nowrap"
//         >
//           {cards.map((card, i) => (
//             <div
//               key={i}
//               className="praxis-card flex-shrink-0 w-full md:w-[420px] lg:w-[600px] group cursor-pointer"
//             >
//               <div className="relative rounded-2xl overflow-hidden aspect-[5/3] bg-gray-100">
//                 <img
//                   src={card.image}
//                   alt={card.title}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//                 <span className="absolute bottom-4 left-4 text-white text-xl font-medium tracking-tight">
//                   {card.title}
//                 </span>
//               </div>
//               <p className="mt-4 ml-4 text-sm text-gray-900 leading-relaxed px-1">
//                 {card.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

















// "use client";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useEffect, useRef } from "react";

// const cards = [
//   {
//     title: "Skill-Gap Analysis",
//     description:
//       "Before you touch a handpiece, we conduct a deep-dive analysis of your current surgical proficiency to identify specific areas for improvement.",
//     image: "/home/why1.png",
//   },
//   {
//     title: "Bespoke Curriculum",
//     description:
//       'No "one-size-fits-all." We curate your course objectives based on your assessment, focusing on the specific maneuvers and technologies you need to master.',
//     image: "/home/why2.png",
//   },
//   {
//     title: "Real-World Simulation",
//     description:
//       "Train in environments that mirror actual OR conditions — from instrumentation to patient positioning — so you're prepared before day one.",
//     image: "/home/why3.png",
//   },
// ];

// // Scroll budget (px) dedicated to the hero-card shrink phase
// const HERO_BUDGET = 600;

// export default function WhyPraxis() {
//   const sectionRef = useRef(null);
//   const headerRef = useRef(null);
//   const cardsContainerRef = useRef(null);
//   const firstCardRef = useRef(null);
//   const firstCardDescRef = useRef(null);

//   useEffect(() => {
//     // Register plugin inside useEffect to avoid strict mode issues
//     if (typeof window !== "undefined") {
//       gsap.registerPlugin(ScrollTrigger);
//     }

//     const mm = gsap.matchMedia();

//     mm.add("(min-width: 769px)", () => {
//       const section = sectionRef.current;
//       const header = headerRef.current;
//       const cardsContainer = cardsContainerRef.current;
//       const firstCard = firstCardRef.current;
//       const firstCardDesc = firstCardDescRef.current;

//       if (!section || !cardsContainer || !firstCard || !firstCardDesc) return;

//       // Distance the row must slide left for all cards to be reachable
//       const getHScrollDist = () =>
//         cardsContainer.scrollWidth - cardsContainer.offsetWidth;

//       // ── Set first card's initial "hero" position before any scroll ─────────
//       const setHeroState = () => {
//         const sectionRect = section.getBoundingClientRect();
//         const cardRect = firstCard.getBoundingClientRect();
//         // How far we need to move the card so it appears centered in the section
//         const targetX =
//           sectionRect.left +
//           sectionRect.width / 2 -
//           (cardRect.left + cardRect.width / 2);
//         gsap.set(firstCard, {
//           x: targetX,
//           y: -30,
//           scale: 1.5,
//           zIndex: 10,
//           transformOrigin: "center center",
//           filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.22))",
//         });

//         gsap.set(firstCardDesc, { opacity: 0, height: 0 });
//       };

//       setHeroState();
//       ScrollTrigger.addEventListener("refreshInit", setHeroState);

//       // ── ONE timeline scrubbed by ONE ScrollTrigger (no jumps) ─────────────
//       const tl = gsap.timeline();

//       // Phase 1 — hero card settles into the row  (HERO_BUDGET units)
//       tl.to(firstCard, {
//         x: 0,
//         y: 0,
//         scale: 1,
//         zIndex: 1,
//         filter: "drop-shadow(0 0px 0px rgba(0,0,0,0))",
//         ease: "power2.inOut",
//         duration: HERO_BUDGET,
//       });

//       // Fade in first card description at the same time
//       tl.to(
//         firstCardDesc,
//         {
//           opacity: 1,
//           height: "auto",
//           ease: "power2.out",
//           duration: HERO_BUDGET,
//         },
//         0
//       );

//       // Phase 2 — horizontal scroll  (getHScrollDist units, appended right after)
//       tl.to(cardsContainer, {
//         x: () => -getHScrollDist(),
//         ease: "none",
//         duration: () => getHScrollDist(),
//       });

//       // Single pin drives the whole timeline
//       ScrollTrigger.create({
//         animation: tl,
//         trigger: cardsContainer,
//         start: "top 20%",
//         end: () => `+=${HERO_BUDGET + getHScrollDist()}`,
//         pin: true,
//         scrub: 1,
//         anticipatePin: 1,
//         invalidateOnRefresh: true,
//       });

//       // ── One-shot fade-in stagger ──────────────────────────────────────────
//       gsap.utils.toArray(".praxis-card").forEach((card, i) => {
//         gsap.fromTo(
//           card,
//           { opacity: 0, y: 20 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.55,
//             ease: "power2.out",
//             delay: i * 0.1,
//             scrollTrigger: {
//               trigger: section,
//               start: "top 40%",
//               toggleActions: "play none none none",
//             },
//           }
//         );
//       });

//       return () => {
//         ScrollTrigger.removeEventListener("refreshInit", setHeroState);
//       };
//     });

//     // Mobile — plain stacked layout, no GSAP
//     mm.add("(max-width: 768px)", () => {
//       gsap.set([".praxis-card", cardsContainerRef.current], {
//         clearProps: "all",
//       });
//     });

//     return () => {
//       mm.revert();
//       ScrollTrigger.getAll().forEach((st) => st.kill());
//     };
//   }, []);

//   return (
//     <div
//       ref={sectionRef}
//       className="w-full min-h-screen bg-white flex flex-col overflow-hidden px-6 md:px-16 py-16 gap-12"
//     >
//       {/* Heading + description */}
//       <div className="flex-shrink-0 w-full lg:w-[50%]">
//         <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
//           Why Doctors
//           <br />
//           Choose Praxis?
//         </h2>
//         <p className="mt-5 text-base text-gray-500 leading-relaxed">
//           Praxis bridges the critical gap between classroom knowledge and
//           real-world medical practice through structured, practical, and
//           clinically relevant training.
//         </p>
//       </div>

//       {/* Cards row */}
//       <div className="flex-1 overflow-hidden w-full pt-40">
//         <div
//           ref={cardsContainerRef}
//           className="flex flex-col gap-8 md:flex-row md:gap-12 md:flex-nowrap will-change-transform"
//         >
//           {cards.map((card, i) => (
//             <div
//               key={i}
//               ref={i === 0 ? firstCardRef : null}
//               className="praxis-card flex-shrink-0 w-full md:w-[420px] lg:w-[600px] group cursor-pointer will-change-transform"
//             >
//               <div className="relative rounded-2xl overflow-hidden aspect-[5/3] bg-gray-100 shadow-md">
//                 <img
//                   src={card.image}
//                   alt={card.title}
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//                 <span className="absolute bottom-4 left-4 text-white text-xl font-medium tracking-tight">
//                   {card.title}
//                 </span>
//               </div>
//               <p
//                 ref={i === 0 ? firstCardDescRef : null}
//                 className="mt-4 ml-4 text-sm text-gray-900 leading-relaxed px-1"
//               >
//                 {card.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }















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
        const targetX =
          sectionRect.left +
          sectionRect.width / 2 -
          (cardRect.left + cardRect.width / 2);

        gsap.set(firstCard, {
          x: 300,
          y: 30,
          scale: 1.5,
          zIndex: 10,
          transformOrigin: "center center",
        });
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

      // Phase 2 — horizontal scroll
      tl.to(cardsContainer, {
        x: () => -getHScrollDist(),
        ease: "none",
        duration: () => getHScrollDist(),
      });

      ScrollTrigger.create({
        animation: tl,
        trigger: cardsContainer,
        start: "top 20%",
        end: () => `+=${HERO_BUDGET + getHScrollDist()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // Stagger fade-in for desktop cards
      gsap.utils.toArray(".praxis-card-desktop").forEach((card, i) => {
        if (i === 0) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 40%",
              toggleActions: "play none none none",
            },
          }
        );
      });

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
      className="w-full min-h-screen bg-[#FAFAFA] flex flex-col overflow-hidden px-6 md:px-16 py-16 gap-12"
    >
      {/* Heading + description */}
      <div className="flex-shrink-0 w-full lg:w-[70%]">
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
            <button className="why-swiper-prev w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 active:scale-95 transition-all disabled:opacity-50">
              <IoArrowBack size={28} />
            </button>
            <button className="why-swiper-next w-14 h-14 rounded-full bg-[#311A86] flex items-center justify-center text-white active:scale-95 shadow-lg shadow-indigo-200 transition-all disabled:opacity-30">
              <IoArrowForward size={28} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
