"use client";
import React, { useState, useEffect } from "react";
import { FaEnvelope, FaGithub, FaTelegram, FaPhone } from "react-icons/fa";
import Image from "next/image";

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
        className={`fixed top-0 left-0 w-72 h-full bg-[#000000] p-6 transition-transform duration-300 shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-80 border-r-2 border-[#39FF14]`}
      >
        <div className="flex flex-col items-center text-center">
          <Image
            src="/Logo.jpg"
            alt="logo"
            width={150}
            height={150}
            className="rounded-full border-dashed opacity-90 border-2 border-[#39FF14] shadow-md"
          />
          <h2 className="text-lg font-semibold mt-4 text-[#39FF14]">
            Abdullayev S.
          </h2>

          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {["Veb dasturchi", "Dizayner", "Junior", "AI bot", "Web3"].map(
              (tag) => (
                <span
                  key={tag}
                  className="bg-[#111111] hover:bg-[#39FF14]  cursor-pointer px-3 py-1 text-xs rounded-lg text-[#39FF14] hover:text-[#111111] border border-[#39FF14] hover:border-[#111111] transition-all duration-300"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        <div className="mt-6 space-y-4 ">
          <ContactItem
            icon={<FaEnvelope className="text-[#39FF14]" />}
            title="E-pochta"
            info="samirabdullayev2009@gmail.com"
          />
          <ContactItem
            icon={<FaGithub className="text-[#39FF14]" />}
            title="Github"
            info="github.com/Abdul1ayev"
          />
          <ContactItem
            icon={<FaTelegram className="text-[#39FF14]" />}
            title="Telegram"
            info="t.me/abdullayev"
          />
          <ContactItem
            icon={<FaPhone className="text-[#39FF14]" />}
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
    <div className="flex items-center gap-3 cursor-pointer p-3 bg-[#111111] rounded-lg shadow-md border border-[#39FF14] transition duration-300 ">
      <div className="text-lg">{icon}</div>
      <div>
        <p className="text-sm text-[#39FF14] opacity-80 transition duration-300 ">
          {title}
        </p>
        <p className="text-md font-medium text-[#39FF14] transition duration-300 ">
          {info}
        </p>
      </div>
    </div>
  );
};

export default App;
