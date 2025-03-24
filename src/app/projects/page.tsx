"use client";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "rodal/lib/rodal.css";

const supabase = createClient();

export type Project = {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  status: "Yuqori" | "Past" | "Boshqa";
  tags: string[];
  category: string;
  project_url: string;
};

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*");
    if (error) console.error("Error fetching projects:", error);
    else setProjects(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-black min-h-screen flex flex-col p-6 text-[#39FF14]"
    >
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="w-full py-6 text-center text-4xl font-bold tracking-widest neon-glow"
      >
        LOYIHALAR
      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, index) => {
          const statusColor =
            project.status === "Yuqori"
              ? "bg-green-500 text-black"
              : project.status === "Past"
              ? "bg-red-500 text-white"
              : "bg-gray-500 text-white";

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className="bg-[#0A0A0A] p-6 rounded-xl border-2 border-[#39FF14] shadow-lg hover:shadow-[0_0_25px_#39FF14] transition-all duration-300"
            >
              <Image
                src={project.image_url}
                alt={project.title}
                width={500}
                height={500}
                className="w-full h-52 object-cover rounded-lg shadow-[0_0_20px_#39FF14]"
              />

              <div className="flex justify-between pr-2 pt-4 items-center">
                <h3 className="text-[#39FF14] text-xl font-bold">
                  {project.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-gray-400 text-sm mt-2">
                {project.description}
              </p>

              <p className="text-gray-400 text-xs mt-2 italic">
                {project.tags.length > 0 ? `#${project.tags.join(" #")}` : ""}
              </p>

              <Link
                href={project.project_url}
                target="_blank"
                className="mt-5 block text-center px-4 py-3 bg-[#39FF14] text-black font-semibold rounded-lg hover:bg-black hover:text-[#39FF14] border border-[#39FF14] transition-all duration-300 shadow-md"
              >
                Loyihani ko‘rish
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Page;
