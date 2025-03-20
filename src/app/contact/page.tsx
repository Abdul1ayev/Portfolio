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
    <div
      className="flex items-center justify-center min-h-screen p-4 "
      style={{
        backgroundImage: "url('/Home.svg')",
      }}
    >
      <section className="border-gray-500  border opacity-95 p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-500 mb-4">
          Contact Us
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-500"
            >
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
              className="w-full mt-1 p-2 border text-gray-500 rounded-md border-gray-500 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-500"
            >
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
              className="w-full mt-1 p-2 border text-gray-500 rounded-md border-gray-500 focus:outline-none focus:border-gray-500"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-500"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border text-gray-500 rounded-md border-gray-500 focus:outline-none focus:border-gray-500"
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-1/2 mx-auto block text-gray-500 border hover:text-gray-700 py-2 rounded-md  transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Page;
