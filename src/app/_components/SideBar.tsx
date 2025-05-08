"use client";
import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaTelegram,
  FaPhone,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndX = e.touches[0].clientX;
      if (touchEndX - touchStartX > 80) {
        setIsOpen(true);
      } else if (touchStartX - touchEndX > 80) {
        setIsOpen(false);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div className="h-full flex flex-col bg-[#000000] text-[#39FF14] p-4 items-center">
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-[#000000] p-6 transition-all duration-300 shadow-xl z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-80 border-r-2 border-[#39FF14] hover:border-[#4dff33]`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="group relative">
            <Image
              src="/Logo.jpg"
              alt="logo"
              width={150}
              height={150}
              className="rounded-full border-dashed opacity-90 border-2 border-[#39FF14] shadow-md 
            group-hover:opacity-100 group-hover:scale-105 group-hover:border-solid 
            group-hover:shadow-lg group-hover:shadow-[#39FF14]/30 transition-all duration-300"
            />
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#111111] text-xs px-2 py-1 rounded-full border border-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Available for work
            </span>
          </div>

          <h2 className="text-lg font-semibold mt-4 text-[#39FF14] hover:text-white transition-colors duration-300">
            Abdullayev S.
          </h2>

          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {["Veb dasturchi", "Dizayner", "Junior", "AI bot", "Web3"].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-[#111111] hover:bg-[#39FF14] cursor-pointer px-3 py-1 text-xs rounded-lg text-[#39FF14] hover:text-[#111111] border border-[#39FF14] hover:border-[#111111] transition-all duration-300 hover:scale-105 hover:font-medium"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        <div className="mt-8 space-y-4 w-full">
          <ContactItem
            icon={
              <FaEnvelope className="text-[#39FF14] group-hover:text-white" />
            }
            title="E-pochta"
            info="abdullayev@gmail.com"
            href="mailto:abdullayevsamir2009@gmail.com"
          />
          <ContactItem
            icon={
              <FaGithub className="text-[#39FF14] group-hover:text-white" />
            }
            title="Github"
            info="github.com/Abdul1ayev"
            href="https://github.com/Abdul1ayev"
          />
          <ContactItem
            icon={
              <FaTelegram className="text-[#39FF14] group-hover:text-white" />
            }
            title="Telegram"
            info="t.me/Abdullaev_Samir"
            href="https://t.me/Abdullaev_Samir"
          />
          <ContactItem
            icon={<FaPhone className="text-[#39FF14] group-hover:text-white" />}
            title="Telefon"
            info="+998 (93) 624-97-08"
            href="tel:+998936249708"
          />
        </div>

        <div className="mt-8 pt-4 border-t border-[#39FF14]/30">
          <p className="text-xs text-center text-[#39FF14]/70 hover:text-[#39FF14] transition-colors duration-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};
const ContactItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  info: string;
  href?: string;
}> = ({ icon, title, info, href }) => {
  const content = (
    <div className="flex items-center gap-3 cursor-pointer p-3 bg-[#111111] rounded-lg shadow-md border border-[#39FF14] hover:bg-[#1a1a1a] hover:border-[#4dff33] hover:shadow-[#39FF14]/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-lg group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <p className="text-sm text-[#39FF14] opacity-80 group-hover:opacity-100 transition duration-300">
          {title}
        </p>
        <p className="text-md font-medium text-[#39FF14] group-hover:text-white transition duration-300">
          {info}
        </p>
      </div>
      {href && (
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaExternalLinkAlt className="text-[#39FF14]/50" />
        </div>
      )}
    </div>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {content}
    </a>
  ) : (
    <div className="group block">{content}</div>
  );
};

export default App;
