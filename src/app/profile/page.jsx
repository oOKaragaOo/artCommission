"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import PostUpload from "@/app/components/PostUpload";
import ProfileCard from "@/app/components/ProfileCard";
import ProfileForm from "@/app/components/ProfileForm";
import PostItem from "@/app/components/PostCard";
import { SessionContext } from "@/app/api/checkUser/route";
import { getFeedProfile } from "@/app/api/route";
import { getUserById } from "@/app/api/service/userService";

const ProfilePage = () => {
    const { sessionUser: localSessionUser } = useContext(SessionContext);
    const [apiUserData, setApiUserData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const fetchUserData = async () => {
        if (localSessionUser?.user?.id) {
            const userData = await getUserById(localSessionUser.user.id);
            setApiUserData(userData);
        }
    };

    const fetchUserPosts = async () => {
        if (localSessionUser?.user?.id) {
            await getFeedProfile(localSessionUser.user.id, setPosts, setError);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [localSessionUser]);

    useEffect(() => {
        fetchUserPosts();
    }, [localSessionUser]);

    const handleNewPost = (newPost) => {
        setPosts((prev) => [newPost, ...prev]);
    };

    const handleEditProfileClick = () => {
        setIsLogin(true);
        setIsProfileFormOpen(true);
    };

    const handleProfileUpdated = () => {
        fetchUserData(); // Reload user data
        setIsProfileFormOpen(false);
        // Consider a more specific UI update instead of a full reload
        // location.reload();
    };

    return (
        <div>
            <Navbar session={localSessionUser} />
            <div className="max-w-3xl mx-auto p-4">
                <ProfileCard
                    userData={apiUserData}
                    onEditClick={handleEditProfileClick}
                    isOwnProfile={true}
                />
                <PostUpload onPost={handleNewPost} />

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
            </div>
        </div>
    );
};

export default ProfilePage;