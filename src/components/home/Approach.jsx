"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Structured\nLearning Pathways",
    description:
      "Each program follows a carefully designed progression that builds knowledge, reinforces skills, and ensures measurable competency development.",
    image: "/home/gsap1.png",
    bg: "bg-[#D9D9D9]",
    textColor: "text-[#262626]",
    descColor: "text-[#262626]",
  },
  {
    title: "Realistic Clinical\nSimulations",
    description:
      "Doctors train in environments that mirror real-world medical settings, improving readiness for actual patient scenarios.",
    image: "/home/gsap2.png",
    bg: "bg-[#33187F]",
    textColor: "text-white",
    descColor: "text-white/80",
  },
  {
    title: "Expert-Led\nMentorship",
    description:
      "Learn directly from experienced surgeons and specialists who provide personalized guidance throughout your training journey.",
    image: "/home/gsap3.png",
    bg: "bg-[#0A7BFF]",
    textColor: "text-white",
    descColor: "text-white/80",
  },
];

export default function Approach() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cardElements = cardsRef.current;

    if (!section || cardElements.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial state for cards (except the first one)
      cardElements.forEach((card, index) => {
        if (index > 0) {
          gsap.set(card, {
            yPercent: 100,
            scale: 1,
          });
        }
      });

      // Create a master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${cardElements.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          // markers: true,
        },
      });

      // For each card after the first, animate it up
      cardElements.forEach((card, index) => {
        if (index === 0) return;

        const stackOffset = index * 30; // px offset for each stacked card

        // Animate current card sliding up
        tl.to(
          card,
          {
            yPercent: 0,
            y: stackOffset,
            duration: 1,
            ease: "power2.out",
          },
          `card${index}`
        );

        // Scale down and add shadow to the previous card
        tl.to(
          cardElements[index - 1],
          {
            scale: 0.95,
            y: (index - 1) * 30,
            boxShadow: "0 -10px 40px rgba(0,0,0,0)",
            duration: 1,
            ease: "power2.out",
          },
          `card${index}`
        );
      });

      // Hold on the last card for a beat
      tl.to({}, { duration: 0.5 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-[#FAFAFA] ">
      {/* Header */}
      <div className="text-center py-16 md:py-24">
        <span className="text-[#262626] font-medium text-sm tracking-widest ">
          Our Approach
        </span>
        <h2 className="text-4xl md:text-5xl font-medium text-[#262626] mt-4 tracking-tight">
          How Praxis Training Works
        </h2>
      </div>

      {/* Stacking Cards Section */}
      <div
        ref={sectionRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden "
      >
        <div className="relative w-full max-w-xl mx-auto" style={{ height: "80vh" }}>
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`absolute top-0 left-0 w-full h-full rounded-[2.5rem] overflow-hidden ${card.bg} p-8 md:p-10 flex flex-col justify-between will-change-transform pb-10`}
              style={{
                zIndex: index + 1,
              }}
            >
              {/* Card Text Content */}
              <div className="max-w-md">
                <h3
                  className={`text-2xl md:text-4xl font-medium ${card.textColor} leading-tight mb-4 whitespace-pre-line`}
                >
                  {card.title}
                </h3>
                <p className={`${card.descColor} text-sm md:text-base leading-relaxed `}>
                  {card.description}
                </p>
              </div>

              {/* Card Image */}
              <div className="flex justify-center items-end mt-6 flex-1">
                <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-contain "
                    sizes="(max-width: 768px) 280px, 350px"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
