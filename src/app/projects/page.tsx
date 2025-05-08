"use client";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Rodal from "rodal";
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
  created_at: string;
};

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("Hammasi");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching projects:", error);
    } else {
      setProjects(data);
    }
    setIsLoading(false);
  };

  const filterProjects = useCallback(() => {
    let result = [...projects];

    // Filter by category
    if (activeFilter !== "Hammasi") {
      result = result.filter(
        (project) =>
          project.category === activeFilter || project.status === activeFilter
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredProjects(result);
  }, [projects, activeFilter, searchQuery]);

  useEffect(() => {
    filterProjects();
  }, [filterProjects]);
  const getUniqueCategories = () => {
    const categories = projects.map((project) => project.category);
    const statuses = projects.map((project) => project.status);
    return ["Hammasi", ...new Set([...categories, ...statuses])];
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Yuqori":
        return "bg-green-500 text-black";
      case "Past":
        return "bg-red-500 text-white";
      case "Boshqa":
        return "bg-gray-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProject(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-black min-h-screen flex flex-col p-4 md:p-8 text-[#39FF14]"
    >
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="w-full py-6 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-widest neon-glow mb-2">
          LOYIHALARIM
        </h1>
        <p className="text-white max-w-2xl mx-auto">
          Ishlab chiqilgan barcha loyihalar ro`yxati. Har bir loyiha haqida
          batafsil ma`lumot.
        </p>
      </motion.header>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Loyihalarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-[#39FF14]/30 duration-300 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent"
            />
            <svg
              className="absolute right-3 top-3.5 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
            {getUniqueCategories().map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-500
               ${
                 activeFilter === category
                   ? "bg-[#39FF14] text-black"
                   : "bg-black text-white hover:bg-[#39FF14] hover:text-black"
               }
             `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between text-center w-full items-center mb-4">
          <p className="text-white">
            {filteredProjects.length} ta loyiha topildi
          </p>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#39FF14]"></div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <svg
            className="mx-auto h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-white">
            Loyihalar topilmadi
          </h3>
          <p className="mt-1 text-white">
            Qidiruv bo`yicha hech narsa topilmadi yoki hali loyihalar
            qo`shilmagan.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-black p-6 rounded-xl border-2 border-[#39FF14]/75 hover:border-[#39FF14] transition-all duration-300 group"
            >
              <div className="relative overflow-hidden rounded-lg mb-4 h-52">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#39FF14] transition-colors">
                  {project.title}
                </h3>
                <span className="text-xs text-white">
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
              </div>

              <p className="text-white text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-black hover:text-[#39ff14] cursor-pointer text-white text-xs rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Link
                  href={project.project_url}
                  target="_blank"
                  className="flex-1 text-center px-4 py-2 bg-[#39FF14] text-black font-semibold rounded-lg hover:bg-black hover:text-[#39FF14] border border-[#39FF14] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ko`rish
                </Link>
                <button
                  onClick={() => openModal(project)}
                  className="px-3 py-2 bg-black text-white rounded-lg  transition-colors border border-[#39ff14] hover:bg-[#39ff14] hover:border-white hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {selectedProject && (
        <Rodal
          visible={isModalVisible}
          onClose={closeModal}
          animation="zoom"
          duration={300}
          height={525}
          customStyles={{
            backgroundColor: `black`,
            border: `2px solid #39FF14`,
            borderRadius: `12px`,
            padding: `20px`,
            maxWidth: `400px`,
            width: `90%`,
          }}
        >
          <div className="text-[#39FF14]">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
            </div>

            <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
              <Image
                src={selectedProject.image_url}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor(
                  selectedProject.status
                )}`}
              >
                {selectedProject.status}
              </span>
              <span className="ml-2 text-white">
                {new Date(selectedProject.created_at).toLocaleDateString()}
              </span>
            </div>

            <p className="text-white mb-4">{selectedProject.description}</p>

            <div className="flex flex-wrap  mb-4">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-black hover:text-[#39ff14] cursor-pointer text-white text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Link
              href={selectedProject.project_url}
              target="_blank"
              className="inline-block px-4 py-2 bg-[#39FF14] text-black font-semibold rounded-lg hover:bg-black hover:text-[#39FF14] border border-[#39FF14] transition-all duration-300"
            >
              Loyihani ko`rish
            </Link>
          </div>
        </Rodal>
      )}
    </motion.div>
  );
};

export default Page;
