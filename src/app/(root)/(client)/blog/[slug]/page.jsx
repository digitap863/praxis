"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Blog from "@/components/home/Blog";

// Mock data for blog posts
const blogData = {
  "1": {
    title: "Technological Innovations in Diagnostic Testing",
    subtitle: "How digital advancements are reshaping the landscape of medical research and patient diagnostics.",
    category: "Technology",
    date: "November 10, 2024",
    author: "Boyd Glover",
    image: "/blog/blog1.png",
    description: "The healthcare industry is undergoing a massive transformation as digital tools replace traditional testing methods. From AI-driven analysis to real-time data streaming, diagnostic testing is becoming faster and more accurate than ever before. We are no longer in an era of 'one size fits all' medicine. Today's innovations allow clinicians to identify genetic markers and tailor treatments to the individual, reducing risk and improving outcomes across the board.",
    sections: [
      {
        heading: "The Shift to Digital Diagnostics",
        text: "The healthcare industry is undergoing a massive transformation as digital tools replace traditional testing methods. From AI-driven analysis to real-time data streaming, diagnostic testing is becoming faster and more accurate than ever before."
      },
      {
        heading: "Precision Medicine and Personalization",
        text: "We are no longer in an era of 'one size fits all' medicine. Today's innovations allow clinicians to identify genetic markers and tailor treatments to the individual, reducing risk and improving outcomes across the board."
      },
      {
        heading: "The Future of Laboratory Efficiency",
        text: "Automation and robotics are streamlining laboratory workflows, allowing for high-throughput testing without sacrificing the meticulous detail required for clinical mastery."
      }
    ]
  },
  "2": {
    title: "Research Methods for Accurate Results",
    subtitle: "Mastering the scientific approach to experimental design and data integrity.",
    category: "Research",
    date: "November 12, 2024",
    author: "Jennie Simonis",
    image: "/blog/blog2.png",
    description: "Every great discovery begins with a precisely defined question. Our research methods focus on identifying the core variables that drive clinical success. In the world of science, data is everything. We implement 360-degree verification protocols to ensure that every result we produce is baseline-accurate and reproducible.",
    sections: [
      {
        heading: "Defining the Research Question",
        text: "Every great discovery begins with a precisely defined question. Our research methods focus on identifying the core variables that drive clinical success."
      },
      {
        heading: "Data Integrity and Verification",
        text: "In the world of science, data is everything. We implement 360-degree verification protocols to ensure that every result we produce is baseline-accurate and reproducible."
      }
    ]
  }
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug;

  // Default to first blog if not found for demo
  const blog = blogData[slug] || blogData["1"];

  return (
    <>
      <section className="w-full min-h-screen bg-[#FAFAFA] py-24 px-4 md:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto bg-[#EEEEEE]/50 rounded-[3rem] p-8 md:p-16 flex flex-col gap-12 border border-2 border-white mt-10 md:mt-20"
        >
          {/* Header Section */}
          <div className="text-center flex flex-col gap-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#007BFF] uppercase tracking-widest mb-2">
                <span>{blog.category}</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-500">{blog.date}</span>
             </div>
            <h1 className="text-4xl md:text-5xl text-[#262626] font-medium tracking-tighter leading-tight">
              {blog.title}
            </h1>
            <p className="text-[#4B5563] text-sm md:text-base font-medium">
              {blog.subtitle}
            </p>
          </div>

          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full aspect-[20/9] rounded-[1.5rem] overflow-hidden border border-2 border-white shadow-sm"
          >
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Blog Content Section */}
          <div className="max-w-5xl">
            <p className="text-[#4B5563] text-sm md:text-base leading-relaxed text-left mb-12">
              {blog.description}
            </p>

            {/* Content List (Like course features) */}
            <div className="flex flex-col gap-10">
              {blog.sections.map((section, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  className="flex flex-col gap-2"
                >
                  <h3 className="text-xl font-medium text-[#262626]">
                    {section.heading}
                  </h3>
                  <p className="text-[#4B5563] text-sm md:text-base leading-relaxed">
                    {section.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Author Footer */}
            <div className="mt-16 pt-8 border-t border-white flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden ring-2 ring-white shadow-sm">
                  {/* Avatar Placeholder */}
               </div>
               <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#262626]">{blog.author}</span>
                  <span className="text-xs text-[#6B7280]">Scientific Research Lead</span>
               </div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* Recommended Section */}
      <Blog />
    </>
  );
}
