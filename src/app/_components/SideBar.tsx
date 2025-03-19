"use client";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaTelegram,
  FaPhone,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white p-4 items-center">
      <button
        className="md:hidden fixed top-5 left-5 z-20 text-white bg-gray-800 border border-gray-600 p-3 rounded-full shadow-md hover:bg-gray-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Yon panel */}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-gray-900 p-6 transition-transform duration-300 shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-80`}
      >
        <div className="flex flex-col items-center text-center">
          <Image
            src="/Logo.jpg"
            alt="logo"
            width={100}
            height={100}
            className="rounded-full border-2 border-gray-500 shadow-md"
          />

          <h2 className="text-lg font-semibold mt-4">Abdullayev S.</h2>

          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {["Veb dasturchi", "Dizayner", "Junior", "AI bot", "Web3"].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-gray-700 px-3 py-1 text-xs rounded-lg text-gray-300"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <ContactItem
            icon={<FaEnvelope className="text-red-400" />}
            title="E-pochta"
            info="abdullayev@gmail.com"
          />
          <ContactItem
            icon={<FaGithub className="text-gray-300" />}
            title="Github"
            info="github.com/abdullayev"
          />
          <ContactItem
            icon={<FaTelegram className="text-blue-400" />}
            title="Telegram"
            info="t.me/abdullayev"
          />
          <ContactItem
            icon={<FaPhone className="text-green-400" />}
            title="Telefon"
            info="+998 (93) 624-97-08"
          />
        </div>
      </div>
    </div>
  );
};

const ContactItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  info: string;
}> = ({ icon, title, info }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg shadow-sm hover:bg-gray-700 transition">
      <div className="text-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-md font-medium">{info}</p>
      </div>
    </div>
  );
};

export default App;
