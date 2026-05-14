"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useCourseStore } from "@/store/courseStore"

const ACTIVE_W = 480
const INACTIVE_W = 280
const ACTIVE_H = 320
const INACTIVE_H = 200
const GAP = 20

export default function Service() {
  const { courses, loading, fetchCourses } = useCourseStore()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const wrapRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    fetchCourses(10)
  }, [fetchCourses])

  useEffect(() => {
    if (courses.length > 0) setMounted(true)
  }, [courses])

  const scrollToActive = useCallback(
    (idx) => {
      if (!trackRef.current || !wrapRef.current) return
      const wrapW = wrapRef.current.offsetWidth
      const offset = idx * (INACTIVE_W + GAP)
      const totalW = courses.length * (INACTIVE_W + GAP) + (ACTIVE_W - INACTIVE_W)
      const maxOffset = Math.max(0, totalW - wrapW)
      const clamped = Math.max(0, Math.min(offset, maxOffset))
      trackRef.current.style.transform = `translateX(-${clamped}px)`
    },
    [courses.length]
  )

  const goTo = useCallback(
    (idx) => {
      setActiveIndex(idx)
      scrollToActive(idx)
    },
    [scrollToActive]
  )

  useEffect(() => {
    if (mounted) scrollToActive(0)
  }, [mounted, scrollToActive])

  const handlePrev = () => { if (activeIndex > 0) goTo(activeIndex - 1) }
  const handleNext = () => { if (activeIndex < courses.length - 1) goTo(activeIndex + 1) }

  if (loading && courses.length === 0) {
    return (
      <div className="w-full py-24 bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#33187F]/20 border-t-[#33187F] rounded-full animate-spin" />
      </div>
    )
  }

  if (courses.length === 0) return null

  return (
    <div className="relative bg-[#FAFAFA] overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">

        {/* Header — stacked: label → heading → description */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-10 md:mb-12"
        >
          <span className="text-[#262626] font-medium text-xs md:text-sm mb-3 block tracking-wide">
            Programs
          </span>
          <h2 className="text-3xl md:text-5xl text-[#262626] leading-tight md:leading-[1.1] tracking-tighter font-medium mb-4">
            Explore Our Training <br className="hidden md:block" /> Programs
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-sm">
            Praxis offers focused medical training programs tailored to enhance
            clinical capability across various specialties and skill levels.
          </p>
        </motion.div>

        {/* Carousel — full width */}
        <div ref={wrapRef} className="overflow-hidden w-full">
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: `${GAP}px`,
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              willChange: "transform",
              alignItems: "flex-end",
            }}
          >
            {courses.map((course, index) => {
              const isActive = index === activeIndex
              return (
                <div
                  key={course._id || index}
                  onClick={() => goTo(index)}
                  style={{
                    flexShrink: 0,
                    width: isActive ? `${ACTIVE_W}px` : `${INACTIVE_W}px`,
                    transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className="group"
                >
                  {/* Image */}
                  <Link
                    href={`/courses/${course.slug}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: isActive ? `${ACTIVE_H}px` : `${INACTIVE_H}px`,
                        transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        borderRadius: "20px",
                        overflow: "hidden",
                        background: "#e5e7eb",
                        border: "2px solid #fff",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                      }}
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.5s ease",
                        }}
                        className="group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  {/* Title */}
                  <div style={{ padding: "12px 4px 0" }}>
                    <Link
                      href={`/courses/${course.slug}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h3
                        style={{
                          fontSize: isActive ? "15px" : "12px",
                          fontWeight: 500,
                          color: "#262626",
                          lineHeight: 1.35,
                          transition: "font-size 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s",
                        }}
                        className="group-hover:text-[#33187F]"
                      >
                        {course.title}
                      </h3>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-between items-center mt-8 md:mt-10"
        >
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#311A86] text-white flex items-center justify-center transition-all hover:brightness-110 shadow-md shadow-indigo-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === courses.length - 1}
              aria-label="Next"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#311A86] text-white flex items-center justify-center transition-all hover:brightness-110 shadow-md shadow-indigo-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <Link
            href="/courses"
            className="hidden md:flex items-center gap-2.5 bg-[#311A86] text-white px-5 py-2.5 rounded-full hover:brightness-110 transition font-medium text-sm shadow-md shadow-indigo-200 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:scale-125 transition" />
            See All Programs
          </Link>
        </motion.div>

      </div>
    </div>
  )
}