"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import PostUpload from "@/app/components/PostUpload";
import ProfileCard from "@/app/components/ProfileCard";
import ProfileForm from "@/app/components/ProfileForm";
import PostItem from "@/app/components/PostCard"; // component ที่ render โพสต์เดี่ยว
import { SessionContext } from "@/app/api/checkUser/route";
import { getFeedProfile } from "@/app/api/route";
import { useSearchParams } from "next/navigation"; // ✅ ใช้สำหรับดึง authorId

export default function ProfileAuthorPage() {
  const { sessionUser: localSessionUser } = useContext(SessionContext);
  const [apiUserData, setApiUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const searchParams = useSearchParams(); // ✅ ดึง params
  const authorId = searchParams.get("authorId"); // 👈 ดึง authorId จาก query string

  // โหลด user ข้อมูลจาก authorId
  const loadUserData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/user/${authorId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get profile");
      setApiUserData(data.user); // ✅ สมมติ API ส่งเป็น { user: {...} }
    } catch (error) {
      console.error("Failed to load user data:", error);
      setError("ไม่สามารถโหลดโปรไฟล์ผู้ใช้ได้");
    }
  };

  // โหลดโพสต์ของ user (โดยใช้ authorId)
  const loadUserPosts = async () => {
    if (!authorId) return;
    try {
      await getFeedProfile(authorId, setPosts, setError);
    } catch (err) {
      console.error("Failed to load posts:", err);
    }
  };

  // โหลด user + โพสต์ ตอน mount
  useEffect(() => {
    if (authorId) {
      loadUserData();
      loadUserPosts();
    }
  }, [authorId]);

  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleEditProfile = () => {
    setIsLogin(true);
    setIsOpen(true);
  };

  const handleProfileUpdated = () => {
    loadUserData(); // reload ข้อมูลใหม่
    loadUserPosts();
    setIsOpen(false);
  };

  return (
    <div>
      <Navbar session={localSessionUser} />
      <div className="max-w-3xl mx-auto p-4">
        {apiUserData ? (
          <>
            <ProfileCard userData={apiUserData} onEditClick={handleEditProfile} />

            {/* ✅ เงื่อนไข: ถ้าเป็นเจ้าของเอง ค่อยโชว์ PostUpload */}
            {localSessionUser?.user?.id === Number(authorId) && (
              <PostUpload onPost={handleNewPost} />
            )}

            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) =>
                post ? (
                  <PostItem
                    key={post.postId}
                    post={{ ...post, id: post.postId }}
                    setPosts={setPosts}
                  />
                ) : null
              )
            ) : (
              <p>ไม่มีโพสต์</p>
            )}

            <ProfileForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isLogin={isLogin}
              onProfileUpdated={handleProfileUpdated}
              userData={apiUserData}
            />
          </>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>กำลังโหลดข้อมูล...</p>
        )}
      </div>
    </div>
  );
}
