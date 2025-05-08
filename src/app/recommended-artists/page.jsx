"use client";

import React, { useState } from 'react';
import styles from '../../styles/recommendedartists.module.css';
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const RecommendedArtistsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const artistsPerPage = 10;
    const allRecommendedArtists = [
        { id: 1, imageUrl: '/images/artist_reco1.jpg', username: 'Nikamao', priceRange: '฿100 - ฿350' },
        { id: 2, imageUrl: '/images/artist_reco2.jpg', username: 'Bi Ko', priceRange: '฿100 - ฿300' },
        { id: 3, imageUrl: '/images/artist_reco3.jpg', username: 'yamimow', priceRange: '฿100 - ฿350' },
        { id: 4, imageUrl: '/images/artist_reco4.jpg', username: 'K90796', priceRange: '฿100 - ฿300' },
        { id: 5, imageUrl: '/images/artist_reco5.jpg', username: 'YGA102', priceRange: '฿200 - ฿400' },
        { id: 6, imageUrl: '/images/artist_reco6.jpg', username: 'FreakRetikia', priceRange: '฿100 - ฿350' },
        { id: 7, imageUrl: '/images/artist_reco7.jpg', username: 'ArtistSeven', priceRange: '฿150 - ฿250' },
        { id: 8, imageUrl: '/images/artist_reco8.jpg', username: 'ArtisticEight', priceRange: '฿250 - ฿450' },
        { id: 9, imageUrl: '/images/artist_reco9.jpg', username: 'NineCreations', priceRange: '฿180 - ฿320' },
        { id: 10, imageUrl: '/images/artist_reco1.jpg', username: 'Nikamao2', priceRange: '฿100 - ฿350' },
        { id: 11, imageUrl: '/images/artist_reco2.jpg', username: 'Bi Ko2', priceRange: '฿100 - ฿300' },
        { id: 12, imageUrl: '/images/artist_reco3.jpg', username: 'yamimow2', priceRange: '฿100 - ฿350' },
        { id: 13, imageUrl: '/images/artist_reco1.jpg', username: 'Nikamao2', priceRange: '฿100 - ฿350' },
        { id: 14, imageUrl: '/images/artist_reco2.jpg', username: 'Bi Ko2', priceRange: '฿100 - ฿300' },
        { id: 15, imageUrl: '/images/artist_reco3.jpg', username: 'yamimow3', priceRange: '฿100 - ฿350' },
        { id: 16, imageUrl: '/images/artist_reco1.jpg', username: 'Nikamao2', priceRange: '฿100 - ฿350' },
        { id: 17, imageUrl: '/images/artist_reco2.jpg', username: 'Bi Ko2', priceRange: '฿100 - ฿300' },
        { id: 18, imageUrl: '/images/artist_reco3.jpg', username: 'yamimow4', priceRange: '฿100 - ฿350' },
        { id: 19, imageUrl: '/images/artist_reco3.jpg', username: 'yamimow5', priceRange: '฿100 - ฿350' },
        { id: 20, imageUrl: '/images/artist_reco3.jpg', username: 'yamimow6', priceRange: '฿100 - ฿350' },
    ];

    const indexOfLastArtist = currentPage * artistsPerPage;
    const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
    const currentArtists = allRecommendedArtists.slice(indexOfFirstArtist, indexOfLastArtist);
    const totalPages = Math.ceil(allRecommendedArtists.length / artistsPerPage);

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    return (
        <div className={styles.container}>
            <Navbarone />
            <div className={styles.content}>
                <Sidebar />
                <div className={styles.recommendedArtists}>
                    <h2 className={styles.pageTitle}>Art Recommend</h2>
                    <div className={styles.filterOptions}>
                        <span>ทั้งหมด</span>
                    </div>
                    <div className={styles.artistGrid}>
                        {currentArtists.map(artist => (
                            <div key={artist.id} className={styles.artistCard}>
                                <div className={styles.imageContainer}>
                                    <img src={artist.imageUrl} alt={artist.username} className={styles.artistImage} />
                                </div>
                                <div className={styles.artistInfo}>
                                    <span className={styles.artistUsername}>{artist.username}</span>
                                    <span className={styles.priceRange}>{artist.priceRange}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.pagination}>
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={styles.paginationButton}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <span>{currentPage}/{totalPages}</span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={styles.paginationButton}
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendedArtistsPage;