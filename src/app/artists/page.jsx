"use client";

import React from 'react';
import styles from '../../styles/artists.module.css';
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';

function ArtistRecommended() {
    const recommendedArtists = [
        { name: "Artist One", rating: "⭐⭐⭐⭐⭐", button: "Get a job", artworks: [1, 2, 3, 4] },
        { name: "Artist Two", rating: "⭐⭐⭐⭐", button: "Get a job", artworks: [5, 6, 7, 8] },
        { name: "Artist Three", rating: "⭐⭐⭐", button: "Not accepting work", artworks: [9, 10, 11, 12] },
        { name: "Artist Four", rating: "⭐⭐⭐⭐⭐", button: "Not accepting work", artworks: [13, 14, 15, 16] },
        { name: "Artist Five", rating: "⭐⭐", button: "Queue up", artworks: [17, 18, 19, 20] },
        { name: "Artist Six", rating: "⭐⭐⭐⭐", button: "Queue up", artworks: [21, 22, 23, 24] },
        { name: "Artist One", rating: "⭐⭐⭐⭐⭐", button: "Get a job", artworks: [1, 2, 3, 4] },
        { name: "Artist Two", rating: "⭐⭐⭐⭐", button: "Get a job", artworks: [5, 6, 7, 8] },
        { name: "Artist Three", rating: "⭐⭐⭐", button: "Not accepting work", artworks: [9, 10, 11, 12] },
        { name: "Artist Four", rating: "⭐⭐⭐⭐⭐", button: "Not accepting work", artworks: [13, 14, 15, 16] },
        { name: "Artist Five", rating: "⭐⭐", button: "Queue up", artworks: [17, 18, 19, 20] },
        { name: "Artist Six", rating: "⭐⭐⭐⭐", button: "Queue up", artworks: [21, 22, 23, 24] },
        // เพิ่มศิลปินแนะนำเพิ่มเติมตามต้องการ
    ];

    const newArtists = [
        { name: "New Artist A", rating: "⭐⭐⭐⭐", button: "Follow", artworks: [25, 26, 27, 28] },
        { name: "New Artist B", rating: "⭐⭐⭐", button: "Follow", artworks: [29, 30, 31, 32] },
        { name: "New Artist C", rating: "⭐⭐⭐⭐⭐", button: "Follow", artworks: [33, 34, 35, 36] },
        { name: "New Artist D", rating: "⭐⭐", button: "Follow", artworks: [37, 38, 39, 40] },
        { name: "New Artist E", rating: "⭐⭐⭐⭐", button: "Follow", artworks: [41, 42, 43, 44] },
        { name: "New Artist F", rating: "⭐⭐⭐", button: "Follow", artworks: [45, 46, 47, 48] },
        // เพิ่มศิลปินใหม่เพิ่มเติมตามต้องการ
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
                                <div key={index} className={styles.artistCardHorizontal}>
                                    <div className={styles.artworkPreviewHorizontal}>
                                        {artist.artworks.map((artworkIndex) => (
                                            <div key={artworkIndex} className={styles.artworkItemHorizontal}>
                                                <img src={`/images/artwork_placeholder_${artworkIndex % 4 + 1}.jpg`} alt={`Artwork ${artworkIndex}`} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.artistInfoHorizontal}>
                                        <img src={`/images/artist${index + 1}.png`} alt={artist.name} className={styles.artistAvatarHorizontal} />
                                        <h3 className={styles.artistNameHorizontal}>{artist.name}</h3>
                                        <div className={styles.artistRatingHorizontal}>{artist.rating}</div>
                                        <button className={`${styles.artistButtonHorizontal} ${artist.button === "Get a job" ? styles['artistButton--green'] : artist.button === "Not accepting work" ? styles['artistButton--red'] : styles['artistButton--blue']}`}>
                                            {artist.button}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h2 className={styles.artistHeader}>New Artist</h2>
                    <div className={styles.artistScrollView}>
                        <div className={styles.artistGridHorizontal}>
                            {newArtists.map((artist, index) => (
                                <div key={index} className={styles.artistCardHorizontal}>
                                    <div className={styles.artworkPreviewHorizontal}>
                                        {artist.artworks.map((artworkIndex) => (
                                            <div key={artworkIndex} className={styles.artworkItemHorizontal}>
                                                <img src={`/images/artwork_placeholder_${artworkIndex % 4 + 5}.png`} alt={`Artwork ${artworkIndex}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.artistInfoHorizontal}>
                                        <img src={`/images/artist${index + 7}.png`} alt={artist.name} className={styles.artistAvatarHorizontal} />
                                        <h3 className={styles.artistNameHorizontal}>{artist.name}</h3>
                                        <div className={styles.artistRatingHorizontal}>{artist.rating}</div>
                                        <button className={`${styles.artistButtonHorizontal} ${styles['artistButton--new']}`}>
                                            {artist.button}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistRecommended;