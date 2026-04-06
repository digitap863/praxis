"use client";

import Image from "next/image";

function Herosection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/home/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-white/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 sm:pt-36 pb-20">
        {/* Main Heading */}
        <div className="max-w-3xl relative">
          <h1
            className="text-4xl md:text-5xl font- leading-[1.3]  text-[#1F1F1F] mb-6"
            style={{ fontFamily: "var(--font-neuropolitical), sans-serif" }}
          >
            Evolve Your Surgical
            <br />
            DNA with Precision by
            <br />
            Practice Till Perfection.
          </h1>



           <div className="flex justify-center sm:justify-end sm:pr-16 md:pr-32 relative absolute -bottom-2 -right-60 ">
            <div className="flex flex-col gap-2">
              {/* Stat row: big number + label side by side */}
              <div className="flex items-center gap-3">
                <span className="text-4xl   pt-2 text-[#1F1F1F] tracking-tighter leading-none">
                  100%
                </span>
                <div className="flex flex-col ">
                  <span className="text-xs sm:text-base font-semibold text-[#1F1F1F]">
                    Commitment To
                  </span>
                  <span className="text-xs sm:text-base font-semibold text-[#1F1F1F]">
                    Your Learning
                  </span>
                </div>
              </div>
              {/* Blue bar with slant SVG ending */}
              <div className="flex items-center absolute -bottom-14 right-2 ">
                <Image src="/home/m100.png" alt="stat accent" width={320} height={150} className="h-28 w-auto" />
              </div>
            </div>
          </div>



        </div>

        {/* Stats & Info Row */}
        <div className="flex flex-col gap-12 pt-20">

          {/* 99% Stat + Spring + Description */}
          <div className="flex flex-col sm:flex-row items-end justify-end gap-10 sm:gap-6 mt-4  relative ">


            <div className="flex items-baseline gap-2 absolute top-0 right-[55%]  ">
              <span className="text-4xl pt-2 text-[#1F1F1F] tracking-tighter leading-none">
                  99%
                </span>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-base font-semibold text-[#1F1F1F]">
                    Student
                  </span>
                  <span className="text-xs sm:text-base font-semibold text-[#1F1F1F]">
                    Satisfaction
                  </span>
                </div>

                 <div className="flex items-center absolute -bottom-14 right-2 ">
                <Image src="/home/m100.png" alt="stat accent" width={320} height={150} className="h-28 w-60 -scale-x-100" />
              </div>
              
              </div>




            {/* Spring / Coil SVG */}

            <div className="flex ">
              <div className="hidden sm:flex items-end justify-center  ">
                <Image src="/home/round.png" alt="spring" width={100} height={200} />
            </div>

            {/* Description Text */}
              <div className="max-w-xs ">
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed py-4">
                Designed by experts. Delivered
                <br />
                through hands-on learning.
                <br />
                Focused on outcomes that
                <br />
                improve patient care.
              </p>
            </div>
            </div>



          </div>
        </div>
      </div>
    </section>
  );
}

export default Herosection;