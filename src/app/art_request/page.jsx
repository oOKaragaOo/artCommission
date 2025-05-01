"use client";

import React, { useState } from 'react';
import styles from '../../styles/art_request.module.css';
import detailStyles from '../../styles/artrequestdetailpopup.module.css';
import RequestGrid from '../components/RequestGrid';
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ArtRequestPage() {
    const [activeTab, setActiveTab] = useState('artsign');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const router = useRouter();

    // Sample art request data for Artsign (add profileImage and status)
    const artsignRequests = [
        { id: 1, imageUrl: '/images/explore/1.jpg', title: 'Sci-Fi Landscape', artist: 'ArtSigner1', artistProfile: '/images/profiles/artist1.png', status: 'Open', minBid: 50, clientName: 'ClientA', clientProfile: '/images/profiles/client1.png', message: 'Looking for a cool sci-fi piece!', comment: 'Excited to see the results!' },
        { id: 2, imageUrl: '/images/explore/2.jpg', title: 'Cute Cat Avatar', artist: 'ArtMaster', artistProfile: '/images/profiles/artist2.png', status: 'Closed', minBid: 25, clientName: 'CatLover', clientProfile: '/images/profiles/client2.png', message: 'Need a cute avatar for my cat.', comment: 'Hope it turns out great!' },
        // ... more Artsign requests
    ];

    // Sample art request data for Commission (add profileImage and status)
    const commissionRequests = [
        { id: 3, imageUrl: '/images/explore/3.jpg', title: 'Anime Portrait', artist: 'AnimeArtist', artistProfile: '/images/profiles/artist3.png', status: 'Open', minBid: 75, purpose: 'OC Portrait', clientName: 'AnimeFan', clientProfile: '/images/profiles/client3.png', message: 'Requesting a stylized anime portrait.', comment: 'Looking forward to your unique style!' },
        { id: 4, imageUrl: '/images/explore/4.jpg', title: 'Bakery Logo', artist: 'LogoPro', artistProfile: '/images/profiles/artist4.png', status: 'Closed', minBid: 100, purpose: 'Branding', clientName: 'BreadKing', clientProfile: '/images/profiles/client4.png', message: 'Need a professional logo for my bakery.', comment: 'Want something memorable.' },
        // ... more Commission requests
    ];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleRequestClick = (request) => {
        setSelectedRequest(request);
        document.body.style.overflow = 'hidden';
    };

    const handleClosePopup = () => {
        setSelectedRequest(null);
        document.body.style.overflow = 'auto';
    };

    const requestsToDisplay =
        activeTab === 'artsign' ? artsignRequests :
        activeTab === 'commission' ? commissionRequests :
        [];

    return (
        <div className={styles.container}>
            <Navbarone />
            <div className={styles.content}>
                <Sidebar />
                <div className={styles.requests}>
                    <div className={styles.requestHeader}>
                        <h2 className={styles.pageTitle}>Art Requests</h2>
                    </div>
                    <div className={styles.tabButtons}>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'artsign' ? styles.active : ''}`}
                            onClick={() => handleTabChange('artsign')}
                        >
                            Artsign
                        </button>
                        <button
                            className={`${styles.tabButton} ${activeTab === 'commission' ? styles.active : ''}`}
                            onClick={() => handleTabChange('commission')}
                        >
                            Commission
                        </button>
                    </div>
                    <RequestGrid requests={requestsToDisplay} onRequestClick={handleRequestClick} />
                </div>
            </div>

            {selectedRequest && (
                <div className={detailStyles.popupOverlay}>
                    <div className={detailStyles.popupContentNewLayout}>
                        <button onClick={handleClosePopup} className={detailStyles.closeButtonRef}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>

                        <div className={detailStyles.box1}>
                            <div className={detailStyles.profileImageContainer}>
                                {selectedRequest.artistProfile && (
                                    <img src={selectedRequest.artistProfile} alt={selectedRequest.artist} className={detailStyles.profileImage} />
                                )}
                            </div>
                            <div className={detailStyles.artistInfo}>
                                <h3 className={detailStyles.title}>{selectedRequest.title}</h3>
                                <p className={detailStyles.username}>{selectedRequest.artist}</p>
                            </div>
                        </div>

                        <div className={detailStyles.box2}>
                            <div className={detailStyles.box2Row1Ref}>
                                <span className={detailStyles.activeTabTitle}>
                                    {activeTab === 'artsign' ? 'Artsign' : 'Commission'}
                                </span>
                                <span className={detailStyles.priceRef}>
                                    Price
                                </span>
                            </div>
                            <div className={detailStyles.box2Row2Ref}>
                                <span className={`${detailStyles.statusBadge} ${selectedRequest.status === 'Closed' ? detailStyles.statusClosedBadge : ''}`}>
                                    Status: {selectedRequest.status}
                                </span>
                                <span className={detailStyles.priceRef}>
                                    <span className={detailStyles.currencySymbol}>$</span>
                                    {selectedRequest.minBid && ` ${selectedRequest.minBid}`}
                                    {selectedRequest.maxBid && ` - ${selectedRequest.maxBid}`}
                                </span>
                            </div>
                        </div>

                        <div className={detailStyles.box3}>
                            {selectedRequest.imageUrl && (
                                <img
                                    src={selectedRequest.imageUrl}
                                    alt={selectedRequest.title}
                                    className={detailStyles.detailImageRef}
                                />
                            )}
                        </div>

                        <div className={detailStyles.box5}> {/* Box 5: Description */}
                            <h4 className={detailStyles.descriptionTitle}>Description</h4>
                            <ul className={detailStyles.descriptionList}>
                                {selectedRequest.message && <li>{selectedRequest.message}</li>}
                                {selectedRequest.comment && <li>Comment: {selectedRequest.comment}</li>}
                                {selectedRequest.purpose && <li>Purpose: {selectedRequest.purpose}</li>}
                                {selectedRequest.otherDetails && selectedRequest.otherDetails.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </div>

                        <div className={detailStyles.box4}> {/* Box 4: Action Buttons (อยู่ล่างสุด) */}
                            {selectedRequest.status !== 'Closed' && (
                                <button className={detailStyles.newRequestButtonRef}>
                                    New Commission Request
                                </button>
                            )}
                            <button className={detailStyles.chatButtonRef}>
                                Chat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ArtRequestPage;