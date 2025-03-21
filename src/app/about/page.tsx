"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createClient } from "@/supabase/client";

type Tools = {
  id: string;
  tool_name: string;
  image_url: string;
};

const About = () => {
  const supabase = createClient();
  const [tools, setTools] = useState<Tools[]>([]);
  const [newTool, setNewTool] = useState({ tool_name: "", image_url: "" });

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    const { data, error } = await supabase.from("tools").select("*");
    if (error) {
      console.error("Error fetching tools:", error);
    } else {
      setTools(data || []);
    }
  };

  const handleImageUpload = async (
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

      <div className="p-6 bg-[#121212] rounded-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Yangi Tool qo‘shish
        </h2>
        <input
          type="text"
          placeholder="Tool nomi"
          className="w-full p-2 rounded-md bg-[#1E1E1E] text-white border border-[#39FF14] mb-3 focus:outline-none"
          value={newTool.tool_name}
          onChange={(e) =>
            setNewTool({ ...newTool, tool_name: e.target.value })
          }
        />
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 rounded-md bg-[#1E1E1E] text-white border border-[#39FF14] mb-3"
          onChange={handleImageUpload}
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
