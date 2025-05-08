"use client";

import React from "react";
import styles from "../../styles/explore.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function ArtworkGrid({ artworks, onArtworkClick }) {
  return (
    <div className={styles.artworkGrid}>
      {artworks
        .filter(artwork => artwork?.imageUrl?.trim())
        .map(artwork => (
          <div
            key={artwork.id}
            className={styles.gridItem}
            onClick={() => onArtworkClick(artwork)}
          >
            <ArtworkCard artwork={artwork} />
          </div>
        ))}
    </div>
  );
}

function ArtworkCard({ artwork }) {
  return (
    <>
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
        <ArtistInfo artist={artwork.artist} profileImageUrl={artwork.profileImageUrl} />
      </div>
    </>
  );
}

function ArtistInfo({ artist, profileImageUrl }) {
  return (
    <div className={styles.artistInfo}>
      <div className={styles.profileImageContainer}>
        <img
          src={profileImageUrl || "/images/default-profile.png"}
          alt={artist}
          className={styles.profileImage}
        />
      </div>
      <p className={styles.artistUsername}>{artist}</p>
    </div>
  );
}

export default ArtworkGrid;