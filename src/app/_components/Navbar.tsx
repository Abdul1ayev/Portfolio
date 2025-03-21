"use client";
import React, { useState } from "react";
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-[#000000] text-[#39FF14] px-6 py-4 shadow-md">
      <div className="w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            width={45}
            height={45}
            className="rounded-full border border-[#39FF14] shadow-md hover:scale-105 transition-transform"
            src="/Logo.jpg"
            alt="logo"
          />
          <span className="text-lg font-semibold text-[#39FF14]">
            Abdullayev S.
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-base">
          {[
            { name: "Bosh sahifa", path: "/" },
            { name: "Haqida", path: "/about" },
            { name: "Loyihalar", path: "/projects" },
            { name: "Bog'lanish", path: "/contact" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className="cursor-pointer border-b-2 border-transparent hover:border-[#39FF14] hover:text-white transition-all duration-300 pb-1"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#39FF14] text-2xl hover:text-white transition-all duration-300"
          >
            <FaGithub />
          </Link>
          <button
            className="md:hidden text-[#39FF14] text-2xl hover:text-white transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 bg-[#000000] text-[#39FF14] py-4">
          {[
            { name: "Bosh sahifa", path: "/" },
            { name: "Haqida", path: "/about" },
            { name: "Loyihalar", path: "/projects" },
            { name: "Bog'lanish", path: "/contact" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className="cursor-pointer border-b-2 border-transparent hover:border-[#39FF14] hover:text-white transition-all duration-300 pb-1"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
