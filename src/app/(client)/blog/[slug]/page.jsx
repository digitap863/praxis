"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Blog from "@/components/home/Blog";

import { useUserBlogStore } from "@/store/blogStore";
import { useEffect, use } from "react";

export default function BlogDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const slug = params.slug;
  const { currentBlog: blog, loading, fetchBlogBySlug } = useUserBlogStore();

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug);
    }
  }, [slug, fetchBlogBySlug]);

  if (loading && !blog) {
    return (
      <div className="w-full min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#007BFF]/20 border-t-[#007BFF] rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) return null;

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
            {blog.category && (
              <p className="text-[#4B5563] text-sm md:text-base font-medium opacity-80">
                Focus on {blog.category}
              </p>
            )}
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

          {/* HTML Content Render */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl prose prose-sm md:prose-base lg:prose-lg prose-slate max-w-none text-[#4B5563]"
          >
            <div 
              dangerouslySetInnerHTML={{ __html: blog.content }} 
            />
          </motion.div>
          {/* Author Footer */}
          <div className="mt-16 pt-8 border-t border-white flex items-center gap-4 w-full">
            <div className="w-12 h-12 rounded-full bg-[#007BFF]/10 flex items-center justify-center overflow-hidden ring-2 ring-white shadow-sm text-[#007BFF] font-bold text-xl">
              {blog.author?.charAt(0) || "P"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#262626]">{blog.author}</span>
              <span className="text-xs text-[#6B7280]">Scientific Research Lead</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Recommended Section */}
      <Blog />
    </>
  );
}
