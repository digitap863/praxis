"use client";


export default function Ceosection() {
  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-20 bg-[#FAFAFA] ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-[#262626] font-medium mb-12 tracking-tight">
          CEO’s Closing Statement <br /> for the Page
        </h2>

        <div className="bg-[#EEEEEE]/80 rounded-[2.5rem] p-8   flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Avatar/Image Placeholder */}
          <div className="relative w-full max-w-[300px] aspect-square rounded-[2rem] overflow-hidden bg-gray-400 shrink-0 shadow-sm transition-transform hover:scale-[1.02] duration-300">
            {/* 
              If you have a CEO image, replace this with:
              <Image src="/home/ceo.png" alt="CEO" fill className="object-cover" /> 
            */}
          </div>

          {/* Quote Content */}
          <div className="flex-1">
            <blockquote className="text-lg md:text-xl lg:text-2xl text-[#1F1F1F] font-medium leading-relaxed ">
              “In the operating room, there is no room for 'generic.' Why should your
              training be any different? At Praxis, we have moved away from the
              'volume-based' model to a 'value-based' one. We identify exactly where
              you are, define exactly where you need to be, and provide the
              360-degree support to get you there. We aren't just teaching surgery;
              we are curating excellence.”
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
