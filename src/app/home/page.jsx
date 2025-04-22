"use client";

import React, { useState } from 'react';
import styles from '../../styles/feedpage.module.css';
import Navbarone from '../components/Navbarone'; // Import Navbarone
import Sidebar from '../components/Sidebar';   // Import Sidebar

const FeedPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      artistName: 'USER NAME',
      account: '@NameAccount',
      image: '/images/test1.jpg',
      likes: 15,
      comments: 3,
      shares: 2,
      liked: false,
    },
    {
      id: 2,
      artistName: 'USER NAME',
      account: '@NameAccount',
      image: '/images/placeholder-image-2.png',
      likes: 28,
      comments: 8,
      shares: 5,
      liked: true,
    },
    {
      id: 3,
      artistName: 'USER NAME',
      account: '@NameAccount',
      image: '/images/placeholder-image-2.png',
      likes: 28,
      comments: 8,
      shares: 5,
      liked: true,
    },
    {
      id: 4,
      artistName: 'USER NAME',
      account: '@NameAccount',
      image: '/images/placeholder-image-2.png',
      likes: 28,
      comments: 8,
      shares: 5,
      liked: true,
    },
    // เพิ่มโพสต์อื่นๆ
  ]);

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked } : post
      )
    );
  };

  const handleComment = (postId) => {
    alert(`เปิดความคิดเห็นสำหรับโพสต์ ID: ${postId}`);
  };

  const handleShare = (postId) => {
    alert(`แชร์โพสต์ ID: ${postId}`);
  };

  return (
    <div className={styles.container}>
      <Navbarone /> {/* เรียกใช้ Navbarone */}
      <div className={styles.content}>
        <Sidebar />   {/* เรียกใช้ Sidebar */}
        <div className={styles.feed}>
          {posts.map((post) => (
            <div key={post.id} className={styles.post}>
              <div className={styles.postHeader}>
                <img src="/images/default-avatar.png" alt={post.artistName} className={styles.avatar} />
                <div className={styles.artistInfo}>
                  <h3>{post.artistName}</h3>
                  <p>{post.account}</p>
                </div>
              </div>
              <div className={styles.postImage}>
                <img src={post.image} alt="Post Image" />
              </div>
              <div className={styles.postActions}>
                <button className={`${styles.actionButton} ${post.liked ? styles.liked : ''}`} onClick={() => handleLike(post.id)}>
                  <span role="img" aria-label="heart">❤️</span> {post.likes}
                </button>
                <button className={styles.actionButton} onClick={() => handleComment(post.id)}>
                  <span role="img" aria-label="comment">💬</span> {post.comments}
                </button>
                <button className={styles.actionButton} onClick={() => handleShare(post.id)}>
                  <span role="img" aria-label="share">📤</span> {post.shares}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;