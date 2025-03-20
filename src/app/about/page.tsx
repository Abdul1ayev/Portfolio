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
  const supabase = createClient()
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
    <div className="w-full min-h-screen  text-white md:pr-12 pt-6 pr-6 md:pb-18 pb-4 bg-black">
      <div className="mb-10">
        <h1 className="text-3xl font-bold border-b-4 border-green-400 inline-block pb-2">
          Men haqimda
        </h1>
        <p className="mt-4">
          Men Badullayev Samir, 15 yoshdaman, Buxoro viloyati, Kogon shahrida
          tug‘ilganman...
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block bg-green-500 px-4 py-2 rounded-md"
        >
          Bog’lanish
        </Link>
      </div>

      <div className="p-6 bg-gray-800 rounded-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Yangi Tool qo‘shish</h2>
        <input
          type="text"
          placeholder="Tool nomi"
          className="w-full p-2 rounded-md bg-gray-700 text-white mb-3"
          value={newTool.tool_name}
          onChange={(e) =>
            setNewTool({ ...newTool, tool_name: e.target.value })
          }
        />
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 rounded-md bg-gray-700 text-white mb-3"
          onChange={handleImageUpload}
        />
        {newTool.image_url && (
          <Image
            src={newTool.image_url}
            alt="Preview"
            width={64}
            height={64}
            className="mb-3"
            unoptimized
          />
        )}
        <button
          className="w-full bg-green-500 text-white py-2 rounded-md"
          onClick={addTool}
        >
          Qo‘shish
        </button>
      </div>

      <div className="mt-10">
        <h1 className="text-3xl font-bold border-b-4 border-green-400 inline-block pb-2">
          Asbob-uskunalar
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6 text-center">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition transform hover:scale-105"
            >
              <Image
                src={tool.image_url || "/fallback-image.png"}
                alt={tool.tool_name}
                width={64}
                height={64}
                className="mx-auto rounded-2xl"
              />
              <p className="mt-2 text-gray-300">{tool.tool_name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-3xl font-bold border-b-4 border-green-400 inline-block pb-2">
          Men nimalar qila olaman
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {[
            {
              img: "/image wrapper.svg",
              title: "SEO",
              desc: "Qidiruv tizimining natijalarida sayt reytingini yaxshilash",
            },
            {
              img: "/image wrapper (1).svg",
              title: "Dizayn",
              desc: "Kuchli dizayn va kichik detallargacha e’tibor berish",
            },
            {
              img: "/image wrapper (2).svg",
              title: "Sifat",
              desc: "Yuqori darajada saytlarni sifatli ishlab chiqish",
            },
            {
              img: "/image wrapper (3).svg",
              title: "Tezkorlik",
              desc: "Qisqa muddat ichida tezkor sayt ishlab chiqish",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg"
            >
              <Image src={item.img} alt={item.title} width={64} height={64} />
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
