"use client";

import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles/art_request.module.css";
import detailStyles from "../../styles/artrequestdetailpopup.module.css";
import modalStyles from "../../styles/modal.module.css";
import RequestGrid from "../components/RequestGrid";
import Navbarone from "../components/Navbarone";
import Sidebar from "../components/Sidebar";
import { SessionContext } from "@/app/api/checkUser/route";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getPublicCards } from "../api/route";

function ArtRequestPage() {
  const [activeTab, setActiveTab] = useState("commission");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(null);
  const { sessionUser: localSessionUser } = useContext(SessionContext);
  const [publicCards, setPublicCards] = useState([]);
  const [error, setError] = useState(null);

  const router = useRouter();

  // Sample art request data for Commission (add profileImage and status)

  useEffect(() => {
    const fetchPublicCards = async () => {
      await getPublicCards(setPublicCards, setError);
    };
    fetchPublicCards();
    console.log("eeeeeeee", publicCards);
  }, []);

  useEffect(() => {
    if (publicCards.length > 0) {
      console.log("📦 Public Cards updated:", publicCards);
    }
  }, [publicCards]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setSelectedRequest(null);
    document.body.style.overflow = "auto";
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    document.body.style.overflow = "auto";
    setUploadingImage(null); // ล้างรูปตัวอย่างเมื่อปิด Modal
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadingImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadingImage(null);
    }
  };

  return (
    <div className={styles.container}>
      <Navbarone />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.requests}>
          <div className={styles.requestHeader}>
            <h2 className={styles.pageTitle}>Art Requests</h2>
            <button className={styles.createButton} onClick={openCreateModal}>
              + Create
            </button>
          </div>
          <div className={styles.tabButtons}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "commission" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("commission")}
            >
              Commission
            </button>
          </div>
          <RequestGrid
            requests={publicCards}
            onRequestClick={handleRequestClick}
          />
        </div>
      </div>

      {isCreateModalOpen && (
        <div className={modalStyles.modalOverlay}>
          <div className={modalStyles.createModal}>
            <div className={modalStyles.modalHeader}>
              <button
                onClick={closeCreateModal}
                className={modalStyles.cancelButton}
              >
                CANCEL
              </button>
              <h2>Create New Request</h2>
              <button className={modalStyles.publishButton}>PUBLISH</button>
            </div>
            <div className={modalStyles.modalBody}>
              <div className={modalStyles.formGroup}>
                <label htmlFor="status">Status</label>
                <select id="status">
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="minRate">Min. Rate ($)</label>
                <input
                  type="number"
                  id="minRate"
                  placeholder="Minimum Price"
                  min="0"
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="workDuration">Work duration (days)</label>
                <input
                  type="number"
                  id="workDuration"
                  placeholder="Estimated Days"
                  min="0"
                />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="image">Attach Image</label>
                <div className={modalStyles.attachImageContainer}>
                  {uploadingImage ? (
                    <img
                      src={uploadingImage}
                      alt="Preview"
                      className={modalStyles.attachImagePreview}
                    />
                  ) : (
                    <div className={modalStyles.attachImagePlaceholder}>
                      + Album Cover
                    </div>
                  )}
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={modalStyles.imageInput}
                  />
                </div>
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="Request Title" />
              </div>
              <div className={modalStyles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  placeholder="Detailed Description"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedRequest && (
        <div className={detailStyles.popupOverlay}>
          <div className={detailStyles.popupContentNewLayout}>
            <button
              onClick={handleClosePopup}
              className={detailStyles.closeButtonRef}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className={detailStyles.box1}>
              <div className={detailStyles.profileImageContainer}>
                {selectedRequest.artistProfile && (
                  <img
                    src={selectedRequest.artistProfile}
                    alt={selectedRequest.artist || "Artist"}
                    className={detailStyles.profileImage}
                  />
                )}
              </div>
              <div className={detailStyles.artistInfo}>
                <h3 className={detailStyles.title}>{selectedRequest.title}</h3>
                <p className={detailStyles.username}>
                  {selectedRequest.artist || "Unknown Artist"}
                </p>
              </div>
            </div>

            <div className={detailStyles.box2}>
              <div className={detailStyles.box2Row1Ref}>
                <span className={detailStyles.activeTabTitle}>Commission</span>
                <span className={detailStyles.priceRef}>Price</span>
              </div>
              <div className={detailStyles.box2Row2Ref}>
                <span
                  className={`${detailStyles.statusBadge} ${
                    !selectedRequest.open ? detailStyles.statusClosedBadge : ""
                  }`}
                >
                  Status: {selectedRequest.open ? "Open" : "Closed"}
                </span>
                <span className={detailStyles.priceRef}>
                  {selectedRequest.price !== null ? (
                    <>
                      <span className={detailStyles.currencySymbol}>$</span>
                      {selectedRequest.price}
                    </>
                  ) : (
                    "Price not set"
                  )}
                </span>
              </div>
            </div>

            <div className={detailStyles.box3}>
              {selectedRequest.sampleImageUrl && (
                <img
                  src={selectedRequest.sampleImageUrl}
                  alt={selectedRequest.title}
                  className={detailStyles.detailImageRef}
                />
              )}
            </div>

            <div className={detailStyles.box5}>
              {/* Box 5: Description */}
              <h4 className={detailStyles.descriptionTitle}>Description</h4>
              <ul className={detailStyles.descriptionList}>
                <li>{selectedRequest.description}</li>
                <li>
                  Estimated Duration: {selectedRequest.estimatedDuration} days
                </li>
              </ul>
            </div>

            <div className={detailStyles.box4}>
              {/* Box 4: Action Buttons */}
              {selectedRequest.open && (
                <button className={detailStyles.newRequestButtonRef}>
                  New Commission Request
                </button>
              )}
              <button className={detailStyles.chatButtonRef}>Chat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtRequestPage;
