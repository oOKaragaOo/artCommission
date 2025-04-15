// src/app/explore/page.jsx
"use client";

import React from 'react';
import styles from '../../styles/Home.module.css';
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';

function ExplorePage() {
  return (
    <div className={styles.container}>
      <Navbarone />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.artworks}>
          <div className={styles.artworkHeader}>
            <span>Art work</span>
            <span>See more</span>
          </div>
          <div className={styles.artworkGrid}>
            {[...Array(36)].map((_, index) => (
              <div key={index} className={styles.artworkItem}>IMG</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;