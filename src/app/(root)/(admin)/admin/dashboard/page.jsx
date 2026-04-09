"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Total Blogs",
    value: "24",
    change: "+3 this week",
    color: "from-[#33187F] to-[#6C47FF]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V8m2 12a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h10" />
      </svg>
    ),
  },
  {
    label: "Active Courses",
    value: "8",
    change: "+1 this month",
    color: "from-[#007BFF] to-[#4DA3FF]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    label: "Team Members",
    value: "12",
    change: "2 pending",
    color: "from-[#10B981] to-[#34D399]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "Page Views",
    value: "1.2K",
    change: "+18% this week",
    color: "from-[#F59E0B] to-[#FBBF24]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
];

const quickActions = [
  { label: "New Blog Post", path: "/admin/blogs", icon: "✍️" },
  { label: "Add Course", path: "/admin/courses", icon: "📚" },
  { label: "Manage Team", path: "/admin/team", icon: "👥" },
];

const recentActivity = [
  { action: "New blog published", item: "Technological Innovations in Diagnostic Testing", time: "2 hours ago", type: "blog" },
  { action: "Course updated", item: "The Surgical Gene: Digital Synapse", time: "5 hours ago", type: "course" },
  { action: "Team member added", item: "Dr. Sarah Mitchell", time: "1 day ago", type: "team" },
  { action: "Blog edited", item: "Research Methods for Accurate Results", time: "2 days ago", type: "blog" },
  { action: "New course created", item: "Advanced Laparoscopic Techniques", time: "3 days ago", type: "course" },
];

export default function AdminDashboard() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="p-6 md:p-10 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-medium text-[#262626] tracking-tight">
          {getGreeting()}, Admin 👋
        </h1>
        <p className="text-[#9CA3AF] text-sm mt-2">
          Here&apos;s what&apos;s happening with your platform today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-[#F0F0F0] hover:shadow-lg hover:shadow-gray-100/80 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-sm`}>
                {stat.icon}
              </div>
              <span className="text-[11px] text-[#10B981] font-semibold bg-[#ECFDF5] px-2.5 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-[#262626] mb-1 tracking-tight">{stat.value}</p>
            <p className="text-xs text-[#9CA3AF] font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="xl:col-span-2 bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-[#F8F8F8] flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#262626]">Recent Activity</h2>
            <span className="text-xs text-[#9CA3AF]">Last 7 days</span>
          </div>
          <div className="divide-y divide-[#F8F8F8]">
            {recentActivity.map((item, idx) => (
              <div key={idx} className="px-6 py-4 flex items-center gap-4 hover:bg-[#FCFCFC] transition-colors">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                  item.type === "blog" ? "bg-[#F0EBFF] text-[#33187F]" :
                  item.type === "course" ? "bg-[#E8F4FF] text-[#007BFF]" :
                  "bg-[#ECFDF5] text-[#10B981]"
                }`}>
                  {item.type === "blog" ? "📝" : item.type === "course" ? "📖" : "👤"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#262626] font-medium truncate">{item.action}</p>
                  <p className="text-xs text-[#9CA3AF] truncate">{item.item}</p>
                </div>
                <span className="text-[11px] text-[#C0C0C0] whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white rounded-2xl border border-[#F0F0F0] overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-[#F8F8F8]">
            <h2 className="text-base font-semibold text-[#262626]">Quick Actions</h2>
          </div>
          <div className="p-5 flex flex-col gap-3">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.path}>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FAFAFA] hover:bg-[#F0EBFF] hover:shadow-sm transition-all duration-300 cursor-pointer group border border-transparent hover:border-[#33187F]/10">
                  <span className="text-xl">{action.icon}</span>
                  <span className="text-sm font-medium text-[#4B5563] group-hover:text-[#33187F] transition-colors">
                    {action.label}
                  </span>
                  <svg className="w-4 h-4 ml-auto text-[#D0D0D0] group-hover:text-[#33187F] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Stats Box */}
          <div className="px-5 pb-5">
            <div className="bg-gradient-to-br from-[#33187F] to-[#6C47FF] rounded-2xl p-6 text-white">
              <h3 className="text-sm font-medium text-white/80 mb-1">Platform Status</h3>
              <p className="text-2xl font-bold mb-3">All Systems ✓</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#34D399] rounded-full animate-pulse" />
                <span className="text-xs text-white/70">Everything operational</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
