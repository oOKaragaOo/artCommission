"use client";

import React, { useState } from 'react';
import styles from '../../styles/workspage.module.css';
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const WorksPage = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [hoveredArtwork, setHoveredArtwork] = useState(null);

  // Sample artwork data (with added description and artist info)
  const popularArtworks = [
    { id: 1, imageUrl: '/images/artwork_sample1.jpg', title: 'Popular 1', description: 'A beautiful landscape painting.', artist: { profileImage: '/images/default-avatar.png', username: 'ArtistOne' } },
    { id: 2, imageUrl: '/images/artwork_sample1.jpg', title: 'Popular 2', description: 'Abstract art with vibrant colors.', artist: { profileImage: '/images/default-avatar.png', username: 'CreativeMind' } },
    { id: 3, imageUrl: '/images/artwork_sample1.jpg', title: 'Popular 3', description: '', artist: { profileImage: '/images/default-avatar.png', username: 'ArtLover' } },
    { id: 4, imageUrl: '/images/artwork_sample1.jpg', title: 'Popular 4', description: 'A detailed character illustration.', artist: { profileImage: '/images/default-avatar.png', username: 'Imagineer' } },
    { id: 5, imageUrl: '/images/artwork_sample1.jpg', title: 'Popular 5', description: 'Surreal digital artwork.', artist: { profileImage: '/images/default-avatar.png', username: 'DreamWeaver' } },
    { id: 6, imageUrl: '/images/artwork_sample1.jpg', title: 'Popular 6', description: 'A minimalist design.', artist: { profileImage: '/images/default-avatar.png', username: 'DesignGuru' } },
    { id: 7, imageUrl: '/images/artwork_sample1.jpg', title: 'Popular 7', description: 'Portrait of a mysterious figure.', artist: { profileImage: '/images/default-avatar.png', username: 'MysteryArt' } },
    { id: 8, imageUrl: '/images/artwork_sample1.jpg', title: 'Popular 8', description: 'Geometric patterns in motion.', artist: { profileImage: '/images/default-avatar.png', username: 'PatternMaker' } },
    { id: 9, imageUrl: '/images/artwork_sample1.jpg', title: 'Popular 9', description: 'A whimsical creature design.', artist: { profileImage: '/images/default-avatar.png', username: 'FantasyArtist' } },
    { id: 10, imageUrl: '/images/artwork_sample1.jpg', title: 'Popular 10', description: 'Urban cityscape at night.', artist: { profileImage: '/images/default-avatar.png', username: 'CityScaper' } },
    { id: 11, imageUrl: '/images/artwork_sample1.jpg', title: 'Popular 11', description: 'A floral abstract piece.', artist: { profileImage: '/images/default-avatar.png', username: 'FloraArt' } },
    { id: 12, imageUrl: '/images/artwork_sample1.jpg', title: 'Popular 12', description: 'Sci-fi concept art.', artist: { profileImage: '/images/default-avatar.png', username: 'FutureVision' } },
  ];

  // Sample artwork data for ล่าสุด (Latest) tab
  const latestArtworks = [
    { id: 101, imageUrl: '/images/artwork_sample1.jpg', title: 'Latest 1', description: 'Newest creation.', artist: { profileImage: '/images/default-avatar.png', username: 'NewArtist' } },
    { id: 102, imageUrl: '/images/artwork_sample1.jpg', title: 'Latest 2', description: 'Just finished this today.', artist: { profileImage: '/images/default-avatar.png', username: 'FreshPaint' } },
    { id: 103, imageUrl: '/images/artwork_sample1.jpg', title: 'Latest 3', description: '', artist: { profileImage: '/images/default-avatar.png', username: 'RecentCreator' } },
    { id: 104, imageUrl: '/images/artwork_sample1.jpg', title: 'Latest 4', description: 'Experimenting with new styles.', artist: { profileImage: '/images/default-avatar.png', username: 'StyleInnovator' } },
    { id: 105, imageUrl: '/images/artwork_sample1.jpg', title: 'Latest 5', description: 'Quick sketch.', artist: { profileImage: '/images/default-avatar.png', username: 'SpeedSketcher' } },
    { id: 106, imageUrl: '/images/artwork_sample1.jpg', title: 'Latest 6', description: 'Inspired by nature.', artist: { profileImage: '/images/default-avatar.png', username: 'NatureInspired' } },
    { id: 107, imageUrl: '/images/artwork_sample1.jpg', title: 'Latest 7', description: 'A study in light and shadow.', artist: { profileImage: '/images/default-avatar.png', username: 'LightAndShadow' } },
    { id: 108, imageUrl: '/images/artwork_sample1.jpg', title: 'Latest 8', description: 'Playing with textures.', artist: { profileImage: '/images/default-avatar.png', username: 'TextureMaster' } },
    { id: 109, imageUrl: '/images/artwork_sample1.jpg', title: 'Latest 9', description: 'Fan art.', artist: { profileImage: '/images/default-avatar.png', username: 'FanaticArtist' } },
    { id: 110, imageUrl: '/images/artwork_sample1.jpg', title: 'Latest 10', description: 'Personal project.', artist: { profileImage: '/images/default-avatar.png', username: 'PersonalTouch' } },
    { id: 111, imageUrl: '/images/artwork_sample1.jpg', title: 'Latest 11', description: 'Trying a new color palette.', artist: { profileImage: '/images/default-avatar.png', username: 'ColorExplorer' } },
    { id: 112, imageUrl: '/images/artwork_sample1.jpg', title: 'Latest 12', description: 'A work in progress.', artist: { profileImage: '/images/default-avatar.png', username: 'WIPArtist' } },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleMouseEnter = (artworkId) => {
    setHoveredArtwork(artworkId);
  };

  const handleMouseLeave = () => {
    setHoveredArtwork(null);
  };

  const artworksToDisplay = activeTab === 'popular' ? popularArtworks : latestArtworks;

  return (
    <div className={styles.container}>
      <Navbarone />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.works}>
          <h2 className={styles.pageTitle}>ผลงาน</h2>
          <div className={styles.tabButtons}>
            <button
              className={`${styles.tabButton} ${activeTab === 'popular' ? styles.active : ''}`}
              onClick={() => handleTabChange('popular')}
            >
              Popular
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'latest' ? styles.active : ''}`}
              onClick={() => handleTabChange('latest')}
            >
              ล่าสุด
            </button>
          </div>
          <div className={styles.artworkGrid}>
            {artworksToDisplay.map(artwork => (
              <div
                key={artwork.id}
                className={styles.artworkItem}
                onMouseEnter={() => handleMouseEnter(artwork.id)}
                onMouseLeave={handleMouseLeave}
              >
                <img src={artwork.imageUrl} alt={artwork.title} className={styles.artworkImage} />
                {hoveredArtwork === artwork.id && (
                  <div className={styles.artworkOverlay}>
                    {artwork.description && <p className={styles.artworkDescription}>{artwork.description}</p>}
                    <div className={styles.artistInfo}>
                      <div className={styles.artistAvatarContainer}>
                        <img src={artwork.artist.profileImage} alt={artwork.artist.username} className={styles.artistAvatar} />
                      </div>
                      <span className={styles.artistUsername}>{artwork.artist.username}</span>
                    </div>
                    <button className={styles.likeButton}>
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksPage;