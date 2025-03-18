import React from "react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
  return (
    <div>
      <div className="w-full border-b bg-gray-950 text-gray-400 px-4 py-3">
        <div className="w-full mx-auto flex items-center justify-between px-2">
          <div className="text-2xl font-bold text-white">
            <Image
              width={50}
              height={50}
              className="rounded-full border-white border-2"
              src="/Logo.jpg"
              alt="logo"
            />
          </div>

          <ul className="hidden md:flex space-x-6 text-lg">
            {["Bosh sahifa", "Haqida", "Loyihalar", "Bog'lanish"].map(
              (item, index) => (
                <li
                  key={index}
                  className="cursor-pointer border-b-2 border-transparent hover:border-emerald-600 hover:text-white transition-all duration-300"
                >
                  {item}
                </li>
              )
            )}
          </ul>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-gray-400 transition-all duration-300"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
