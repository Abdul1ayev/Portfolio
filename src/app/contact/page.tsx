"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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
        "template_pnmkrh8",
        {
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        "MCayC2nd7r9e7awd-"
      )
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        alert("Failed to send the message. Please try again later.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#000000] p-4">
      <section className="border-[#39FF14] border p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-[#39FF14] mb-4">
          Contact Us
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#39FF14]">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border text-[#39FF14] bg-[#000000] rounded-md border-[#39FF14] focus:outline-none focus:border-[#39FF14]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#39FF14]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border text-[#39FF14] bg-[#000000] rounded-md border-[#39FF14] focus:outline-none focus:border-[#39FF14]"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#39FF14]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border text-[#39FF14] bg-[#000000] rounded-md border-[#39FF14] focus:outline-none focus:border-[#39FF14]"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#39FF14] text-[#000000] py-2 rounded-md hover:bg-[#2ecc71] transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Page;
