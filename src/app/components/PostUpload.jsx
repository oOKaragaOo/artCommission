"use client";
import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { uploadImageToCloudinary } from "../api/service/cloudinaryService";
import { createPost } from "../api/route";
import { SessionContext } from "@/app/api/checkUser/route";

export default function PostUpload({ onPost }) {
  const { sessionUser } = useContext(SessionContext);
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [caption, setCaption] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption.trim()) return alert("กรุณาเขียนแคปชั่นก่อนโพสต์");

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary(imageFile, sessionUser.user.id);
      }

      const result = await createPost({ imageUrl, caption });
      alert("📦 โพสต์สำเร็จ!");
      location.reload();
      if (onPost) onPost(result.post);
      setIsOpen(false);
      setImageFile(null);
      setPreviewUrl("");
      setCaption("");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
      <>
        <div className="bg-gray-100 text-center rounded-lg p-4 shadow mb-4">
          <button
              onClick={() => setIsOpen(true)}
              className="text-cyan-400 font-semibold hover:underline"
          >
            + New Post
          </button>
        </div>

        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-300 p-6 rounded-xl w-[450px] relative border border-black"
              >
                <div className="w-full h-64 bg-gray-700 rounded-lg border-2 border-dashed border-black flex items-center justify-center mb-4 relative overflow-hidden">
                  <label className="absolute inset-0 cursor-pointer group">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover group-hover:opacity-80"
                        />
                    ) : (
                        <div className="text-white text-xl">📷 แนบรูป</div>
                    )}
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

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                      name="caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
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
