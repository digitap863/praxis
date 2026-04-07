"use client";


const milestones = [
  {
    value: "95%",
    label: "Client Satisfaction",
  },
  {
    value: "20Y",
    label: "Of Expertise",
  },
  {
    value: "10K+",
    label: "Students Trained",
  },
  {
    value: "99%",
    label: "Reliability",
  },
];

export default function Milestones() {
  return (
    <section className="w-full py-4 bg-[#FAFAFA] ">
      <div className="max-w-7xl mx-auto px-4 md:px-4 text-center">
        <h2 className="text-3xl md:text-4xl text-[#262626] font-medium mb-16 tracking-tight ">
          Milestones that define excellence
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item, index) => (
            <div
              key={index}
              className="bg-[#EEEEEE] rounded-[2rem] p-10 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <span className="text-4xl md:text-5xl font-medium text-[#262626] mb-3 font-neuropolitical " style={{ fontFamily: "var(--font-neuropolitical), sans-serif" }}>
                {item.value}
              </span>
              <p className="text-sm md:text-base font- text-[#6B7280]  ">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
