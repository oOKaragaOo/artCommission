"use client";

import React from 'react';
import styles from '../../styles/artists.module.css';
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';

function ArtistRecommended() {
  const recommendedArtists = [
    { button: "Get a job" },
    { button: "Get a job" },
    { button: "Not accepting work" },
    { button: "Not accepting work" },
    { button: "Queue up" },
    { button: "Queue up" },
  ];

  const newArtists = [
    { button: "Follow" },
    { button: "Follow" },
    { button: "Follow" },
    { button: "Follow" },
    { button: "Follow" },
    { button: "Follow" },
  ];

  return (
    <div className={styles.container}>
      <Navbarone />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.artistList}>
          <h2 className={styles.artistHeader}>Artist Recommended</h2>
          <div className={styles.artistGrid}>
            {recommendedArtists.map((artist, index) => (
              <div key={index} className={styles.artistCard}>
                <img src={`/images/artist${index + 1}.png`} alt={`Artist ${index + 1}`} className={styles.artistAvatar} />
                <div className={styles.artistInfo}>
                  <h3 className={styles.artistName}>NAME ARTIST</h3>
                  <div className={styles.artistRating}>
                    <span>⭐⭐⭐⭐⭐</span>
                  </div>
                  <button className={`${styles.artistButton} ${artist.button === "Get a job" ? styles['artistButton--green'] : artist.button === "Not accepting work" ? styles['artistButton--red'] : styles['artistButton--blue']}`}>
                    {artist.button}
                  </button>
                </div>
                <div className={styles.artworkPreview}>
                  {[...Array(3)].map((_, previewIndex) => (
                    <div key={previewIndex} className={styles.artworkItem}>IMG</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className={styles.artistHeader}>New Artist</h2>
          <div className={styles.artistGrid}>
            {newArtists.map((artist, index) => (
              <div key={index} className={styles.artistCard}>
                <img src={`/images/artist${index + 7}.png`} alt={`IMG ${index + 7}`} className={styles.artistAvatar} />
                <div className={styles.artistInfo}>
                  <h3 className={styles.artistName}>NAME ARTIST</h3>
                  <div className={styles.artistRating}>
                    <span>⭐⭐⭐⭐⭐</span>
                  </div>
                  <button className={`${styles.artistButton} ${styles['artistButton--new']}`}>
                    {artist.button}
                  </button>
                </div>
                <div className={styles.artworkPreview}>
                  {[...Array(3)].map((_, previewIndex) => (
                    <div key={previewIndex} className={styles.artworkItem}>IMG</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistRecommended;