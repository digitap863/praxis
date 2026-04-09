"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add EmailJS or API call here
  };

  return (
    <section className="w-full px-4 md:px-10 lg:px-20 py-24 bg-[#FAFAFA] ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start pt-20">

        {/* Left Column: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[40%] flex flex-col gap-10"
        >
          <div>
            <h1 className="text-4xl md:text-5xl text-[#262626] font-medium leading-[1.1] tracking-tighter mb-6">
              Get in Touch with <br />  Praxis
            </h1>
            <p className="text-[#4B5563] text-base ">
              Have questions about our programs or partnerships? <br />
              Our team is here to assist you.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-[#262626] font-bold text-sm  tracking-wider">Email</span>
              <a href="mailto:info@praxistraining.com" className="text-[#4B5563] hover:text-[#33187F] transition-colors">
                info@praxistraining.com
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[#262626] font-bold text-sm  tracking-wider">Phone</span>
              <a href="tel:+910000000000" className="text-[#4B5563] hover:text-[#33187F] transition-colors">
                +91 XXXXX XXXXX
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[#262626] font-bold text-sm  tracking-wider">Office Address</span>
              <p className="text-[#4B5563]">
                [Full Address Line] <br />
                [City, State, PIN Code]
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[#262626] font-bold text-sm  tracking-wider">Working Hours</span>
              <p className="text-[#4B5563]">
                Monday – Saturday: 9:00 AM – 6:00 PM <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-[60%] bg-[#EEEEEE]/60 rounded-[2.5rem] p-8   border border-white border-2"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col gap-3"
              >
                <label className="text-[#262626] font-medium text-sm ml-1" htmlFor="name">Full name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ex. Jane tecs"
                  className="w-full bg-[#FAFAFA]  rounded-2xl px-6 py-3 outline-none focus:ring-2 focus:ring-[#33187F]/20 transition-all text-[#262626]"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col gap-3"
              >
                <label className="text-[#262626] font-medium text-sm ml-1" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ex. jane@example.com"
                  className="w-full bg-[#FAFAFA]  rounded-2xl px-6 py-3 outline-none focus:ring-2 focus:ring-[#33187F]/20 transition-all text-[#262626]"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            </div>

            {/* Phone Number Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col gap-3"
            >
              <label className="text-[#262626] font-medium text-sm ml-1" htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Ex.(91) 7839318948"
                className="w-full bg-[#FAFAFA]  rounded-2xl px-6 py-3 outline-none focus:ring-2 focus:ring-[#33187F]/20 transition-all text-[#262626]"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </motion.div>

            {/* Message Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col gap-3"
            >
              <label className="text-[#262626] font-medium text-sm ml-1" htmlFor="message">Tell us your message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Write your message here..."
                className="w-full bg-[#FAFAFA]  rounded-3xl px-6 py-3 outline-none focus:ring-2 focus:ring-[#33187F]/20 transition-all text-[#262626] resize-none"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="pt-2"
            >
              <button
                type="submit"
                className="w-full bg-[#2B1B8B] text-white font-medium py-3 rounded-full hover:bg-[#33187F] transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg"
              >
                Submit
              </button>
            </motion.div>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
