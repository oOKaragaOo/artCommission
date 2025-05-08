"use client";

import React, { useState } from 'react';
import styles from '../../styles/marketplace.module.css';
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const MarketplacePage = () => {
    const [activeTab, setActiveTab] = useState('selling');
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const router = useRouter();

    const marketplaceItems = [
        { id: 1, imageUrl: '/images/marketplace/1.jpg', title: 'Cute Cat', price: '฿150', likes: 25, artist: 'UserA' },
        { id: 2, imageUrl: '/images/marketplace/2.jpg', title: 'Abstract Landscape', price: '฿300', likes: 18, artist: 'ArtistB' },
        { id: 3, imageUrl: '/images/marketplace/3.jpg', title: 'Anime Character', price: '฿200', likes: 32, artist: 'CreatorC' },
        { id: 4, imageUrl: '/images/marketplace/4.jpg', title: 'Surreal Painting', price: '฿450', likes: 12, artist: 'ArtLoverD' },
        { id: 5, imageUrl: '/images/marketplace/5.jpg', title: 'Digital Portrait', price: '฿250', likes: 40, artist: 'ImagineerE' },
        { id: 6, imageUrl: '/images/marketplace/6.jpg', title: 'Sci-Fi Scene', price: '฿500', likes: 28, artist: 'FutureVisionF' },
        { id: 7, imageUrl: '/images/marketplace/7.jpg', title: 'Sold Item 1', price: '฿100', likes: 50, artist: 'SellerG', status: 'sold' },
        { id: 8, imageUrl: '/images/marketplace/8.jpg', title: 'Sold Item 2', price: '฿220', likes: 38, artist: 'BuyerH', status: 'sold' },
        { id: 9, imageUrl: '/images/marketplace/9.jpg', title: 'Sold Item 3', price: '฿300', likes: 50, artist: 'SellerG', status: 'sold' },
        { id: 10, imageUrl: '/images/marketplace/10.jpg', title: 'Sold Item 4', price: '฿450', likes: 38, artist: 'BuyerH', status: 'sold' },
        { id: 11, imageUrl: '/images/marketplace/11.jpg', title: 'Sold Item 5', price: '฿150', likes: 50, artist: 'SellerG', status: 'sold' },
        { id: 12, imageUrl: '/images/marketplace/12.jpg', title: 'Sold Item 6', price: '฿500', likes: 38, artist: 'BuyerH', status: 'sold' },
    ];

    const sellingItems = marketplaceItems.filter(item => item.status !== 'sold');
    const soldItems = marketplaceItems.filter(item => item.status === 'sold');
    const itemsToDisplay = activeTab === 'selling' ? sellingItems : soldItems;

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleMouseEnter = (itemId) => {
        setHoveredItemId(itemId);
    };

    const handleMouseLeave = () => {
        setHoveredItemId(null);
    };

    const goToHomePage = () => {
        router.push('/');
    };

    return (
        <div className={styles.container}>
            <Navbarone />
            <div className={styles.content}>
                <Sidebar />
                <div className={styles.marketplace}>
                    <h1
                        className={styles.pageTitle}
                        onClick={goToHomePage}
                        style={{ cursor: 'pointer' }}
                    >
                        Marketplace
                    </h1>
                    <div className={styles.tabButtons}>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'selling' ? styles.active : ''}`}
                            onClick={() => handleTabChange('selling')}
                        >
                            Selling
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'sold' ? styles.active : ''}`}
                            onClick={() => handleTabChange('sold')}
                        >
                            Sold
                        </button>
                    </div>
                    <div className={styles.itemGrid}>
                        {itemsToDisplay.map(item => (
                            <div
                                key={item.id}
                                className={styles.itemCard}
                                onMouseEnter={() => handleMouseEnter(item.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img src={item.imageUrl} alt={item.title} className={styles.itemImage} />
                                {hoveredItemId === item.id && (
                                    <div className={styles.itemOverlay}>
                                        <h3 className={styles.overlayTitle}>{item.title}</h3>
                                        <p className={styles.overlayPrice}>Price: {item.price}</p>
                                        <div className={styles.overlayInfo}>
                                            <span className={styles.overlayLikes}>
                                                <FontAwesomeIcon icon={faHeart} /> {item.likes}
                                            </span>
                                            <span className={styles.overlayArtist}>By: {item.artist}</span>
                                        </div>
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

export default MarketplacePage;