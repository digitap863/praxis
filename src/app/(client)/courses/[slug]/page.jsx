"use client";

import Blog from "@/components/home/Blog";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

import { useCourseStore } from "@/store/courseStore";
import { useEffect, use } from "react";

export default function CourseDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const slug = params.slug;
  const { currentCourse: course, loading, fetchCourseBySlug } = useCourseStore();

  useEffect(() => {
    if (slug) {
      fetchCourseBySlug(slug);
    }
  }, [slug, fetchCourseBySlug]);

  if (loading && !course) {
    return (
      <div className="w-full min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#33187F]/20 border-t-[#33187F] rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) return null;

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
              {course.smallDescription}
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

          {/* HTML Content Render */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl prose prose-sm md:prose-base lg:prose-lg prose-slate max-w-none text-[#4B5563]"
          >
            <div 
              dangerouslySetInnerHTML={{ __html: course.content }} 
            />
          </motion.div>

        </motion.div>
      </section>

      <Blog />

    </>
  );
}
