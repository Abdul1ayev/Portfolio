"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { createClient } from "@/supabase/client";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full text-[#39FF14] p-6 bg-[#000000]"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold border-b-4 border-[#39FF14] inline-block pb-2">
          Men haqimda
        </h1>
        <p className="mt-4 text-white">
          Men Abdullayev Samir, 15 yoshdaman, Buxoro viloyati, Kogon shahrida
          tug‘ilganman...
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block bg-[#39FF14] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#2EDC12] transition"
        >
          Bog’lanish
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10"
      >
        <h1 className="text-3xl font-bold border-b-4 border-[#39FF14] inline-block pb-2">
          Asbob-uskunalar
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6 text-center"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 * index }}
              className="p-4 bg-[#121212] rounded-lg hover:bg-[#1E1E1E] transition transform hover:scale-101 border border-[#39FF14]"
            >
              <Image
                src={tool.image_url || "/fallback-image.png"}
                alt={tool.tool_name}
                width={64}
                height={64}
                className="mx-auto p-2 rounded-2xl border border-[#39FF14]"
              />
              <p className="mt-2 text-[#39FF14]">{tool.tool_name}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <div className="mt-[64] w-full ">
        <h1 className="text-3xl font-bold border-b-4 border-[#39FF14] inline-block pb-2">
          Asbob-uskunalar
        </h1>
        <div className="grid md:grid-cols-2 md:gap-5 mt-6 grid-cols-1 gap-4">
          <div className="w-full p-6  rounded-2xl gap-[15] bg-[#121212] hover:bg-[#1E1E1E] transition transform hover:scale-101 border-[#39FF14] border-2 flex items-center">
            <Image src={"/seo.svg"} height={64} width={64} alt=""></Image>
            <div>
              <p className="text-white text-2xl">Seo</p>
              <p className="text-gray-300">
                Qidiruv tizimining natijalarida sayt reytingini yaxshilash
              </p>
            </div>
          </div>
          <div className="w-full p-5  rounded-2xl gap-[14] bg-[#121212] hover:bg-[#1E1E1E] transition transform hover:scale-101 border-[#39FF14] border-2 flex items-center">
            <Image src={"/seo.svg"} height={64} width={64} alt=""></Image>
            <div>
              <p className="text-white text-2xl">Seo</p>
              <p className="text-gray-300">
                Qidiruv tizimining natijalarida sayt reytingini yaxshilash
              </p>
            </div>
          </div>
          <div className="w-full p-5 rounded-2xl gap-[14] bg-[#121212] hover:bg-[#1E1E1E] transition transform hover:scale-101 border-[#39FF14] border-2 flex items-center">
            <Image src={"/seo.svg"} height={64} width={64} alt=""></Image>
            <div>
              <p className="text-white text-2xl">Seo</p>
              <p className="text-gray-300">
                Qidiruv tizimining natijalarida sayt reytingini yaxshilash
              </p>
            </div>
          </div>
          <div className="w-full p-5 rounded-2xl gap-[14] bg-[#121212] hover:bg-[#1E1E1E] transition transform hover:scale-101 border-[#39FF14] border-2 flex items-center">
            <Image src={"/seo.svg"} height={64} width={64} alt=""></Image>
            <div>
              <p className="text-white text-2xl">Seo</p>
              <p className="text-gray-300">
                Qidiruv tizimining natijalarida sayt reytingini yaxshilash
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
