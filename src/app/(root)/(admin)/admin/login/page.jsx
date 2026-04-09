"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/lib/api";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Note: Endpoint depends on the backend implementation, 
      // typically /admin/auth/login or similar based on middleware
      const response = await api.post("/admin/auth/login", { email, password });

      if (response.data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Logo Container */}
        <div className="flex flex-col items-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Image
              src="/home/logo.png"
              alt="Praxis Logo"
              width={180}
              height={60}
              className="w-auto h-12 mb-4"
              priority
            />
          </motion.div>
          <p className="text-[#6B7280] text-sm font-medium tracking-tight uppercase">
            Admin Portal Access
          </p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#EEEEEE]"
        >
          <h2 className="text-2xl font-medium text-[#262626] mb-8 text-center tracking-tight">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <motion.div
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
               className="flex flex-col gap-2"
            >
              <label className="text-xs font-semibold text-[#6B7280] uppercase ml-1" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@praxis.com"
                className="w-full bg-[#FAFAFA] border border-transparent rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#33187F]/20 focus:bg-white transition-all text-[#262626] placeholder:text-gray-300"
              />
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 }}
               className="flex flex-col gap-2"
            >
              <label className="text-xs font-semibold text-[#6B7280] uppercase ml-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#FAFAFA] border border-transparent rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#33187F]/20 focus:bg-white transition-all text-[#262626] placeholder:text-gray-300"
              />
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-red-50 text-red-500 text-xs py-3 px-4 rounded-xl text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="submit"
              disabled={loading}
              className="w-full bg-[#33187F] text-white font-medium py-4 rounded-2xl hover:bg-[#2B1B8B] transition-all transform hover:shadow-lg active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Continue"
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Footer info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-[#6B7280] text-xs mt-8"
        >
          &copy; {new Date().getFullYear()} Praxis Training. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}
