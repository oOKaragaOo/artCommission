// src/app/explore/page.jsx
"use client";

import React, { useState } from 'react';
import styles from '../../styles/explore.module.css';
import detailStyles from '../../styles/artworkdetailpopup.module.css'; // Import CSS for the detail popup
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/navigation'; // Import useRouter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the close icon

function ExplorePage() {
  const [activeTab, setActiveTab] = useState('popular');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const router = useRouter();

  // Sample artwork data (replace with your actual data including more details)
  const popularArtworks = [
    { id: 1, imageUrl: '/images/explore/1.jpg', title: 'Popular 1', artist: 'Artist A', description: 'A beautiful artwork.', likes: 15, comments: 3 },
    { id: 2, imageUrl: '/images/explore/2.jpg', title: 'Popular 2', artist: 'Artist B', description: 'An abstract piece.', likes: 22, comments: 8 },
    { id: 3, imageUrl: '/images/explore/3.jpg', title: 'Popular 3', artist: 'Artist C', description: 'A digital painting.', likes: 10, comments: 1 },
    { id: 4, imageUrl: '/images/explore/4.jpg', title: 'Popular 4', artist: 'Artist D', description: 'A surreal landscape.', likes: 30, comments: 5 },
    { id: 5, imageUrl: '/images/explore/5.jpg', title: 'Popular 5', artist: 'Artist E', description: 'A character design.', likes: 18, comments: 2 },
    { id: 6, imageUrl: '/images/explore/6.jpg', title: 'Popular 6', artist: 'Artist F', description: 'A vibrant illustration.', likes: 25, comments: 7 },
    { id: 7, imageUrl: '/images/explore/7.jpg', title: 'Popular 6', artist: 'Artist F', description: 'A vibrant illustration.', likes: 25, comments: 7 },
    { id: 8, imageUrl: '/images/explore/8.jpg', title: 'Popular 6', artist: 'Artist F', description: 'A vibrant illustration.', likes: 25, comments: 7 },
    { id: 9, imageUrl: '/images/explore/9.jpg', title: 'Popular 6', artist: 'Artist F', description: 'A vibrant illustration.', likes: 25, comments: 7 },
    
    // ... more popular artworks
  ];

  const recentArtworks = [
    { id: 101, imageUrl: '/images/explore/1.jpg', title: 'Recent 1', artist: 'New Artist 1', description: 'Freshly created art.', likes: 5, comments: 0 },
    { id: 102, imageUrl: '/images/explore/2.jpg', title: 'Recent 2', artist: 'New Artist 2', description: 'Another recent piece.', likes: 12, comments: 4 },
    { id: 103, imageUrl: '/images/explore/3.jpg', title: 'Recent 2', artist: 'New Artist 2', description: 'Another recent piece.', likes: 12, comments: 4 },
    { id: 104, imageUrl: '/images/explore/4.jpg', title: 'Recent 2', artist: 'New Artist 2', description: 'Another recent piece.', likes: 12, comments: 4 },
    { id: 105, imageUrl: '/images/explore/5.jpg', title: 'Recent 2', artist: 'New Artist 2', description: 'Another recent piece.', likes: 12, comments: 4 },
    { id: 106, imageUrl: '/images/explore/6.jpg', title: 'Recent 2', artist: 'New Artist 2', description: 'Another recent piece.', likes: 12, comments: 4 },
    { id: 107, imageUrl: '/images/explore/7.jpg', title: 'Recent 2', artist: 'New Artist 2', description: 'Another recent piece.', likes: 12, comments: 4 },
    { id: 108, imageUrl: '/images/explore/8.jpg', title: 'Recent 2', artist: 'New Artist 2', description: 'Another recent piece.', likes: 12, comments: 4 },
    { id: 109, imageUrl: '/images/explore/9.jpg', title: 'Recent 2', artist: 'New Artist 2', description: 'Another recent piece.', likes: 12, comments: 4 },
    // ... more recent artworks
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind the popup
  };

  const handleClosePopup = () => {
    setSelectedArtwork(null);
    document.body.style.overflow = 'auto'; // Allow scrolling again
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
          <div className={styles.artworkGrid}>
            {artworksToDisplay.map(artwork => (
              <div key={artwork.id} className={styles.artworkItem} onClick={() => handleArtworkClick(artwork)}>
                <img src={artwork.imageUrl} alt={artwork.title} className={styles.artworkImage} />
                {/* You might want to add title overlay on hover later */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedArtwork && (
        <div className={detailStyles.popupOverlay}>
          <div className={detailStyles.popupContent}>
            <button onClick={handleClosePopup} className={detailStyles.closeButton}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <img src={selectedArtwork.imageUrl} alt={selectedArtwork.title} className={detailStyles.detailImage} />
            <h3 className={detailStyles.detailTitle}>{selectedArtwork.title}</h3>
            <p className={detailStyles.detailArtist}>By: {selectedArtwork.artist}</p>
            <p className={detailStyles.detailDescription}>{selectedArtwork.description}</p>
            <div className={detailStyles.detailActions}>
              <button className={detailStyles.actionButton}><i className="fas fa-heart"></i> {selectedArtwork.likes} Likes</button>
              <button className={detailStyles.actionButton}><i className="fas fa-comment"></i> {selectedArtwork.comments} Comments</button>
              <button className={detailStyles.actionButton}><i className="fas fa-share"></i> Share</button>
              {/* Add more action buttons as needed */}
            </div>
            {/* Add comment section or more details here */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExplorePage;