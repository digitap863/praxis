"use client";

import Image from "next/image";

const courseHighlights = [
  {
    title: "The Surgical Gene: The Digital Synapse",
    description: "The 360° Digital Mentorship Program Every \"Gene\" we evolve is supported by a continuous digital link to our mastery hub. This isn't a library of videos; it is a live, breathing support system",
    image: "/courses/img3.svg",
  },
  {
    title: "The Curated Tracks",
    description: "The 360° Digital Mentorship Program Every \"Gene\" we evolve is supported by a continuous digital link to our mastery hub. This isn't a library of videos; it is a live, breathing support system",
    image: "/courses/img3.svg",
  },
  {
    title: "The Surgical Gene: The Digital Synapse",
    description: "The 360° Digital Mentorship Program Every \"Gene\" we evolve is supported by a continuous digital link to our mastery hub. This isn't a library of videos; it is a live, breathing support system",
    image: "/courses/img3.svg",
  },
];

export default function CourseList() {
  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-20 bg-[#FAFAFA] ">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {courseHighlights.map((item, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8"
          >
            {/* Left: Image */}
            <div className="w-full lg:w-[50%]">
              <div className="relative w-full aspect-[20/10] overflow-hidden group">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-[45%] flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl text-[#262626] font-medium leading-[1.2] tracking-tighter">
                {item.title}
              </h2>
              <p className="text-[#4B5563] text-sm md:text-base leading-relaxed">
                {item.description}
              </p>

              <div className="pt-6">
                <button className="flex items-center gap-3 border border-[#33187F]/90 text-[#33187F] px-5 py-2.5 rounded-full hover:bg-[#33187F] hover:text-white transition-all duration-300 group font-medium text-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-[#FAFAFA]  transition-colors"></span>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
