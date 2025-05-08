"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbarone from "@/app/components/Navbarone";
import Sidebar from "../components/Sidebar";
import PostItem from "@/app/components/PostCard";
import { SessionContext } from "@/app/api/checkUser/route";
import { getAllPosts } from "@/app/api/route";
import styles from './feedpage.module.css';

const HomeFeed = () => {
    const { sessionUser: localSessionUser } = useContext(SessionContext);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            await getAllPosts(setPosts, setError);
        };
        fetchPosts();
    }, []);

    return (
        <div className={styles.container}>
            <Navbarone />
            <div className={styles.content}>
                <Sidebar />
                <div className={styles.feed}>
                    {Array.isArray(posts) && posts.length > 0 ? (
                        posts.map((post) =>
                            post ? (
                                <PostItem
                                    className={styles.post}
                                    key={post.postId}
                                    post={{ ...post, id: post.postId }}
                                    sessionUser={localSessionUser}
                                />
                            ) : null
                        )
                    ) : (
                        <p>ไม่มีโพสต์</p>
                    )}
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default HomeFeed;