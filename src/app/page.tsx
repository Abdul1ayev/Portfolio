"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
const socialLinks = [
  { name: "GitHub", icon: <FaGithub size={24} />, url: "https://github.com/Abdul1ayev" },
  { name: "LinkedIn", icon: <FaLinkedin size={24} />, url: "https://linkedin.com/in/samir-abdullayev-b827b92b2" },
  { name: "Telegram", icon: <FaTelegram size={24} />, url: "https://t.me/Abdullaev_Samir" },
];

const Page = () => {
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col min-h-screen justify-center items-center text-center px-4 bg-gradient-to-b bg-black"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[#39FF14] text-4xl sm:text-6xl font-bold leading-tight mb-2">
            Salom, men{" "}
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-[#39FF14] neon-text"
            >
              Abdullayev Samir
            </motion.span>
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[#39FF14] text-xl sm:text-2xl font-medium mb-8"
          >
            Frontend Dasturchi & UI Dizayner
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-black rounded-xl p-6 mb-8 border border-[#39ff14]  shadow-lg"
        >
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
            Frontend dasturchiman. Dizayndan kodga aylantirish, veb sahifalarni
            jonlantirish va foydalanuvchilarni qiziqtiradigan interfeyslar yaratish
            — bu men uchun nafaqat ish, balki zavq ham. Ishlarimda minimalizm,
            samaradorlik va foydalanuvchilar tajribasiga urg`u beraman.
          </p>
        </motion.div>


        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
        >
          {[
            { value: "3+", label: "Yillik tajriba" },
            { value: "20+", label: "Loyihalar" },
            { value: "100%", label: "Qoniqish" },
            { value: "∞", label: "Ixtirochilik" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
              className="bg-black p-4 rounded-lg border border-[#39FF14] text-center "
            >
              <div className="text-[#39FF14] text-2xl font-bold">{stat.value}</div>
              <div className="text-white   text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/projects" passHref>
            <button className="px-8 py-3 mx-auto bg-[#39FF14] text-black font-semibold rounded-lg hover:bg-transparent hover:text-[#39FF14] hover:border-[#39FF14] border border-transparent transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#39FF14]/20 flex items-center justify-center gap-2">
              <span>Loyihalarimni ko`rish</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
          <Link href="/contact" passHref>
            <button className="px-8 mx-auto py-3 bg-transparent text-[#39FF14] font-semibold rounded-lg hover:bg-[#39FF14] hover:text-black border border-[#39FF14] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#39FF14]/20 flex items-center justify-center gap-2">
              <span>Bog`lanish</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </button>
          </Link>
        </motion.div>

        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="flex justify-center gap-4 mt-8 mb-8"
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 + index * 0.1, duration: 0.3 }}
          href={social.url}
          className="text-white hover:text-[#39FF14] transition-colors"
          aria-label={social.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
      </div>
    </motion.div>
  );
};

export default Page;