"use client";
import React from "react";

const Page = () => {
  return (
    <div
      className="h-full flex flex-col justify-center items-center text-center px-4"
      style={{
        backgroundImage: "url('/Home.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight">
        Salom, men <br />
        <span className="text-green-500">Abdullayev Samir</span>
      </h1>
      <p className="text-gray-300 max-w-2xl mt-4 text-lg sm:text-xl px-2 sm:px-0">
        Frontend dasturchiman. Dizayndan kodga aylantirish, veb sahifalarni
        jonlantirish va foydalanuvchilarni qiziqtiradigan interfeyslar yaratish—
        bu men uchun nafaqat ish, balki zavq ham. Ishlarimda minimalizm va
        samaradorlikka urg‘u beraman.
      </p>
      <button className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
        Loyihalarimni ko‘rish
      </button>
    </div>
  );
};

export default Page;
