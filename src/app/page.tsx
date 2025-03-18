"use client";
import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div>
      <Image
        width={100}
        height={100}
        className="w-[1200] h-screan"
        src={"Home.svg"}
        alt="Home"
      />

      <h1></h1>
    </div>
  );
};

export default Page;
