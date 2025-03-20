"use client";
import { createClient } from "@/supabase/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Tools = {
  id: string;
  tool_name: string;
  image_url: string;
};

const About = () => {
  const [tools, setTools] = useState<Tools[] | null>([]);
  const [newTool, setNewTool] = useState({ tool_name: "", image_url: "" });
  const supabase = createClient();

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    const { data, error } = await supabase.from("tools").select("*");
    if (error) {
      console.error("Error fetching tools:", error);
    } else {
      setTools(data);
    }
  };

  // Base64 formatga rasmni yuklash
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTool((prev) => ({ ...prev, image_url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Yangi tool qo‘shish
  const addTool = async () => {
    if (!newTool.tool_name || !newTool.image_url) {
      alert("Tool nomi va rasmi kiritilishi shart!");
      return;
    }
    const { data, error } = await supabase.from("tools").insert([newTool]);
    if (error) {
      console.error("Error adding tool:", error);
    } else {
      setTools([...tools, ...data]);
      setNewTool({ tool_name: "", image_url: "" });
    }
  };

  return (
    <div className="w-full h-screen mx-auto text-white overflow-y-scroll p-10 bg-black">
      <div className="AboutMe mb-16">
        <h1 className="text-3xl font-bold border-b-4 border-green-400 inline-block pb-2">
          Men haqimda
        </h1>
        <p className="mt-4">
          Men Baxriddinov Bekzod, 15 yoshdaman, Buxoro viloyati, Vobkent
          tumanida tug‘ilganman. Men qiziqarli, ko‘p funksiyalarga ega va kuchli
          dizaynga ega bo‘lgan dasturlar yaratishga qiziqaman.
          <br />
          <br />
          Mening vazifam – foydalanuvchilar uchun qulay, jozibali va tezkor
          veb-saytlar yaratish. Sayt dizayni nafaqat chiroyli, balki intuitiv va
          foydalanishga qulay bo‘lishi muhim. Shuningdek, kodlarni moslashuvchan
          va samarali yozishga e’tibor beraman.
          <br />
          <br />
          Mening maqsadim – veb-sayt foydalanuvchilari uchun har bir elementni
          tushunarli va qulay qilish. Agar loyihalarim sizga qiziq bo‘lsa,
          <strong> Loyihalar</strong> sahifasiga tashrif buyuring! 😊
        </p>
        <Link
          href={"/contacts"}
          className="IfoBtn mt-4 inline-block bg-green-500 px-4 py-2 rounded-md"
        >
          Bog’lanish
        </Link>
      </div>

      {/* Tools Section */}
      <div className="AboutMe mb-16">
        <h1 className="text-3xl font-bold border-b-4 border-green-400 inline-block pb-2">
          Asbob-uskunalar
        </h1>
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-6 mt-6 text-center">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition transform hover:scale-110"
            >
              <Image
                src={tool.image_url}
                alt={tool.tool_name}
                width={64}
                height={64}
                className="mx-auto"
              />
              <p className="mt-2 text-gray-300">{tool.tool_name}</p>
            </div>
          ))}
        </div>

        {/* Add Tool Form */}
        <div className="mt-8 p-6 bg-gray-800 rounded-lg">
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
            />
          )}
          <button
            className="w-full bg-green-500 text-white py-2 rounded-md"
            onClick={addTool}
          >
            Qo‘shish
          </button>
        </div>
      </div>

      {/* What I Can Do Section */}
      <div className="AboutMe mb-16">
        <h1 className="text-3xl font-bold border-b-4 border-green-400 inline-block pb-2">
          Men nimalar qila olaman
        </h1>
        <div className="grid grid-cols-2 gap-5 mt-6">
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
              className="mywork flex items-center gap-4 p-4 bg-gray-800 rounded-lg"
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
