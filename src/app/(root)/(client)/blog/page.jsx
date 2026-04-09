"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = ["All Blogs", "Technology", "Research", "Environment"];

const blogs = [
  {
    id: 1,
    category: "Technology",
    date: "November 10, 2024",
    title: "Technological Innovations in Diagnostic Testing",
    author: "Boyd Glover",
    image: "/blog/blog1.png",
  },
  {
    id: 2,
    category: "Research",
    date: "November 12, 2024",
    title: "Research Methods for Accurate Results for any experiment",
    author: "Jennie Simonis",
    image: "/blog/blog2.png",
  },
  {
    id: 3,
    category: "Research",
    date: "November 14, 2024",
    title: "Advancements Redefining Science and Research",
    author: "Jennie Simonis",
    image: "/blog/blog3.png",
  },
  {
    id: 4,
    category: "Technology",
    date: "November 11, 2024",
    title: "Improving Laboratory Efficiency with Technology",
    author: "Boyd Glover",
    image: "/blog/blog4.png",
  },
  {
    id: 5,
    category: "Environment",
    date: "November 18, 2024",
    title: "Eco-Friendly Solutions in Laboratory Settings",
    author: "Esther Howard",
    image: "/blog/blog5.png",
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Blogs");

  const filteredBlogs = blogs.filter(blog => 
    selectedCategory === "All Blogs" || blog.category === selectedCategory
  );

  return (
    <main className="w-full bg-[#FAFAFA]  py-24 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:pt-20 ">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col gap-8"
        >
          <h1 className="text-4xl md:text-5xl text-[#262626] font-medium tracking-tighter leading-tight max-w-md mx-auto">
            Scientific discoveries and updates
          </h1>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4 pt-4">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                  selectedCategory === cat
                    ? "bg-[#007BFF] text-white border-transparent shadow-md"
                    : "bg-[#EEEEEE] text-[#4B5563] border-transparent hover:bg-gray-200"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Blog List Area */}
        <div className="flex flex-col gap-10 md:gap-16 pt-10">
          {filteredBlogs.map((blog, idx) => (
            <Link key={blog.id} href={`/blog/${blog.id}`}>
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="flex flex-col md:flex-row gap-8 lg:gap-12 group cursor-pointer"
              >
                {/* Image Column */}
                <div className="w-full md:w-[55%] ">
                  <div className="relative w-full aspect-[21/9] md:aspect-[24/9] overflow-hidden border border-2 border-white rounded-2xl  ">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover  w-full h-auto transition-transform duration-700 group-hover:scale-105 "
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-1 flex flex-col justify-center gap-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#6B7280]">
                    <span>/</span>
                    <span>{blog.category}</span>
                    <span>/</span>
                    <span>{blog.date}</span>
                    <span>/</span>
                  </div>
                  
                  <h2 className="text-2xl lg:text-3xl font-medium text-[#262626] tracking-tight group-hover:text-[#007BFF] transition-colors">
                    {blog.title}
                  </h2>

                  <div className="flex items-center gap-3 lg:pt-10">
                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden ring-2 ring-white shadow-sm">
                      {/* Placeholder Avatar */}
                    </div>
                    <span className="text-sm font-semibold text-[#4B5563]">{blog.author}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
