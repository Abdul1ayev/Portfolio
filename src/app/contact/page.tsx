"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Failed to send the message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black p-4 md:p-8 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-6xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#39FF14] mb-8"
        >
          Get In Touch
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center p-6 rounded-xl bg-black border border-[#111111] hover:border-[#39FF14] duration-300 transition-all"

              >
                <div className="p-3 bg-[#111111] rounded-full mb-4">
                  <FaEnvelope className="text-[#39FF14] text-2xl" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                <a
                  href="mailto:abdullayev@gmail.com"
                  className="text-sm text-[#39FF14] hover:underline break-all"
                >
                  abdullayev@gmail.com
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center p-6 rounded-xl bg-black border border-[#111111] hover:border-[#39FF14] duration-300 transition-all"
              >
                <div className="p-3 bg-[#111111] rounded-full mb-4">
                  <FaPhone className="text-[#39FF14] text-2xl" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">Phone</h4>
                <a
                  href="tel:+998916463602"
                  className="text-sm text-[#39FF14] hover:underline"
                >
                  +998 (91) 646 36 02
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center p-6 rounded-xl bg-black border border-[#111111] hover:border-[#39FF14] duration-300 transition-all"

              >
                <div className="p-3 bg-[#111111] rounded-full mb-4">
                  <FaMapMarkerAlt className="text-[#39FF14] text-2xl" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">
                  Location
                </h4>
                <p className="text-sm text-[#39FF14] text-center">
                  Tashkent, Uzbekistan
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 p-6 rounded-xl bg-black hover:scale-101 transition-all duration-300 border border-[#111111] hover:border-[#39FF14]"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Let`s Connect
              </h3>
              <p className="text-gray-400 mb-4">
                Have a project in mind or want to discuss potential
                opportunities? Feel free to reach out through any of these
                channels.
              </p>
              <div className="flex gap-4">
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-[#111111] rounded-full hover:bg-[#39FF14] transition-colors"
                >
                  <FaTwitter className="text-white text-xl" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-[#111111] rounded-full hover:bg-[#39FF14] transition-colors"
                >
                  <FaLinkedin className="text-white text-xl" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-[#111111] rounded-full hover:bg-[#39FF14] transition-colors"
                >
                  <FaGithub className="text-white text-xl" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          <motion.section
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full lg:w-1/2"
          >
            <div className="border-[#39FF14] border p-8 rounded-2xl bg-black shadow-lg">
              <h2 className="text-2xl font-bold text-center text-[#39FF14] mb-6">
                Send a Message
              </h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-black transition-all duration-300 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-black duration-300 transition-all border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Hello, I`d like to talk about..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-black transition-all duration-300 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent min-h-[120px]"
                    rows={4}
                  ></textarea>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-[#39FF14] hover:bg-[#2ecc71] text-black"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default Page;
