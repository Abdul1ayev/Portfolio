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

type Skill = {
  title: string;
  description: string;
  icon: string;
};



const About = () => {
  const supabase = createClient();
  const [tools, setTools] = useState<Tools[]>([]);

  const skills: Skill[] = [
    {
      title: "SEO",
      description: "Qidiruv tizimining natijalarida sayt reytingini yaxshilash",
      icon: "/seo.svg"
    },
    {
      title: "Dizayn",
      description: "Kuchli dizayn va kichik detallargacha e`tibor berish",
      icon: "/dizayn.svg"
    },
    {
      title: "Sifat",
      description: "Yuqori darajada saytlarni sifatli ishlab chiqish",
      icon: "/sifat.svg"
    },
    {
      title: "Tezkorlik",
      description: "Qisqa muddat ichida tezkor sayt ishlab chiqish",
      icon: "/time.svg"
    }
  ];


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
      {/* About Me Section */}
      <section className="mb-16">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold border-b-4 border-[#39FF14] inline-block pb-2">
            Men haqimda
          </h1>
          <div className="mt-8 flex flex-col md:flex-row gap-8 items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-1"
            >
              <p className="text-white text-lg leading-relaxed">
                Men Abdullayev Samir, 15 yoshdaman, Buxoro viloyati, Kogon shahrida
                tug`ilganman. Dasturlashga qiziqishim 12 yoshimdan boshlangan va
                shu kungacha turli loyihalar ustida ishlab kelmoqdaman. Asosan
                veb-dasturlash sohasida Full Stack developer sifatida faoliyat
                yuritaman.
              </p>
              <p className="text-white text-lg mt-4 leading-relaxed">
                Hozirda React, Next.js va Node.js texnologiyalari bilan ishlayman.
                Loyihalarimda kod sifatiga va foydalanuvchilar uchun qulay
                interfeys yaratishga alohida e`tibor beraman.
              </p>
              <div className="flex gap-4 mt-6">
                <Link
                  href="/contact"
                  className="inline-block bg-[#39FF14] text-black px-6 py-3 rounded-md font-semibold hover:bg-[#2EDC12] transition text-lg"
                >
                  Bog`lanish
                </Link>
                
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex-1 flex justify-center"
            >
              <div className="relative md:block hidden w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#39FF14]">
                <Image 
                  src="/Logo.jpg" 
                  alt="Abdullayev Samir"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>



      {/* Skills Section */}
      <section className="my-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold border-b-4 border-[#39FF14] inline-block pb-2">
            Mening Qobiliyatlarim
          </h1>
          <div className="grid md:grid-cols-2 md:gap-6 mt-8 grid-cols-1 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="w-full p-6 rounded-2xl bg-[#121212] hover:bg-[#1E1E1E] transition transform hover:scale-[1.02] border-[#39FF14] border-2 flex items-center gap-4"
              >
                <div className="bg-[#39FF14] p-3 rounded-lg">
                  <Image src={skill.icon} height={40} width={40} alt={skill.title} />
                </div>
                <div>
                  <p className="text-white text-2xl font-medium">{skill.title}</p>
                  <p className="text-gray-300 mt-1">{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Tools Section */}
      <section className="my-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h1 className="text-3xl font-bold border-b-4 border-[#39FF14] inline-block pb-2">
            Ishlatadigan Asboblarim
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8 text-center"
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-4 bg-[#121212] rounded-lg hover:bg-[#1E1E1E] transition transform hover:scale-105 border border-[#39FF14] flex flex-col items-center"
                whileHover={{ y: -5 }}
              >
                <div className="bg-[#39FF14] p-2 rounded-lg mb-3">
                  <Image
                    src={tool.image_url || "/fallback-image.png"}
                    alt={tool.tool_name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <p className="mt-2 text-[#39FF14] font-medium">{tool.tool_name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

     

      {/* Experience Section */}
      <section className="my-16">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h1 className="text-3xl font-bold border-b-4 border-[#39FF14] inline-block pb-2">
            Tajribam
          </h1>
          <div className="mt-8 space-y-8">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="p-6 bg-[#121212] rounded-xl border-l-4 border-[#39FF14]"
            >
              <h3 className="text-xl font-semibold text-[#39FF14]">Freelance Dasturchi</h3>
              <p className="text-gray-300 mt-1">2023 - Hozirgacha</p>
              <ul className="mt-4 space-y-2 text-white">
                <li className="flex items-start">
                  <span className="text-[#39FF14] mr-2">•</span>
                  Turli xil veb-saytlar va web-ilovalarni ishlab chiqish
                </li>
                <li className="flex items-start">
                  <span className="text-[#39FF14] mr-2">•</span>
                  Mijozlar bilan ishlash va ularning ehtiyojlarini tushunish
                </li>
                <li className="flex items-start">
                  <span className="text-[#39FF14] mr-2">•</span>
                  Loyihalarni vaqtida yetkazib berish
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

     
    </motion.div>
  );
};

export default About;