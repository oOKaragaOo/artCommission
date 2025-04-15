"use client";

import React from 'react';
import styles from '../../styles/artseek.module.css';
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';
/* import '@fortawesome/fontawesome-free/css/all.min.css'; // นำเข้า Font Awesome CSS */

function ArtseekPage() {
  const artworks = [
    { topic: "Topic", commission: "Commission", days: " xx days", baht: " xx baht", details: " Details", name: "NAME", status: "accept" },
    { topic: "Topic", commission: "Commission", days: " xx days", baht: " xx baht", details: " Details", name: "NAME", status: "reject" },
    { topic: "Topic", commission: "Commission", days: " xx days", baht: " xx baht", details: " Details", name: "NAME", status: "pending" },
  ];

  return (
    <div className={styles.container}>
      <Navbarone />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.artseek}>
          <h2 className={styles.artseekHeader}>Artseek</h2>
          <div className={styles.artseekGrid}>
            {artworks.map((artwork, index) => (
              <div key={index} className={styles.artworkItem}>
                <div className={styles.artworkInfo}>
                  <div className={styles.artworkTopic}>
                    <span>{artwork.topic}</span>
                    <span className={styles.commission}>{artwork.commission}</span>
                  </div>
                  <div className={styles.artworkDetails}>
                    <span className={styles.time}><i className="fas fa-clock"></i> {artwork.days}</span>
                    <span className={styles.price}><i className="fas fa-dollar-sign"></i> {artwork.baht}</span>
                    <p>{artwork.details}</p>
                  </div>
                </div>
                <div className={styles.artistInfo}>
                  <img src={`/images/artist${index + 1}.png`} alt={`Artist ${index + 1}`} className={styles.artistAvatar} />
                  <span>{artwork.name}</span>
                  {artwork.status === "accept" && <span className={styles.accept}><i className="fas fa-check"></i></span>}
                  {artwork.status === "reject" && <span className={styles.reject}><i className="fas fa-times"></i></span>}
                  {artwork.status === "pending" && <span className={styles.pending}><i className="fas fa-hourglass-half"></i></span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtseekPage;