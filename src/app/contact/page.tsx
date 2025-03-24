"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      )
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        alert("Failed to send the message. Please try again later.");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-start pt-12 md:p-0 md:items-center justify-center min-h-screen bg-[#000000] p-4 "
    >
      <motion.section
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="border-[#39FF14] border p-6 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-center text-[#39FF14] mb-4">
          Contact Us
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#39FF14]"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border text-[#39FF14] bg-[#000000] rounded-md border-[#39FF14] focus:outline-none focus:border-[#39FF14]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#39FF14]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border text-[#39FF14] bg-[#000000] rounded-md border-[#39FF14] focus:outline-none focus:border-[#39FF14]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[#39FF14]"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border text-[#39FF14] bg-[#000000] rounded-md border-[#39FF14] focus:outline-none focus:border-[#39FF14]"
              rows={4}
            ></textarea>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <button
              type="submit"
              className="w-full bg-[#39FF14] text-[#000000] py-2 rounded-md hover:bg-[#2ecc71] transition"
            >
              Send Message
            </button>
          </motion.div>
        </form>
      </motion.section>
    </motion.div>
  );
};

export default Page;
