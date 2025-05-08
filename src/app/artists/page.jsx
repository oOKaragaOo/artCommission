"use client";

import React from 'react';
import styles from '../../styles/artists.module.css';
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';

function ArtistCardHorizontal({ artist, index, isNewArtist }) {
  return (
    <div key={index} className={styles.artistCardHorizontal}>
      <div className={styles.artworkPreviewHorizontal}>
        {artist.artworks.map((artworkIndex) => (
          <div key={artworkIndex} className={styles.artworkItemHorizontal}>
            <img
              src={`/images/artwork_placeholder_${
                isNewArtist ? artworkIndex % 4 + 5 : artworkIndex % 4 + 1
              }.jpg`}
              alt={`Artwork ${artworkIndex}`}
            />
          </div>
        ))}
      </div>
      <div className={styles.artistInfoHorizontal}>
        <img
          src={`/images/artist${isNewArtist ? index + 7 : index + 1}.png`}
          alt={artist.name}
          className={styles.artistAvatarHorizontal}
        />
        <h3 className={styles.artistNameHorizontal}>{artist.name}</h3>
        <div className={styles.artistRatingHorizontal}>{artist.rating}</div>
        <button className={`${styles.artistButtonHorizontal} ${styles['artistButton--new']}`}>
          {artist.button}
        </button>
      </div>
    </div>
  );
}

function ArtistRecommended() {
  const recommendedArtists = [
    { name: "Artist One", button: "Follow", artworks: [1, 2, 3, 4] },
    { name: "Artist Two", button: "Follow", artworks: [5, 6, 7, 8] },
    { name: "Artist Three", button: "Follow", artworks: [9, 10, 11, 12] },
    { name: "Artist Four", button: "Follow", artworks: [13, 14, 15, 16] },
    { name: "Artist Five", button: "Follow", artworks: [17, 18, 19, 20] },
    { name: "Artist Six", button: "Follow", artworks: [21, 22, 23, 24] },
  ];

  const newArtists = [
    { name: "New Artist A", button: "Follow", artworks: [25, 26, 27, 28] },
    { name: "New Artist B", button: "Follow", artworks: [29, 30, 31, 32] },
    { name: "New Artist C", button: "Follow", artworks: [33, 34, 35, 36] },
    { name: "New Artist D", button: "Follow", artworks: [37, 38, 39, 40] },
    { name: "New Artist E", button: "Follow", artworks: [41, 42, 43, 44] },
    { name: "New Artist F", button: "Follow", artworks: [45, 46, 47, 48] },
  ];

  return (
    <div className={styles.container}>
      <Navbarone />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.artistList}>
          <h2 className={styles.artistHeader}>Artist Recommended</h2>
          <div className={styles.artistScrollView}>
            <div className={styles.artistGridHorizontal}>
              {recommendedArtists.map((artist, index) => (
                <ArtistCardHorizontal key={index} artist={artist} index={index} isNewArtist={false} />
              ))}
            </div>
          </div>

          <h2 className={styles.artistHeader}>New Artist</h2>
          <div className={styles.artistScrollView}>
            <div className={styles.artistGridHorizontal}>
              {newArtists.map((artist, index) => (
                <ArtistCardHorizontal key={index} artist={artist} index={index} isNewArtist={true} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistRecommended;