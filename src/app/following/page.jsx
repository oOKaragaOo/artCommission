"use client";

import React, { useState } from 'react';
import styles from '../../styles/followingpage.module.css';
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';

const FollowingPage = () => {
  const [followingList, setFollowingList] = useState([
    {
      id: 1,
      username: 'Magnolia28',
      bio: 'Illustrator | Art sign next open, undecided',
      profileImage: '/images/artist1.png',
      previewImages: ['/images/artwork1_1.png', '/images/artwork1_2.png', '/images/artwork1_3.png'],
      website: 'https://magnolia.art',
    },
    {
      id: 2,
      username: 'onegingfree',
      bio: 'Digital Artist',
      profileImage: '/images/artist2.png',
      previewImages: ['/images/artwork2_1.png', '/images/artwork2_2.png', '/images/artwork2_3.png', '/images/artwork2_4.png'],
      website: 'https://onegingfree.art',
    },
    {
      id: 3,
      username: 'sero023',
      bio: 'Freelance Illustrator | tholb-CC0 | OC (RU) 🔞 | https://twitter.com/sero_023 | https://discordapp.com/users/58...',
      profileImage: '/images/artist3.png',
      previewImages: ['/images/artwork3_1.png', '/images/artwork3_2.png'],
      website: 'https://sero023.art',
    },
  ]);

  const [hoveredButtonId, setHoveredButtonId] = useState(null);

  const handleUnfollow = (userId) => {
    console.log(`เลิกติดตามผู้ใช้ ID: ${userId}`);
    setFollowingList(prevList => prevList.filter(user => user.id !== userId));
  };

  const handleMouseEnter = (userId) => {
    setHoveredButtonId(userId);
  };

  const handleMouseLeave = () => {
    setHoveredButtonId(null);
  };

  return (
    <div className={styles.container}>
      <Navbarone />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.followingContent}>
          <h1 className={styles.pageTitle}>กำลังติดตาม</h1>
          <ul className={styles.followingList}>
            {followingList.map(user => (
              <li key={user.id} className={styles.followingItem}>
                <div className={styles.userInfo}>
                  <div className={styles.avatarContainer}>
                    <img src={user.profileImage || "/images/default-avatar.png"} alt={user.username} className={styles.avatar} />
                  </div>
                  <div className={styles.userDetails}>
                    <h2 className={styles.username}>{user.username}</h2>
                    <p className={styles.bio}>{user.bio}</p>
                    {user.website && <a href={user.website} target="_blank" rel="noopener noreferrer" className={styles.website}>{user.website}</a>}
                  </div>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.unfollowButton}
                    onClick={() => handleUnfollow(user.id)}
                    onMouseEnter={() => handleMouseEnter(user.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {hoveredButtonId === user.id ? 'เลิกติดตาม' : 'ติดตามแล้ว'}
                  </button>
                </div>
                <div className={styles.previewImages}>
                  {user.previewImages && user.previewImages.map((image, index) => (
                    <img key={index} src={image} alt={`Preview by ${user.username}`} className={styles.previewImage} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FollowingPage;