"use client";

import React, { useContext, useState, useRef } from "react";
import { motion } from "framer-motion";
import { SessionContext } from "@/app/api/checkUser/route";

export default function ProfileForm({ isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    commissionStatus: "open",
  });

  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);
  const { sessionUser } = useContext(SessionContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setFormData({
      ...formData,
      commissionStatus:
        formData.commissionStatus === "open" ? "close" : "open",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    setIsOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

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
            <div className="w-20 h-20 bg-yellow-400 rounded-full overflow-hidden">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold text-black"
                  /* style={{ marginTop: "10px" }} */
                >
                  😊
                </div>

              )}
            </div>
            <div
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-gray-700 p-1 rounded-full cursor-pointer hover:bg-gray-600"
              title="Upload Image"
            >
              📷
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />

          </div>
          {/* Text Under Pofile */}
          {/* <p
            className="text-sm mt-2 cursor-pointer text-blue-300 underline"
            onClick={() => fileInputRef.current.click()}
          >
            Upload Avatar
          </p> */}
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
