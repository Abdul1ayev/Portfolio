"use client";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import { useState } from "react";

const supabase = createClient();
type Project = {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  status: "Yuqori" | "Past" | "Boshqa";
  tags: string[];
  category: string;
  project_url: string;
};

type Tools = {
  id: string;
  tool_name: string;
  image_url: string;
};

const Page = () => {
  const [newProject, setNewProject] = useState<Partial<Project>>({ tags: [] });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tools, setTools] = useState<Tools[]>([]);
  const [newTool, setNewTool] = useState({ tool_name: "", image_url: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== adminEmail || password !== adminPassword) {
      setError("Noto'g'ri email yoki parol.");
      return;
    }

    setIsLoggedIn(true);
    setError("");
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
    const { error: uploadError } = await supabase.storage
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
      setNewProject({ tags: [] });
      setImageFile(null);
    }
  };

  const handleImageProduct = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  const handleImageTool = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTool((prev) => ({ ...prev, image_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addTool = async () => {
    if (!newTool.tool_name || !newTool.image_url) {
      alert("Tool nomi va rasmi kiritilishi shart!");
      return;
    }

    const { data, error } = await supabase
      .from("tools")
      .insert([newTool])
      .select();

    if (error) {
      console.error("Error adding tool:", error);
      return;
    }

    if (!data) {
      console.error("No data returned from Supabase.");
      return;
    }

    setTools([...tools, ...data]);
    setNewTool({ tool_name: "", image_url: "" });
  };

  if (isLoggedIn) {
    return (
      <div className="">
        <h1 className="text-2xl font-bold bg-black text-[#39FF14] p-4">
          Xush kelibsiz, Admin!
        </h1>
        <div className="flex flex-col md:h-full h-auto  md:flex-row gap-6 p-6 bg-black">
          <div className="bg-[#111] w-full md:w-1/2 h-auto rounded-lg shadow-lg p-6">
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
                className="w-full p-[12] rounded-md border-2  text-[#39FF14] border-[#39FF14] mb-3"
                onChange={handleImageProduct}
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleAddProject}
                className="neon-btn bg-[#39FF14] hover:bg-[#2EDC12]"
              >
                Qo‘shish
              </button>
            </div>
          </div>

          <div className="bg-[#121212] w-full md:w-1/2 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#39FF14]">
              Yangi Tool qo‘shish
            </h2>
            <input
              type="text"
              placeholder="Tool nomi"
              className="w-full p-2 neon-input rounded-md bg-[#1E1E1E] text-[#39FF14] border border-[#39FF14] mb-3 focus:outline-none"
              value={newTool.tool_name}
              onChange={(e) =>
                setNewTool({ ...newTool, tool_name: e.target.value })
              }
            />
            <input
              type="file"
              accept="image/*"
              className="w-full p-[12] rounded-md border-2  text-[#39FF14] border-[#39FF14] mb-3"
              onChange={handleImageTool}
            />
            {newTool.image_url && (
              <Image
                src={newTool.image_url}
                alt="Preview"
                width={64}
                height={64}
                className="mb-3 rounded-lg border border-[#39FF14]"
                unoptimized
              />
            )}
            <button
              className="w-full bg-[#39FF14] text-black py-2 rounded-md font-semibold hover:bg-[#2EDC12] transition"
              onClick={addTool}
            >
              Qo‘shish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <form
        onSubmit={handleLogin}
        className="bg-[#121212] p-6 rounded-lg shadow-lg w-full max-w-md border border-[#39FF14]"
      >
        <h2 className="text-2xl font-bold text-[#39FF14] mb-4">Admin Kirish</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md bg-[#1E1E1E] text-[#39FF14] border border-[#39FF14] focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-[#1E1E1E] text-[#39FF14] border border-[#39FF14] focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#39FF14] text-black py-2 rounded-md font-semibold hover:bg-[#2EDC12] transition"
          >
            Kirish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
