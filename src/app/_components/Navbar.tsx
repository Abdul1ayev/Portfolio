import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <div className="w-full  border-b bg-gray-950 text-white px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">Logo</div>

          <ul className="hidden md:flex space-x-6 text-lg">
            <li className="hover:text-gray-400 cursor-pointer">Bosh sahifa</li>
            <li className="hover:text-gray-400 cursor-pointer">Haqida</li>
            <li className="hover:text-gray-400 cursor-pointer">Loyihalar</li>
            <li className="hover:text-gray-400 cursor-pointer">Bog'lanish</li>
          </ul>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-gray-400"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
