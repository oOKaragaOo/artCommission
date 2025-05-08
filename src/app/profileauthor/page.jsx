"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import PostUpload from "@/app/components/PostUpload";
import ProfileCard from "@/app/components/ProfileCard";
import ProfileForm from "@/app/components/ProfileForm";
import PostItem from "@/app/components/PostCard";
import { SessionContext } from "@/app/api/checkUser/route";
import { getFeedProfile } from "@/app/api/route";
import { useSearchParams } from "next/navigation";

const ProfileAuthorPage = () => {
    const { sessionUser: localSessionUser } = useContext(SessionContext);
    const [apiUserData, setApiUserData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const searchParams = useSearchParams();
    const authorId = searchParams.get("authorId");
    const isOwnProfile = localSessionUser?.user?.id === Number(authorId);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/user/${authorId}`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to get profile");
            }

            setApiUserData(data.user);
        } catch (err) {
            console.error("Failed to load user data:", err);
            setError("ไม่สามารถโหลดโปรไฟล์ผู้ใช้ได้");
        }
    };

    const fetchUserPosts = async () => {
        if (!authorId) return;

        try {
            await getFeedProfile(authorId, setPosts, setError);
        } catch (err) {
            console.error("Failed to load posts:", err);
        }
    };

    useEffect(() => {
        if (authorId) {
            fetchUserData();
            fetchUserPosts();
        }
    }, [authorId]);

    const handleNewPost = (newPost) => {
        setPosts((prev) => [newPost, ...prev]);
    };

    const handleEditProfileClick = () => {
        setIsLogin(true);
        setIsProfileFormOpen(true);
    };

    const handleProfileUpdated = () => {
        fetchUserData();
        fetchUserPosts();
        setIsProfileFormOpen(false);
    };

    return (
        <div>
            <Navbar session={localSessionUser} />
            <div className="max-w-3xl mx-auto p-4">
                {apiUserData ? (
                    <>
                        <ProfileCard
                            userData={apiUserData}
                            onEditClick={handleEditProfileClick}
                            isOwnProfile={isOwnProfile}
                        />

                        {isOwnProfile && <PostUpload onPost={handleNewPost} />}

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
                            isOpen={isProfileFormOpen}
                            setIsOpen={setIsProfileFormOpen}
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
};

export default ProfileAuthorPage;