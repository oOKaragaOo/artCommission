"use client";

import React, { useContext, useEffect, useState } from "react";
import Navbarone from "@/app/components/Navbarone";
import Sidebar from "../components/Sidebar";
import PostItem from "@/app/components/PostCard"; // component ที่ render โพสต์เดี่ยว
import { SessionContext } from "@/app/api/checkUser/route";
import { getAllPosts } from "@/app/api/route";
import styles from '../../styles/feedpage.module.css';

export default function HomeFeed() {

  const { sessionUser: localSessionUser } = useContext(SessionContext); // 👈 เก็บไว้ใช้
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
                  sessionUser={localSessionUser} // 👈 ส่งลงไปด้วย (ถ้า PostItem จะใช้)
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
}
