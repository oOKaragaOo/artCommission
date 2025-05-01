"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function PostUpload({ onPost }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: "",
    caption: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ เช็กว่าแนบรูปและใส่แคปชั่นครบ
    if (!formData.imageUrl) {
      alert("กรุณาแนบรูปก่อนโพสต์");
      return;
    }
    if (!formData.caption.trim()) {
      alert("กรุณาเขียนแคปชั่นก่อนโพสต์");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          imageUrl: formData.imageUrl,
          caption: formData.caption,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        location.reload();
        // alert("โพสต์ของคุณถูกเผยแพร่เรียบร้อยแล้ว!");
        if (onPost && result.post) {
          onPost(result.post);
        }
        setIsOpen(false);
        setFormData({ imageUrl: "", caption: "" }); // ล้างฟอร์ม
      } else {
        alert("เกิดข้อผิดพลาด: " + result.error);
      }
    } catch (error) {
      alert("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    }
  };

  return (
    <>
      {/* ปุ่มเปิด popup */}
      <div className="bg-gray-100 text-center rounded-lg p-4 shadow mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="text-cyan-400 font-semibold hover:underline"
        >
          + New Post
        </button>
      </div>

      {/* Modal popup */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-fit bg-gray-300 p-6 rounded-xl w-[450px] relative border border-black"
          >
            {/* กล่องรูป */}
            <div className="w-140 h-75 bg-gray-700 rounded-lg border-2 border-dashed border-black flex items-center justify-center mb-4 relative overflow-hidden">
              <label className="absolute inset-0 cursor-pointer group">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover group-hover:opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-xl opacity-0 group-hover:opacity-100 bg-black/40 transition">
                  ✏️ เปลี่ยนรูป
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* ฟอร์ม caption */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="caption"
                value={formData.caption}
                onChange={(e) =>
                  setFormData({ ...formData, caption: e.target.value })
                }
                className="w-full p-2 rounded bg-gray-600 text-white placeholder:text-gray-300"
                placeholder="Caption"
              />

              <div className="flex justify-between space-x-4 mt-2">
                <button
                  type="submit"
                  className="bg-cyan-500 text-white w-1/2 py-2 rounded hover:bg-cyan-600"
                >
                  ยืนยัน
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white w-1/2 py-2 rounded hover:bg-red-600"
                  onClick={() => setIsOpen(false)}
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
