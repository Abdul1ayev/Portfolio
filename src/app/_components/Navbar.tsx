"use client";

import React from "react";
import { FaGithub, FaBars } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-black text-gray-300 px-6 py-4 shadow-md">
      <div className="w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            width={45}
            height={45}
            className="rounded-full border border-gray-500 shadow-md hover:scale-105 transition-transform"
            src="/Logo.jpg"
            alt="logo"
          />
          <span className="text-lg font-semibold ">Abdullayev S.</span>
        </Link>

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
                className="cursor-pointer border-b-2 border-transparent hover:border-emerald-500 hover:text-white transition-all duration-300 pb-1"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-gray-400 transition-all duration-300"
          >
            <FaGithub />
          </Link>
          <button className="md:hidden text-white text-2xl hover:text-gray-400 transition-all duration-300">
            <FaBars />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
