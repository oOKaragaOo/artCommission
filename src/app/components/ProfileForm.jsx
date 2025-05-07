"use client";

import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SessionContext } from "@/app/api/checkUser/route";
import { refreshProfile } from "@/app/api/route";
import { uploadImageToCloudinary } from "@/app/api/service/cloudinaryService";

export default function ProfileForm({ isOpen, setIsOpen, onProfileUpdated, userData }) {

  const { sessionUser, setSessionUser } = useContext(SessionContext);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    commissionStatus: "open",
    profilePicture: "",
    profilePictureFile: null,
  });

  // ✅ ดึงค่าจาก sessionUser มา preload ฟอร์มเมื่อเปิด popup
  useEffect(() => {
    if (isOpen && userData) {
      setFormData({
        name: userData.name || "",
        description: userData.description || "",
        commissionStatus: userData.commission_status || "open",
        profilePicture: userData.profile_picture || "",
      });
      setPreviewUrl("");
      setImageFile(null);
    }
  }, [isOpen, userData]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    console.log(formData)
    try {
      let uploadedUrl = formData.profilePicture;

      if (imageFile) {
        uploadedUrl = await uploadImageToCloudinary(imageFile, userData.id);
      }

      const response = await fetch("http://localhost:8080/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // สำคัญมาก ถ้าคุณใช้ session ใน Spring
        body: JSON.stringify({
          name: formData.name,
          profile_picture: uploadedUrl,
          description: formData.description,
          commission_status: formData.commissionStatus,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("❌ Error:", result.error);
        alert("เกิดข้อผิดพลาด: " + result.error);
        return;
      }

      const updatedUser = await refreshProfile();
      if (updatedUser) setSessionUser(updatedUser);

      onProfileUpdated?.();
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Upload/Profile error:", error);
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  if (!isOpen) return null;

  const safeSrc =
      previewUrl?.trim() ||
      formData.profilePicture?.trim() ||
      sessionUser?.profile_picture?.trim() ||
      "/default-avatar.png";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-gray-300 text-white p-6 rounded-xl w-[400px] border-black relative"
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
              className="w-20 h-20 object-cover rounded-full border-4 border-black shadow"
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
                        profilePicture: reader.result, // สำหรับ preview
                        profilePictureFile: file, // ไว้อัปโหลดจริง
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
            <label className="text-sm text-black">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Name"
              required
            />
          </div>

          <div>
            <label className="text-sm text-black">Description</label>
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
                  <label className="text-sm text-blue-200 mb-1 block">Commission Status</label>
                  <div className="flex items-center space-x-2">
                <span className="text-sm w-10 text-right">
                  {formData.commissionStatus === "open" ? "Open" : "Close"}
                </span>
                    <div
                        className={`w-14 h-8 p-1 rounded-full flex items-center transition-all duration-300 cursor-pointer ${
                            formData.commissionStatus === "open" ? "bg-green-500" : "bg-gray-500"
                        }`}
                        onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              commissionStatus: prev.commissionStatus === "open" ? "close" : "open",
                            }))
                        }
                    >
                      <div
                          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                              formData.commissionStatus === "open" ? "translate-x-0" : "translate-x-6"
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
