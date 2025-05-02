// components/ArtworkGrid.jsx
"use client";

import React from "react";
import styles from "../../styles/explore.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons"; // Make sure you import the specific icons you are using

function ArtworkGrid({ artworks, onArtworkClick }) {
  return (
    <div className={styles.artworkGrid}>
      {artworks
        .filter((artwork) => artwork.imageUrl && artwork.imageUrl.trim() !== "")
        .map((artwork) => (
          <div
            key={artwork.id}
            className={styles.gridItem}
            onClick={() => onArtworkClick(artwork)}
          >
            <div className={styles.artworkContainer}>
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className={styles.artworkImage}
              />
              <button className={styles.likeButton}>
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
            <div className={styles.artworkInfo}>
              <h3 className={styles.artworkTitle}>{artwork.title}</h3>
              <div className={styles.artistInfo}>
                <div className={styles.profileImageContainer}>
                  <img
                    src={
                      artwork.profileImageUrl || "/images/default-profile.png"
                    } // Use a default if no profile image
                    alt={artwork.artist}
                    className={styles.profileImage}
                  />
                </div>
                <p className={styles.artistUsername}>{artwork.artist}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ArtworkGrid;
