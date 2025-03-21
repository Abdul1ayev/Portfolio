"use client";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
};

const Page = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({ tags: [] });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*");
    if (error) console.error("Error fetching projects:", error);
    else setProjects(data);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  const handleAddProject = async () => {
    if (
      !newProject.title ||
      !imageFile ||
      !newProject.project_url ||
      !newProject.category ||
      !newProject.status
    ) {
      alert("Iltimos, barcha kerakli maydonlarni to'ldiring!");
      return;
    }

    const filePath = `images/${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("projects")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Rasm yuklashda xatolik:", uploadError);
      alert("Rasm yuklab bo‘lmadi!");
      return;
    }

    const { data: urlData } = supabase.storage
      .from("projects")
      .getPublicUrl(filePath);
    const imageUrl = urlData.publicUrl;

    const { error } = await supabase
      .from("projects")
      .insert([{ ...newProject, image_url: imageUrl }]);

    if (error) {
      console.error("Error adding project:", error);
      alert("Loyihani qo‘shishda xatolik yuz berdi!");
    } else {
      fetchProjects();
      setShowModal(false);
      setNewProject({ tags: [] });
      setImageFile(null);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col p-6 text-[#39FF14]">
      <header className="w-full py-6 text-center text-4xl font-bold tracking-widest neon-glow">
        LOYIHALAR
      </header>

      <div className="w-full flex justify-center mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#39FF14] text-black px-8 py-3 text-lg rounded-lg font-semibold hover:bg-[#2EDC12] transition-all duration-300 neon-btn"
        >
          + Loyiha qo‘shish
        </button>
      </div>

      <Rodal
        visible={showModal}
        onClose={() => setShowModal(false)}
        customStyles={{
          background: "#111",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px #39FF14",
          textAlign: "center",
        }}
        width={360}
        height={630}
        className="fixed inset-0 flex items-center justify-center md:p-6"
      >
        <div className="bg-[#111] w-full max-w-[420px] h-auto md:max-h-[630px] rounded-lg shadow-lg p-6">
          <h2 className="text-[#39FF14] text-2xl font-bold mb-5 uppercase">
            Loyiha qo‘shish 🚀
          </h2>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Sarlavha"
              className="neon-input"
              value={newProject.title || ""}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />

            <textarea
              placeholder="Tavsif"
              className="neon-input h-20 resize-none"
              value={newProject.description || ""}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Kategoriya"
              className="neon-input"
              value={newProject.category || ""}
              onChange={(e) =>
                setNewProject({ ...newProject, category: e.target.value })
              }
            />

            <select
              className="neon-input"
              value={newProject.status || ""}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  status: e.target.value as Project["status"],
                })
              }
            >
              <option value="">Holatni tanlang</option>
              <option value="Yuqori">Yuqori</option>
              <option value="Past">Past</option>
              <option value="Boshqa">Boshqa</option>
            </select>

            <input
              type="text"
              placeholder="Teglar (vergul bilan ajrating)"
              className="neon-input"
              value={newProject.tags?.join(", ") || ""}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  tags: e.target.value.split(",").map((tag) => tag.trim()),
                })
              }
            />

            <input
              type="text"
              placeholder="Loyiha URL"
              className="neon-input"
              value={newProject.project_url || ""}
              onChange={(e) =>
                setNewProject({ ...newProject, project_url: e.target.value })
              }
            />

            <input
              type="file"
              accept="image/*"
              className="neon-input file:bg-[#39FF14] file:border-none file:px-4 file:py-2 file:rounded-md file:text-black file:font-semibold cursor-pointer"
              onChange={handleImageUpload}
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setShowModal(false)}
              className="neon-btn bg-red-600 hover:bg-red-700"
            >
              Bekor qilish
            </button>

            <button
              onClick={handleAddProject}
              className="neon-btn bg-[#39FF14] hover:bg-[#2EDC12]"
            >
              Qo‘shish
            </button>
          </div>
        </div>
      </Rodal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const statusColor =
            project.status === "Yuqori"
              ? "bg-green-500 text-black"
              : project.status === "Past"
              ? "bg-red-500 text-white"
              : "bg-gray-500 text-white";

          return (
            <div
              key={project.id}
              className="bg-[#0A0A0A] p-6 rounded-xl border-2 border-[#39FF14] shadow-lg hover:shadow-[0_0_25px_#39FF14] transition-all duration-300 "
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
