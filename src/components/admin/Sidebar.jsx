"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/lib/api";

const navItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    name: "Blogs",
    path: "/admin/blogs",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V8m2 12a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h10" />
      </svg>
    ),
  },
  {
    name: "Courses",
    path: "/admin/courses",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    name: "Team",
    path: "/admin/team",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/admin/auth/logout");
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <aside className="hidden lg:flex flex-col w-[260px] min-w-[260px] bg-white border-r border-[#F0F0F0] h-screen sticky top-0">
      {/* Logo */}
      <div className="px-7 pt-8 pb-8">
        <Link href="/admin/dashboard">
          <Image
            src="/home/logo.png"
            alt="Praxis Logo"
            width={130}
            height={40}
            className="w-auto h-9"
            priority
          />
        </Link>
      </div>

      {/* Section Label */}
      <div className="px-7 mb-3">
        <span className="text-[10px] font-bold text-[#C0C0C0] uppercase tracking-[0.15em]">
          Menu
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);

          return (
            <Link key={item.name} href={item.path}>
              <motion.div
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative ${
                  isActive
                    ? "bg-[#33187F] text-white shadow-lg shadow-[#33187F]/20"
                    : "text-[#6B7280] hover:bg-[#F8F8F8] hover:text-[#262626]"
                }`}
              >
                <span className={isActive ? "text-white/90" : "text-[#B0B0B0]"}>
                  {item.icon}
                </span>
                <span className="font-medium text-[13px]">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 pb-6 mt-auto">
        <div className="border-t border-[#F0F0F0] pt-5 px-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#33187F] to-[#6C47FF] flex items-center justify-center text-white text-xs font-bold">
              P
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#262626] truncate">Praxis Admin</p>
              <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider font-medium">Super Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-[#C0C0C0] hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
              title="Logout"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
