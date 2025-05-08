"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGithub, 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaUser, 
  FaCode, 
  FaEnvelope,
  FaLinkedin,
  FaTelegram
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Bosh sahifa", path: "/", icon: <FaHome className="mr-2" /> },
    { name: "Haqida", path: "/about", icon: <FaUser className="mr-2" /> },
    { name: "Loyihalar", path: "/projects", icon: <FaCode className="mr-2" /> },
    { name: "Bog'lanish", path: "/contact", icon: <FaEnvelope className="mr-2" /> }
  ];

  const socialIcons = [
    { name: "GitHub", icon: <FaGithub size={24} />, url: "https://github.com/Abdul1ayev" },
  { name: "LinkedIn", icon: <FaLinkedin size={24} />, url: "https://linkedin.com/in/samir-abdullayev-b827b92b2" },
  { name: "Telegram", icon: <FaTelegram size={24} />, url: "https://t.me/Abdullaev_Samir" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full border-b bg-[#000000]  text-[#39FF14] px-4 sm:px-6 py-3 shadow-md  top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "border-[#39FF14]" : "border-transparent"
      }`}
    >
      <div className="w-full mx-auto flex items-center justify-between max-w-8xl">
        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              width={40}
              height={40}
              className="rounded-full border border-[#39FF14] shadow-md"
              src="/Logo.jpg"
              alt="logo"
            />
          </motion.div>
          <motion.span 
            className="text-lg font-semibold text-[#39FF14] hidden sm:block"
            whileHover={{ scale: 1.05 }}
          >
            Abdullayev S.
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-base">
          {navItems.map((item, index) => (
            <motion.li 
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item.path}
                className="flex items-center cursor-pointer border-b-2 border-transparent hover:border-[#39FF14] hover:text-white transition-all duration-300 pb-1 px-1"
              >
                {item.icon}
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          {socialIcons.map((social, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#39FF14] text-xl hover:text-white transition-all duration-300"
                aria-label={`Social link ${index}`}
              >
                {social.icon}
              </Link>
            </motion.div>
          ))}
          
          <motion.button
            className="md:hidden text-[#39FF14] text-2xl hover:text-white transition-all duration-300 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-40 md:hidden pt-20"
          >
            <div className="flex justify-end px-6">
              <motion.button
                className="text-[#39FF14] text-2xl mb-4 hover:text-white transition-all duration-300"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                whileHover={{ rotate: 90 }}
              >
                <FaTimes />
              </motion.button>
            </div>
            
            <motion.ul 
              className="flex flex-col items-center space-y-8 text-xl py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.path}
                    className="flex items-center cursor-pointer border-b-2 border-transparent hover:border-[#39FF14] hover:text-white transition-all duration-300 pb-1 px-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            
            <motion.div 
              className="absolute bottom-8   mb-3 left-0 right-0 flex justify-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: navItems.length * 0.1 + 0.2 }}
            >
              {socialIcons.map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#39FF14] text-2xl hover:text-white transition-all duration-300"
                    aria-label={`Social link ${index}`}
                  >
                    {social.icon}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="absolute bottom-4 left-0 right-0 text-center text-sm text-[#39FF14] opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: navItems.length * 0.1 + 0.4 }}
            >
              <HiOutlineSparkles className="inline mr-1 " />
              Abdullayev S. Portfolio
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;