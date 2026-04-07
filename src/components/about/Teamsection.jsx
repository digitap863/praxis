"use client";

import Image from "next/image";

const teamMembers = [
  {
    name: "Dr. Matthew Harris",
    role: "Founder & CEO",
    description: "Dentist providing comprehensive dental care, from checkups to cosmetic solutions.",
    image: "/home/doc.png",
    isMain: true,
  },
  {
    name: "Dr. Benjamin Lee",
    role: "Founder & CEO",
    description: "Dermatologist specializing in skin health and advanced cosmetic treatments.",
    image: null,
    isMain: false,
  },
  {
    name: "Dr. Sarah Mitchell",
    role: "Founder & CEO",
    description: "Expert cardiologist focused on preventive heart care and advanced treatments.",
    image: null,
    isMain: false,
  },
  {
    name: "Dr. Daniel Hayes",
    role: "Founder & CEO",
    description: "Neurologist specializing in brain and nervous system disorders with a patient-centered approach.",
    image: null,
    isMain: false,
  },
];

export default function Teamsection() {
  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-24 bg-[#FAFAFA]  overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-[#262626] font-medium text-sm tracking-widest mb-4 block">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl text-[#262626] leading-[1.1] tracking-tighter font-medium">
            Meet the Core Team Providing <br /> Expert Training
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`relative rounded-[1.5rem] p-8 flex flex-col justify-between min-h-[370px] transition-transform hover:scale-[1.02] duration-300 shadow-sm ${member.isMain ? "bg-[#EEEEEE]" : "bg-[#007BFF]"
                }`}
            >
              <div className="z-10">
                <h3 className={`text-2xl font-medium  mb-1 ${member.isMain ? "text-[#262626]" : "text-white"}`}>
                  {member.name}
                </h3>
                <p className={`text-sm font-medium ${member.isMain ? "text-[#6B7280]" : "text-white/80"}`}>
                  {member.role}
                </p>
              </div>

              {/* Placeholder for Doctor Image on the first card */}
              {member.isMain && (
                <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                  <div className="relative w-full h-[100%] mt-auto opacity-100">
                    <Image src={member.image} fill className="object-contain object-bottom" />
                  </div>
                </div>
              )}

              <div className="z-10">
                <p className={`text-sm ${member.isMain ? "text-[#262626]" : "text-white"}`}>
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
