"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import PostUpload from "@/app/components/PostUpload";
import ProfileCard from "@/app/components/ProfileCard";
import ProfileForm from "@/app/components/ProfileForm";
import PostItem from "@/app/components/PostCard"; // component ที่ render โพสต์เดี่ยว
import { SessionContext } from "@/app/api/checkUser/route";
import { getProfile, getFeedProfile } from "@/app/api/route";

export default function ProfilePage() {
  const { sessionUser: localSessionUser } = useContext(SessionContext);
  const [apiUserData, setApiUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false); // 🔄 trigger for refresh

  // 🔄 โหลด user ใหม่ (ใช้หลังแก้โปรไฟล์)
  const fetchUserData = async () => {
    const result = await getProfile();
    if (!result.error) setApiUserData(result.user);
  };

  // 🔄 โหลด user ตอนแรกและทุกครั้งที่ refreshFlag เปลี่ยน
  useEffect(() => {
    fetchUserData();
  }, [refreshFlag]);

  // 🔄 โหลดโพสต์ของ user
  useEffect(() => {
    const fetchPosts = async () => {
      if (localSessionUser?.user?.id) {
        await getFeedProfile(localSessionUser.user.id, setPosts, setError);
      }
    };
    fetchPosts();
  }, [localSessionUser]);

  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleEditProfile = () => {
    setIsLogin(true);
    setIsOpen(true);
  };

  const handleProfileUpdated = () => {
    setRefreshFlag((prev) => !prev); // 🔁 toggle เพื่อกระตุ้น useEffect รีโหลด
    setIsOpen(false);
  };

  return (
    <div>
      <Navbar session={localSessionUser} />
      <div className="max-w-3xl mx-auto p-4">
        <ProfileCard userData={apiUserData} onEditClick={handleEditProfile} />
        <PostUpload onPost={handleNewPost} />

        {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) =>
                post ? <PostItem key={post.postId} post={{ ...post, id: post.postId }} />: null
            )
        ) : (
            <p>ไม่มีโพสต์</p>
        )}
        <ProfileForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLogin={isLogin}
          onProfileUpdated={handleProfileUpdated} // ✅ trigger reload แบบแน่นอน
        />
      </div>
    </div>
  );
}