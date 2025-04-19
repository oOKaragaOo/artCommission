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

    const handleNewPost = () => {
        console.log("Post clicked");
    };

    // Fetch ข้อมูล user profile
    useEffect(() => {
        const fetchData = async () => {
            const result = await getProfile();
            if (!result.error) {
                setApiUserData(result.user);
            }
        };
        fetchData();
    }, []);

    // Fetch posts ที่เกี่ยวข้อง
    useEffect(() => {
        const fetchPosts = async () => {
            if (localSessionUser && localSessionUser.user && localSessionUser.user.id) {
                await getFeedProfile(localSessionUser.user.id, setPosts, setError);
            }
        };
        fetchPosts();
    }, [localSessionUser]);

    console.log("Local Session User:", localSessionUser);
    console.log("API User Data:", apiUserData);
    console.log("Posts:", posts);

    return (
        <div>
            <Navbar session={localSessionUser} />
            <div className="max-w-3xl mx-auto p-4">
                <ProfileCard userData={apiUserData} />
                <PostUpload onPost={handleNewPost} />
                {/* ส่งข้อมูล posts ไปยัง ProfileFeed */}
                {error ? (
                    <div>Error: {error}</div>
                ) : (
                    <ProfileFeed posts={posts} />
                )}
                <ProfileForm isOpen={isOpen} setIsOpen={setIsOpen} isLogin={isLogin} />
            </div>
        </div>
    );
}
