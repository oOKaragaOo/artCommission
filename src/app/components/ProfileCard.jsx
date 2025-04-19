"use client";
import { useState } from "react";

export default function ProfileCard({ userData, onEditClick }) {
  return (
    <div className="relative bg-gray-100 rounded-lg shadow mb-4 overflow-hidden">
      {/* Cover Background Layer (อยู่ด้านหลัง) */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gray-500 z-0" />

      {/* เนื้อหาหลัก */}
      <div className="relative z-10 px-6 pt-20 pb-4">
        {/* ปุ่ม Add Cover (ยังคงอยู่ด้านบนขวา) */}
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <button className="flex items-center text-white text-sm px-2 py-1 bg-transparent border border-white rounded hover:bg-white hover:text-teal-700 transition">
            ✏️ Add Cover
          </button>
        </div>

        {/* ข้อมูล Avatar และ Text */}
        <div className="flex items-start">
          {/* Avatar */}
          <div className="w-30 h-25 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow ">
            <span>😊</span>
          </div>

          {/* ข้อมูล Text และปุ่ม Edit Profile */}
          <div className="ml-4 mt-14 text-gray-800 w-full flex items-center justify-between">
            <div>
              <button
                onClick={onEditClick}
                className="absolute right-4 flex gap-2 z-20 text-gray-600 text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 transition"
              >
                ✏️ Edit Profile
              </button>
              <h1 className="text-xl font-semibold">
                {userData?.name || "Guest"}
              </h1>
              <p className="text-sm text-gray-600">
                <span>Role: {userData?.role || "none"}</span>
                <span className="ml-2">
                  Followers: {userData?.followerCount || 0}
                </span>
              </p>
              {userData?.description && (
                <p className="text-sm text-gray-700 mt-1">
                  {userData?.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
