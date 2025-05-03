"use client";

import React, { useState } from 'react';
import styles from '../../styles/explore.module.css';
import detailStyles from '../../styles/artworkdetailpopup.module.css';
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';
import ArtworkGrid from '../components/ArtworkGrid'; // Import the new component
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons';

function ExplorePage() {
  const [activeTab, setActiveTab] = useState('popular');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const router = useRouter();

  // Sample artwork data (replace with your actual data including more details)
  const popularArtworks = [
    { id: 1, imageUrl: '/images/explore/1.jpg', title: 'オルテナウス', artist: '仮野', likes: 15, comments: 3, profileImageUrl: '/images/profiles/user1.png' },
    { id: 2, imageUrl: '/images/explore/2.jpg', title: 'Untitled', artist: 'Ahomei', likes: 22, comments: 8, profileImageUrl: '/images/profiles/user2.png' },
    { id: 3, imageUrl: '/images/explore/3.jpg', title: 'マシュ', artist: 'まおさめ', likes: 10, comments: 1, profileImageUrl: '/images/profiles/user3.png' },
    { id: 4, imageUrl: '/images/explore/4.jpg', title: 'Popular 4', artist: 'Artist D', likes: 30, comments: 5, profileImageUrl: '/images/default-profile.png' },
    { id: 5, imageUrl: '/images/explore/5.jpg', title: 'Popular 5', artist: 'Artist E', likes: 18, comments: 2, profileImageUrl: '/images/default-profile.png' },
    { id: 6, imageUrl: '/images/explore/6.jpg', title: 'Popular 6', artist: 'Artist F', likes: 25, comments: 7, profileImageUrl: '/images/default-profile.png' },
    { id: 7, imageUrl: '/images/explore/7.jpg', title: 'Popular 7', artist: 'Artist G', likes: 12, comments: 4, profileImageUrl: '/images/default-profile.png' },
    { id: 8, imageUrl: '/images/explore/8.jpg', title: 'Popular 8', artist: 'Artist H', likes: 9, comments: 2, profileImageUrl: '/images/default-profile.png' },
    { id: 9, imageUrl: '/images/explore/9.jpg', title: 'Popular 9', artist: 'Artist I', likes: 28, comments: 6, profileImageUrl: '/images/default-profile.png' },
    // ... more popular artworks
  ];

  const recentArtworks = [
    { id: 101, imageUrl: '/images/explore/1.jpg', title: 'Recent 1', artist: 'New Artist 1', likes: 5, comments: 0, profileImageUrl: '/images/default-profile.png' },
    { id: 102, imageUrl: '/images/explore/2.jpg', title: 'Recent 2', artist: 'New Artist 2', likes: 12, comments: 4, profileImageUrl: '/images/default-profile.png' },
    { id: 103, imageUrl: '/images/explore/3.jpg', title: 'Recent 3', artist: 'New Artist 3', likes: 7, comments: 1, profileImageUrl: '/images/default-profile.png' },
    { id: 104, imageUrl: '/images/explore/4.jpg', title: 'Recent 4', artist: 'New Artist 4', likes: 19, comments: 3, profileImageUrl: '/images/default-profile.png' },
    { id: 105, imageUrl: '/images/explore/5.jpg', title: 'Recent 5', artist: 'New Artist 5', likes: 11, comments: 2, profileImageUrl: '/images/default-profile.png' },
    { id: 106, imageUrl: '/images/explore/6.jpg', title: 'Recent 6', artist: 'New Artist 6', likes: 21, comments: 5, profileImageUrl: '/images/default-profile.png' },
    { id: 107, imageUrl: '/images/explore/7.jpg', title: 'Recent 7', artist: 'New Artist 7', likes: 6, comments: 1, profileImageUrl: '/images/default-profile.png' },
    { id: 108, imageUrl: '/images/explore/8.jpg', title: 'Recent 8', artist: 'New Artist 8', likes: 14, comments: 3, profileImageUrl: '/images/default-profile.png' },
    { id: 109, imageUrl: '/images/explore/9.jpg', title: 'Recent 9', artist: 'New Artist 9', likes: 23, comments: 4, profileImageUrl: '/images/default-profile.png' },
    // ... more recent artworks
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
    document.body.style.overflow = 'hidden';
  };

  const handleClosePopup = () => {
    setSelectedArtwork(null);
    document.body.style.overflow = 'auto';
  };

  const artworksToDisplay = activeTab === 'popular' ? popularArtworks : recentArtworks;

  return (
    <div className={styles.container}>
      <Navbarone />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.artworks}>
          <div className={styles.artworkHeader}>
            <h2 className={styles.pageTitle}>Explore</h2>
          </div>
          <div className={styles.tabButtons}>
            <button
              className={`${styles.tabButton} ${activeTab === 'popular' ? styles.active : ''}`}
              onClick={() => handleTabChange('popular')}
            >
              Popular
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'recent' ? styles.active : ''}`}
              onClick={() => handleTabChange('recent')}
            >
              Recent
            </button>
          </div>
          <ArtworkGrid artworks={artworksToDisplay} onArtworkClick={handleArtworkClick} />
        </div>
      </div>

      {selectedArtwork && (
        <div className={detailStyles.popupOverlay}>
            <div className={`${detailStyles.popupContent} bg-gray-100 p-4 rounded shadow mb-4`}>
                <button onClick={handleClosePopup} className={detailStyles.closeButton}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {/* หัวโพสต์ */}
                <div className="flex items-center gap-2 mb-2">
                    <img
                        src={selectedArtwork.profileImageUrl || "/default-avatar.png"}
                        className="w-8 h-8 rounded-full object-cover"
                        alt="author"
                    />
                    <div>
                        <p className="font-semibold text-gray-800">{selectedArtwork.artist}</p>
                        {/* <p className="text-sm text-gray-400">{/* Add createdAt if available *}</p> */}
                    </div>
                </div>

                {/* แคปชันและรูป */}
                {selectedArtwork.description && (
                    <p className="text-sm text-gray-500 mb-2">{selectedArtwork.description}</p>
                )}
                <img
                    src={selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                    className="h-60 w-full object-cover rounded"
                />

                {/* ปุ่ม */}
                <div className="flex items-center gap-4 mt-4">
                    <button className="bg-gray-800 text-white px-3 py-1 rounded-full">
                        ❤️ {selectedArtwork.likes || 0}
                    </button>
                    <button className="bg-gray-800 text-white px-3 py-1 rounded-full">
                        💬 {selectedArtwork.comments || 0} {/* ปรับถ้าโครงสร้าง comment ต่างกัน */}
                    </button>
                    <button className="bg-gray-800 text-white px-3 py-1 rounded-full">
                        <FontAwesomeIcon icon={faShare} /> Share
                    </button>
                </div>

                {/* ส่วน Comment (ถ้าต้องการ) */}
                {/* <div className="mt-4 space-y-2">
                    {/* Map through comments * /}
                </div> */}

                {/* ช่อง Comment (ถ้าต้องการ) */}
                <form onSubmit={handleSubmit} className="flex mt-4">
                    <input
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="แสดงความคิดเห็น..."
                        className="w-full p-2 rounded-l bg-amber-200 text-sm"
                    />
                    <button
                        type="submit"
                        className="bg-black text-white px-4 rounded-r hover:bg-gray-800"
                    >
                        ➤
                    </button>
                </form>
            </div>
        </div>
    )}
    </div>
  );
}

export default ExplorePage;