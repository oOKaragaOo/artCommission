"use client";

import React, { useState } from 'react';
import styles from '../../styles/artseek.module.css';
import detailStyles from '../../styles/artseekdetail.module.css';
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';
import SeekArtistPopup from '../components/SeekArtistPopup';
import '@fortawesome/fontawesome-free/css/all.min.css';

function ArtworkItem({ artwork, onArtworkClick }) {
  return (
    <div key={artwork.id} className={styles.artworkItem} onClick={() => onArtworkClick(artwork)}>
      <div className={styles.artworkInfo}>
        <div className={styles.artworkHeader}>
          <span className={styles.artworkTopic}>{artwork.topic}</span>
          {artwork.commission && <span className={styles.commission}>{artwork.commission}</span>}
        </div>
        <div className={styles.artworkPriceTime}>
          {artwork.priceRange && <span className={styles.price}><i className="fas fa-dollar-sign"></i> {artwork.priceRange}</span>}
          {artwork.time && <span className={styles.time}><i className="fas fa-clock"></i> {artwork.time}</span>}
        </div>
        {artwork.usage && <span className={styles.usage}><i className="fas fa-tag"></i> {artwork.usage}</span>}
        <p className={styles.artworkDetails}>{artwork.details.substring(0, 80)}...</p>
      </div>
      <div className={styles.artistInfo}>
        <div className={styles.artistLeft}>
          <img src="/images/avatar_placeholder.png" alt={artwork.artistName} className={styles.artistAvatar} />
          <div className={styles.artistDetails}>
            <span className={styles.artistName}>{artwork.artistName}</span>
            <span className={styles.artistHandle}>{artwork.artistHandle}</span>
          </div>
        </div>
        <span className={artwork.status === "open" ? styles.openStatus : styles.closedStatus}>{artwork.status}</span>
      </div>
    </div>
  );
}
function ArtworkDetailPopup({ artwork, onClose }) {
  if (!artwork) return null;

  return (
    <div className={detailStyles.popupOverlay}>
      <div className={detailStyles.popupContent}>
        <button onClick={onClose} className={detailStyles.closeButton}>
          <i className="fas fa-times"></i>
        </button>
        <h2 className={detailStyles.detailHeader}>{artwork.topic}</h2>
        {artwork.commission && <h3 className={detailStyles.commissionTitle}>{artwork.commission}</h3>}
        <div className={detailStyles.detailInfo}>
          <div className={detailStyles.infoRow}>
            <strong>Recommended Price:</strong> {artwork.priceRange ? <><i className="fas fa-dollar-sign"></i> {artwork.priceRange}</> : '-'}
          </div>
          <div className={detailStyles.infoRow}>
            <strong>Commercial use:</strong> {artwork.commercialUse || '-'}
          </div>
          <div className={detailStyles.infoRow}>
            <strong>Usage details:</strong> {artwork.usage || '-'}
          </div>
          <div className={detailStyles.infoRow}>
            <strong>NSFW:</strong> {artwork.nsfw || '-'}
          </div>
          <div className={detailStyles.infoRow}>
            <strong>Work description:</strong> {artwork.details || '-'}
          </div>
          <div className={detailStyles.infoRow}>
            <strong>Hide Images from artist's Works when:</strong> {artwork.hideImagesArtist || '-'}
          </div>
          <div className={detailStyles.infoRow}>
            <strong>Hide Images from client's Collections when:</strong> {artwork.hideImagesClient || '-'}
          </div>
          <div className={detailStyles.infoRow}>
            <strong>Estimated work duration:</strong> {artwork.estimatedWorkDuration ? <><i className="fas fa-clock"></i> {artwork.estimatedWorkDuration}</> : '-'}
          </div>
          {artwork.description && <div className={detailStyles.infoRow}><strong>คำอธิบายเพิ่มเติม:</strong> {artwork.description}</div>}
          {artwork.requirements && <div className={detailStyles.infoRow}><strong>ข้อกำหนด:</strong> {artwork.requirements}</div>}
          {artwork.offerDeadline && <div className={detailStyles.infoRow}><strong>หมดเขตเสนอราคา:</strong> {artwork.offerDeadline}</div>}
          {artwork.contactMethod && <div className={detailStyles.infoRow}><strong>ติดต่อ:</strong> {artwork.contactMethod}</div>}
          {artwork.paymentMethod && <div className={detailStyles.infoRow}><strong>ชำระเงิน:</strong> {artwork.paymentMethod}</div>}
          {artwork.preferredCurrency && <div className={detailStyles.infoRow}><strong>สกุลเงิน:</strong> {artwork.preferredCurrency}</div>}
          {artwork.deliveryTimeline && <div className={detailStyles.infoRow}><strong>ส่งมอบภายใน:</strong> {artwork.deliveryTimeline}</div>}
          <div className={detailStyles.infoRow}><strong>ผู้ประกาศ:</strong> {artwork.artistName} ({artwork.artistHandle})</div>
          <div className={detailStyles.infoRow}><strong>สถานะ:</strong> <span className={artwork.status === "open" ? styles.openStatus : styles.closedStatus}>{artwork.status}</span></div>
        </div>
        <div className={detailStyles.offerSection}>
          <h3>Work Offers</h3>
          {artwork.status === "closed" ? (
            <div className={detailStyles.noOffers}>No offers yet</div>
          ) : (
            <>
              <div className={detailStyles.noOffers}>No offers yet</div>
              <button className={detailStyles.newOfferButton}>+ New Offer</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSection({ isFilterOpen, toggleFilter }) {
  return (
    <div className={styles.filterSection}>
      <button className={styles.filterButton} onClick={toggleFilter}>
        <i className="fas fa-filter"></i> Filter
      </button>
      {isFilterOpen && (
        <div className={styles.filterDropdown}>
          <div className={styles.filterGroup}>
            <label>ประเภท:</label>
            <select>
              <option>ทั้งหมด</option>
              <option>ภาพวาด</option>
              <option>โมเดล 3D</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label>ราคา:</label>
            <div className={styles.priceRange}>
              <input type="number" placeholder="ต่ำสุด" />
              <span>-</span>
              <input type="number" placeholder="สูงสุด" />
            </div>
          </div>
          <button className={styles.applyFilterButton}>Apply Filter</button>
        </div>
      )}
    </div>
  );
}

function ArtseekPage() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSeekArtistPopupOpen, setIsSeekArtistPopupOpen] = useState(false);

  const artworks = [
    { id: 1, topic: "Topic 1", commission: "Commission A", priceRange: "500 - 2000", time: "30 days", usage: "personal use", details: "Profile picture, personal collection", artistName: "G'MeMe", artistHandle: "@GoMeSuriicha", status: "open", commercialUse: "No", nsfw: "No", hideImagesArtist: "done", hideImagesClient: "when done", estimatedWorkDuration: "30 days" },
    { id: 2, topic: "Topic 2", commission: "Commission B", priceRange: "500 - 1500", time: "30 days", usage: "personal collection, ภาพวาดแนวอิสระ", details: "คาแรคเตอร์ตัวละครที่คุณ...", artistName: "Noknaa", artistHandle: "@Noknaa", status: "closed", commercialUse: null, nsfw: null, hideImagesArtist: null, hideImagesClient: null, estimatedWorkDuration: null },
    { id: 3, topic: "Topic 3", commission: "Commission", priceRange: "500 - 3000", time: "10 days", usage: "personal use", details: "ภาพปกคอมมิชชั่นสำหรับ...", artistName: "agentP", artistHandle: "@agentP", status: "closed", commercialUse: null, nsfw: null, hideImagesArtist: null, hideImagesClient: null, estimatedWorkDuration: null },
    { id: 4, topic: "Topic 4", commission: "คอมมิชชั่น", priceRange: "1000 - 4000", time: "7 days", usage: "wallpaper", details: "สเก็ตภาพคอมมิชชั่น...", artistName: "Symposium", artistHandle: "@Symposium", status: "open", commercialUse: null, nsfw: null, hideImagesArtist: null, hideImagesClient: null, estimatedWorkDuration: null },
    { id: 5, topic: "Topic 5", commission: "คอมมิชชั่น", priceRange: "200 - 1000", time: "10 days", usage: "commercial use", details: "หน้าภาพวาดนิยาย...", artistName: "Haim001", artistHandle: "@Haim001", status: "open", commercialUse: null, nsfw: null, hideImagesArtist: null, hideImagesClient: null, estimatedWorkDuration: null },
    { id: 6, topic: "Topic 6", commission: "คอมมิชชั่น", priceRange: "200 - 1000", time: "10 days", usage: "commercial use", details: "หน้าภาพวาดนิยาย...", artistName: "book cover", artistHandle: "@bookcover", status: "open", commercialUse: null, nsfw: null, hideImagesArtist: null, hideImagesClient: null, estimatedWorkDuration: null },
  ];

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
    document.body.style.overflow = 'hidden';
  };

  const handleClosePopup = () => {
    setSelectedArtwork(null);
    document.body.style.overflow = 'auto';
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const openSeekArtistPopup = () => {
    setIsSeekArtistPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSeekArtistPopup = () => {
    setIsSeekArtistPopupOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={styles.container}>
      <Navbarone />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.artseek}>
          <div className={styles.header}>
            <h2 className={styles.artseekHeader}>Artseek</h2>
            <button className={styles.seekArtistButton} onClick={openSeekArtistPopup}>
              <i className="fas fa-search"></i> Seek Artist
            </button>
          </div>

          <FilterSection isFilterOpen={isFilterOpen} toggleFilter={toggleFilter} />

          <div className={styles.artseekGrid}>
            {artworks.map((artwork) => (
              <ArtworkItem key={artwork.id} artwork={artwork} onArtworkClick={handleArtworkClick} />
            ))}
          </div>
        </div>
      </div>

      <ArtworkDetailPopup artwork={selectedArtwork} onClose={handleClosePopup} />

      {isSeekArtistPopupOpen && (
        <SeekArtistPopup onClose={closeSeekArtistPopup} />
      )}
    </div>
  );
}

export default ArtseekPage;