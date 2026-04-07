"use client";


export default function Purpose() {
  return (
    <section className="w-full px-4 md:px-10 py-6 bg-[#FAFAFA]  overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-[#262626] font-medium text-sm tracking-widest mb-2 block ">
            Mission & Vision
          </span>
          <h2 className="text-5xl md:text-5xl text-[#262626] leading-[1.1] tracking-tighter font-medium">
            Our Purpose
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission Card */}
          <div className="bg-[#EEEEEE] rounded-[1.8rem] p-8  flex flex-col justify-center  transition-transform hover:scale-[1.02] duration-300 shadow-sm border border-black/5">
            <h3 className="text-2xl md:text-3xl text-[#262626] font-medium mb-4">
              Our Mission
            </h3>
            <p className="text-[#262626] text-sm md:text-base  max-w-full">
              To empower doctors with precise, practical, and clinically relevant training
              that enhances patient care, strengthens professional competence, and
              elevates medical practice standards.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-[#EEEEEE] rounded-[1.8rem] p-8  flex flex-col justify-center  transition-transform hover:scale-[1.02] duration-300 shadow-sm border border-black/5">
            <h3 className="text-2xl md:text-3xl text-[#262626] font-medium mb-4">
              Our Vision
            </h3>
            <p className="text-[#262626] text-sm md:text-base  max-w-full">
              To become a trusted global leader in medical education by shaping
              highly skilled, confident, and practice-ready doctors through excellence
              in training, innovation, and continuous learning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
