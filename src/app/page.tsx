"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Page = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-full flex flex-col justify-center items-center text-center px-4 bg-[#000000]"
    >
      <h1 className="text-[#39FF14] text-4xl sm:text-5xl font-bold leading-tight">
        Salom, men <br />
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[#39FF14] neon-text"
        >
          Abdullayev Samir
        </motion.span>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-gray-300 max-w-2xl mt-4 text-lg sm:text-xl px-2 sm:px-0"
      >
        Frontend dasturchiman. Dizayndan kodga aylantirish, veb sahifalarni
        jonlantirish va foydalanuvchilarni qiziqtiradigan interfeyslar yaratish
        — bu men uchun nafaqat ish, balki zavq ham. Ishlarimda minimalizm va
        samaradorlikka urg‘u beraman.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link href="/projects" passHref>
          <button className="mt-6 px-6 py-3 bg-[#39FF14] border text-black font-semibold rounded-lg hover:bg-black hover:text-[#39FF14] hover:border-[#39FF14] transition-all duration-500 cursor-pointer shadow-md">
            Loyihalarimni ko‘rish
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Page;
