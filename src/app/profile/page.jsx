"use client";

import PostUpload from "@/app/components/PostUpload";
import ProfileFeed from "@/app/components/ProfileFeed";
import Navbar from "@/app/components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import ProfileCard from "@/app/components/ProfileCard";
import { SessionContext } from "@/app/api/checkUser/route";
import { getProfile } from "@/app/api/route";
import { getFeedProfile } from "@/app/api/route"; // Import ฟังก์ชัน fetch posts

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { sessionUser: localSessionUser } = useContext(SessionContext);
  const [apiUserData, setApiUserData] = useState(null);
  const [posts, setPosts] = useState([]); // State สำหรับ posts
  const [error, setError] = useState(null); // State สำหรับ error
  const [isPostOpen, setIsPostOpen] = useState(false);
  
  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleEditProfile = () => {
    setIsLogin(true); // ถ้าต้องการเปิด modal แบบต้อง login
    setIsOpen(true); // เปิดฟอร์ม
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const profileResult = await getProfile();
      if (!profileResult.error) {
        setApiUserData(profileResult.user);
      }

      if (localSessionUser?.user?.id) {
        await getFeedProfile(localSessionUser.user.id, setPosts, setError);
      }
    };

    fetchAllData();
  }, [localSessionUser]);

  console.log("Local Session User:", localSessionUser);
  console.log("API User Data:", apiUserData);
  console.log("Posts:", posts);

  return (
    <div>
      <Navbar session={localSessionUser} />
      <div className="max-w-3xl mx-auto p-4">

        {/* Card แสดงข้อมูลผู้ใช้ */}
        <ProfileCard userData={apiUserData} onEditClick={handleEditProfile} />

        {/* Upload โพสต์ */}
        <PostUpload onPost={handleNewPost} />

        {/* แสดง feed */}
        {error ? <div>Error: {error}</div> : <ProfileFeed posts={posts} />}

        {/* Modal แบบ Pop-up */}
        <ProfileForm isOpen={isOpen} setIsOpen={setIsOpen} isLogin={isLogin} />
      </div>
    </div>
  );
}
