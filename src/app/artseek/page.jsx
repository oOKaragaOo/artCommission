"use client";

import React, { useState } from 'react';
import styles from '../../styles/artseek.module.css';
import detailStyles from '../../styles/artseekdetail.module.css'; // Import CSS for the detail popup
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';
import '@fortawesome/fontawesome-free/css/all.min.css'; // นำเข้า Font Awesome CSS

function ArtseekPage() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const artworks = [
    { id: 1, topic: "Topic 1", commission: "Commission A", days: " 7 days", baht: " 300", details: "Details for Topic 1", name: "Artist A", status: "accept", description: "Description for commission A...", requirements: "Requirement 1, Requirement 2", offerDeadline: "2024-05-01", nsfw: "No", contactMethod: "Email", paymentMethod: "Bank Transfer", preferredCurrency: "THB", deliveryTimeline: "10 days" },
    { id: 2, topic: "Topic 2", commission: "Commission B", days: " 10 days", baht: " 500", details: "Details for Topic 2", name: "Artist B", status: "reject", description: "More details about commission B...", requirements: "Requirement X, Requirement Y", offerDeadline: "2024-05-05", nsfw: "Yes", contactMethod: "Discord", paymentMethod: "PayPal", preferredCurrency: "USD", deliveryTimeline: "15 days" },
    { id: 3, topic: "Topic 3", commission: "Commission C", days: " 5 days", baht: " 200", details: "Details for Topic 3", name: "Artist C", status: "pending", description: "Brief info on commission C...", requirements: "Requirement Alpha, Requirement Beta", offerDeadline: "2024-04-25", nsfw: "No", contactMethod: "Twitter DM", paymentMethod: "PromptPay", preferredCurrency: "THB", deliveryTimeline: "7 days" },
  ];

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind the popup
  };

  const handleClosePopup = () => {
    setSelectedArtwork(null);
    document.body.style.overflow = 'auto'; // Allow scrolling again
  };

  return (
    <div className={styles.container}>
      <Navbarone />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.artseek}>
          <h2 className={styles.artseekHeader}>Artseek</h2>
          <div className={styles.artseekGrid}>
            {artworks.map((artwork, index) => (
              <div key={artwork.id} className={styles.artworkItem} onClick={() => handleArtworkClick(artwork)}>
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

      {selectedArtwork && (
        <div className={detailStyles.popupOverlay}>
          <div className={detailStyles.popupContent}>
            <button onClick={handleClosePopup} className={detailStyles.closeButton}>
              <i className="fas fa-times"></i>
            </button>
            <h2 className={detailStyles.detailHeader}>{selectedArtwork.topic} - {selectedArtwork.commission}</h2>
            <div className={detailStyles.detailInfo}>
              <div>
                <strong>ชื่อผู้ประกาศรับสมัคร:</strong> {selectedArtwork.name}
              </div>
              <div>
                <strong>รายละเอียดงาน:</strong> {selectedArtwork.details}
              </div>
              <div>
                <strong>คำอธิบายเพิ่มเติม:</strong> {selectedArtwork.description || "-"}
              </div>
              <div>
                <strong>ข้อกำหนด/สิ่งที่ต้องการ:</strong> {selectedArtwork.requirements || "-"}
              </div>
              <div>
                <strong>ราคา:</strong> <i className="fas fa-dollar-sign"></i> {selectedArtwork.baht}
              </div>
              <div>
                <strong>ระยะเวลาดำเนินการ:</strong> <i className="fas fa-clock"></i> {selectedArtwork.days}
              </div>
              <div>
                <strong>วันหมดเขตการเสนอราคา:</strong> {selectedArtwork.offerDeadline}
              </div>
              <div>
                <strong>NSFW:</strong> {selectedArtwork.nsfw}
              </div>
              <div>
                <strong>วิธีการติดต่อ:</strong> {selectedArtwork.contactMethod}
              </div>
              <div>
                <strong>วิธีการชำระเงินที่ต้องการ:</strong> {selectedArtwork.paymentMethod}
              </div>
              <div>
                <strong>สกุลเงินที่ต้องการ:</strong> {selectedArtwork.preferredCurrency}
              </div>
              <div>
                <strong>ระยะเวลาการส่งมอบงานโดยประมาณ:</strong> {selectedArtwork.deliveryTimeline}
              </div>
              <div>
                <strong>สถานะ:</strong>
                {selectedArtwork.status === "accept" && <span className={styles.accept}><i className="fas fa-check"></i></span>}
                {selectedArtwork.status === "reject" && <span className={styles.reject}><i className="fas fa-times"></i></span>}
                {selectedArtwork.status === "pending" && <span className={styles.pending}><i className="fas fa-hourglass-half"></i></span>}
              </div>
            </div>
            <div className={detailStyles.offerSection}>
              <h3>เสนอราคา</h3>
              <textarea placeholder="รายละเอียดข้อเสนอของคุณ"></textarea>
              <button>ส่งข้อเสนอ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtseekPage;