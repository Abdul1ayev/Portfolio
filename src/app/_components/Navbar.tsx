"use client";

import React from "react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <div className="w-full border-b bg-black text-gray-400 px-4 py-3">
        <div className="w-full mx-auto flex items-center justify-between px-2">
          <div className="text-2xl font-bold text-white">
            <Link href="/">
              <Image
                width={50}
                height={50}
                className="rounded-full border-white border-2 cursor-pointer"
                src="/Logo.jpg"
                alt="logo"
              />
            </Link>
          </div>

          <ul className="hidden md:flex space-x-6 text-lg">
            {[
              { name: "Bosh sahifa", path: "/" },
              { name: "Haqida", path: "/about" },
              { name: "Loyihalar", path: "/projects" },
              { name: "Bog'lanish", path: "/contact" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className="cursor-pointer border-b-2 border-transparent hover:border-emerald-600 hover:text-white transition-all duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-gray-400 transition-all duration-300"
          >
            <FaGithub />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
