"use client";

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { SessionContext } from "@/app/api/checkUser/route";

export default function ProfileForm({ isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    commissionStatus: "open",
    profilePicture: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setFormData({
      ...formData,
      commissionStatus: formData.commissionStatus === "open" ? "close" : "open",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await fetch("http://localhost:8080/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // สำคัญมาก ถ้าคุณใช้ session ใน Spring
        body: JSON.stringify({
          name: formData.name,
          // profile_picture: formData.profilePicture,
          description: formData.description,
          // commission_status: formData.commissionStatus,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("✅ Profile updated:", result);
        alert("โปรไฟล์ได้รับการอัปเดตแล้ว");
        setIsOpen(false); // ปิด popup
        window.location.reload();
      } else {
        console.error("❌ Error:", result.error);
        alert("เกิดข้อผิดพลาด: " + result.error);
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };
  

  const { sessionUser } = useContext(SessionContext);

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
          <div className="relative group">
            <img
              src={
                formData.profilePicture ||
                sessionUser?.profile_picture ||
                "/default-avatar.png"
              }
              alt="Avatar"
              className="w-20 h-20 object-cover rounded-full border-4 border-white shadow"
            />

            {/* ปุ่มแก้ไขรูป (hover หรือคลิก) */}
            <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
              ✏️
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({
                        ...formData,
                        profilePicture: reader.result,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
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

          <div className="flex justify-center mt-4 space-x-10">
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
