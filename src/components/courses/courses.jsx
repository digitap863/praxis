"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useCourseStore } from "@/store/courseStore";
import { useEffect } from "react";
import Link from "next/link";

// Helper to strip HTML and create description
const createDescription = (html, maxLength = 200) => {
  if (!html) return "";
  const plainText = html.replace(/<[^>]*>/g, "");
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + "..." 
    : plainText;
};

export default function CourseList() {
  const { courses, loading, fetchCourses } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loading && courses.length === 0) {
    return (
      <div className="w-full py-24 bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#33187F]/20 border-t-[#33187F] rounded-full animate-spin" />
      </div>
    );
  }

  if (courses.length === 0) return null;
  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-20 bg-[#FAFAFA] ">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {courses.map((course, index) => (
          <motion.div
            key={course._id || index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8"
          >
            {/* Left: Image */}
            <div className="w-full lg:w-[49%]">
              <Link href={`/courses/${course.slug}`}>
                <div className="relative w-full aspect-[20/10] overflow-hidden group border border-white border-2 rounded-[1rem]">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-[45%] flex flex-col gap-6 ">
              <Link href={`/courses/${course.slug}`}>
                <h2 className="text-3xl md:text-4xl text-[#262626] font-medium leading-[1.2] tracking-tighter hover:text-[#33187F] transition-colors">
                  {course.title}
                </h2>
              </Link>
              <p className="text-[#4B5563] text-sm md:text-base leading-relaxed line-clamp-4">
                {course.smallDescription || createDescription(course.content)}
              </p>

              <div className="pt-6">
                <Link href={`/courses/${course.slug}`}>
                  <button className="flex items-center gap-3 border border-[#33187F]/90 text-[#33187F] px-5 py-2.5 rounded-full hover:bg-[#33187F] hover:text-white transition-all duration-300 group font-medium text-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-[#FAFAFA] transition-colors"></span>
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
