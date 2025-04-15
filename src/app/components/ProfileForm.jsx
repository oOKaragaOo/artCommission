"use client";

import React, { useEffect,useState } from "react";
import { motion } from "framer-motion";
import { PencilIcon } from "@heroicons/react/24/solid";
import { checkSession } from "../api/route";

export default function ProfileForm({ isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    commissionStatus: "open", // ✅ เพิ่ม default value
  });

  const [sessionUser, setSessionUser] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setFormData({
      ...formData,
      commissionStatus: formData.commissionStatus === "open" ? "close" : "open",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    setIsOpen(false);
  };
  useEffect(() => {
    const fetchSession = async () => {
      await checkSession(setSessionUser);
    };
    fetchSession();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-[#3E3E3E] text-white p-6 rounded-xl w-[400px] relative"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold text-black">
              😊
            </div>
            <div className="absolute bottom-0 right-0 bg-gray-700 p-1 rounded-full cursor-pointer">
              <PencilIcon className="h-4 w-4 text-white" />
            </div>
          </div>
          <p className="text-sm mt-2 cursor-pointer text-blue-300 underline">
            Add Cover
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm text-blue-200">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="text-sm text-blue-200">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="text-sm text-blue-200">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Description"
            />
          </div>

          {sessionUser?.role === "Artist" && (
            <div>
              <label className="text-sm text-blue-200 mb-1 block">
                Commission Status
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-sm w-10 text-right">
                  {formData.commissionStatus === "open" ? "Open" : "Close"}
                </span>
                <div
                  className={`w-14 h-8 p-1 rounded-full flex items-center transition-all duration-300 cursor-pointer ${
                    formData.commissionStatus === "open"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                  onClick={handleToggle}
                >
                  <div
                    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                      formData.commissionStatus === "open"
                        ? "translate-x-0"
                        : "translate-x-6"
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-cyan-400 text-white px-4 py-2 rounded hover:bg-cyan-500"
            >
              ยืนยัน
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setIsOpen(false)}
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
