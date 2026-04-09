"use client";

import Blog from "@/components/home/Blog";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

// Mock data for different courses
const courseData = {
  "digital-synapse": {
    title: "The Surgical Gene: The Digital Synapse",
    subtitle: "While others leave you at the clinic door, we hardwire your success.",
    description: "The 360° Digital Mentorship Program Every \"Gene\" we evolve is supported by a continuous digital link to our mastery hub. This isn't a library of videos; it is a live, breathing support system.",
    image: "/courses/img3.svg",
    features: [
      {
        name: "Case Analysis Lab",
        desc: "Upload your surgical videos for frame-by-frame critique by Senior Surgeons. They identify the 'genetic markers' of your technique and provide corrective feedback."
      },
      {
        name: "Masterclass Access",
        desc: "Weekly live digital sessions covering complex cases and the latest industry breakthroughs."
      },
      {
        name: "Symbiosis Community",
        desc: "Exclusive membership to our Trainer-Trainee ecosystem — a private network for troubleshooting, case-sharing, and peer-to-peer growth."
      }
    ]
  },
  // Add other courses here...
};

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug;

  // Default to digital-synapse if not found for demo purposes
  const course = courseData[slug] || courseData["digital-synapse"];

  return (
    <>
      <section className="w-full min-h-screen bg-[#FAFAFA]  py-24 px-4 md:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto bg-[#EEEEEE]/50 rounded-[3rem] p-8 md:p-16 flex flex-col gap-12  border border-2 border-white mt-10 md:mt-16"
        >

          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center flex flex-col gap-4 max-w-xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl text-[#262626] font-medium tracking-tighter leading-tight">
              {course.title}
            </h1>
            <p className="text-[#4B5563] text-sm md:text-base font-medium">
              {course.subtitle}
            </p>
          </motion.div>

          {/* Feature Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative w-full aspect-[20/9] rounded-lg  overflow-hidden border border-2 border-white "
          >
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </motion.div>

          {/* Long Description */}
          <div className="max-w-5xl ">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[#4B5563] text-sm md:text-base leading-relaxed text-left mb-12"
            >
              {course.description}
            </motion.p>

            {/* Feature List */}
            <div className="flex flex-col gap-10">
              {course.features.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col gap-2"
                >
                  <h3 className="text-xl font-medium text-[#262626]">
                    {feature.name}
                  </h3>
                  <p className="text-[#4B5563] text-sm md:text-base">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </section>

      <Blog />

    </>
  );
}
