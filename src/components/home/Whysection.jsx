"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

export default function WhyPraxis() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;

    const ctx = gsap.context(() => {
      const getTotalScrollWidth = () =>
        cardsContainer.scrollWidth - cardsContainer.offsetWidth;

      gsap.to(cardsContainer, {
        x: () => -getTotalScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: cardsContainer,           // ✅ pin the FULL section (heading + cards)
          start: "top 15%",
          end: () => `+=${getTotalScrollWidth() + 1300}`,
          pin: true,                  // ✅ pins the whole section in place
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: true,
        },
      });

      /* Stagger fade-in per card */
      gsap.utils.toArray(".praxis-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}  // ✅ single ref on the pinned container
        className="w-full min-h-screen bg-[#FAFAFA] flex flex-col overflow-hidden px-6 md:px-16 py-16 gap-12"
        >
        {/* Heading + description — stays visible while cards scroll */}
        <div className="flex-shrink-0 w-full lg:w-[50%]">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
            Why Doctors
            <br />
          Choose Praxis?
        </h2>
        <p className="mt-5 text-base text-gray-500 leading-relaxed">
          Praxis bridges the critical gap between classroom knowledge and
          real-world medical practice through structured, practical, and
          clinically relevant training.
        </p>
      </div>

      {/* Horizontally scrolling cards */}
      <div className="flex-1 overflow-hidden w-full">
        <div
          ref={cardsContainerRef}
          className="flex flex-col gap-8 md:flex-row md:gap-12 md:flex-nowrap"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="praxis-card flex-shrink-0 w-full md:w-[420px] lg:w-[600px] group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[5/3] bg-gray-100">
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
    </div>
  );
}


















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

// // Scroll budget (px) dedicated to the hero-card shrink phase
// const HERO_BUDGET = 600;

// export default function WhyPraxis() {
//   const sectionRef = useRef(null);
//   const cardsContainerRef = useRef(null);
//   const firstCardRef = useRef(null);

//   useEffect(() => {
//     const mm = gsap.matchMedia();

//     mm.add("(min-width: 769px)", () => {
//       const section = sectionRef.current;
//       const cardsContainer = cardsContainerRef.current;
//       const firstCard = firstCardRef.current;

//       if (!section || !cardsContainer || !firstCard) return;

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
//         markers: true,
//       });

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
//         markers: true,
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

//     return () => mm.revert();
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