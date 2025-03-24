"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { createClient } from "@/supabase/client";

type Tools = {
  id: string;
  tool_name: string;
  image_url: string;
};

const About = () => {
  const supabase = createClient();
  const [tools, setTools] = useState<Tools[]>([]);

  const fetchTools = useCallback(async () => {
    const { data, error } = await supabase.from("tools").select("*");
    if (error) {
      console.error("Error fetching tools:", error);
    } else {
      setTools(data || []);
    }
  }, [supabase]);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  return (
    <div className="w-full min-h-screen text-[#39FF14] p-6 bg-[#000000]">
      <div className="mb-10">
        <h1 className="text-3xl font-bold border-b-4 border-[#39FF14] inline-block pb-2">
          Men haqimda
        </h1>
        <p className="mt-4 text-white">
          Men Badullayev Samir, 15 yoshdaman, Buxoro viloyati, Kogon shahrida
          tug‘ilganman...
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block bg-[#39FF14] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#2EDC12] transition"
        >
          Bog’lanish
        </Link>
      </div>

      <div className="mt-10">
        <h1 className="text-3xl font-bold border-b-4 border-[#39FF14] inline-block pb-2">
          Asbob-uskunalar
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6 text-center">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="p-4 bg-[#121212] rounded-lg hover:bg-[#1E1E1E] transition transform hover:scale-105 border border-[#39FF14]"
            >
              <Image
                src={tool.image_url || "/fallback-image.png"}
                alt={tool.tool_name}
                width={64}
                height={64}
                className="mx-auto p-2 rounded-2xl border border-[#39FF14]"
              />
              <p className="mt-2 text-[#39FF14]">{tool.tool_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
