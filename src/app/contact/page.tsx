"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaTwitter } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";

const socialLinks = [
  {
    name: "GitHub",
    icon: <FaGithub size={24} />,
    url: "https://github.com/Abdul1ayev",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin size={24} />,
    url: "https://linkedin.com/in/samir-abdullayev-b827b92b2",
  },
  {
    name: "Telegram",
    icon: <FaTelegram size={24} />,
    url: "https://t.me/Abdullaev_Samir",
  },
];

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(setIsSubmitting);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        "service_ewdtjhu",
        "template_hb32dee",
        {
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        "MCayC2nd7r9e7awd-"
      )
      .then(() => {
        alert("Xabar muvaffaqiyatli yuborildi!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        alert(
          "Xabar yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko‘ring."
        );
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black p-4 md:p-8 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-6xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#39FF14] mb-8"
        >
          Bog'lanish
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center p-6 rounded-xl bg-black border border-[#111111] hover:border-[#39FF14] duration-300 transition-all"
              >
                <div className="p-3 bg-[#111111] rounded-full mb-4">
                  <FaEnvelope className="text-[#39FF14] text-2xl" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                <a
                  href="mailto:abdullayev@gmail.com"
                  className="text-sm text-[#39FF14] hover:underline break-all"
                >
                  abdullayev@gmail.com
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center p-6 rounded-xl bg-black border border-[#111111] hover:border-[#39FF14] duration-300 transition-all"
              >
                <div className="p-3 bg-[#111111] rounded-full mb-4">
                  <FaPhone className="text-[#39FF14] text-2xl" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">
                  Telefon
                </h4>
                <a
                  href="tel:+998916463602"
                  className="text-sm text-[#39FF14] hover:underline"
                >
                  +998 (93) 624 97 08
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center p-6 rounded-xl bg-black border border-[#111111] hover:border-[#39FF14] duration-300 transition-all"
              >
                <div className="p-3 bg-[#111111] rounded-full mb-4">
                  <FaMapMarkerAlt className="text-[#39FF14] text-2xl" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">
                  Manzil
                </h4>
                <p className="text-sm text-[#39FF14] text-center">
                  Toshkent, O‘zbekiston
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 p-6 rounded-xl bg-black hover:scale-101 transition-all duration-300 border border-[#111111] hover:border-[#39FF14]"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Ulanish</h3>
              <p className="text-gray-400 mb-4">
                Agar sizda biror loyiha bo‘lsa yoki imkoniyatlarni muhokama
                qilmoqchi bo‘lsangiz, iltimos, quyidagi kanallardan foydalanib
                menga murojaat qiling.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex justify-center gap-4 mt-8 mb-8"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + index * 0.1, duration: 0.3 }}
                    href={social.url}
                    className="text-white hover:text-[#39FF14] transition-colors"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.section
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full lg:w-1/2"
          >
            <div className="border-[#39FF14] border p-8 rounded-2xl bg-black shadow-lg">
              <h2 className="text-2xl font-bold text-center text-[#39FF14] mb-6">
                Xabar yuboring
              </h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Ismingiz
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Jon Do"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-black transition-all duration-300 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email manzilingiz
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="youremail@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-black transition-all duration-300 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent"
                  />
                </motion.div>
                php-template Копировать Редактировать
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Xabaringiz
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Xabar qoldiring..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-2.5 bg-black transition-all duration-300 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#39FF14] focus:border-transparent"
                  ></textarea>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#39FF14] text-black font-semibold rounded-lg hover:bg-[#4CAF50] transition duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? "Yuborilmoqda..." : "Xabarni yuborish"}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default Page;
