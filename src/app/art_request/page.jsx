"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "../../styles/art_request.module.css";
import detailStyles from "../../styles/artrequestdetailpopup.module.css";
import modalStyles from "../../styles/modal.module.css";
import RequestGrid from "../components/RequestGrid";
import Navbarone from "../components/Navbarone";
import Sidebar from "../components/Sidebar";
import ChatButton from "../components/ChatButton";
import { SessionContext } from "@/app/api/checkUser/route";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getPublicCards } from "../api/route";
import { uploadImageToCloudinary } from "../api/service/cloudinaryService";

function ArtRequestPage() {
  const [activeTab, setActiveTab] = useState("commission");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(null);
  const [publicCards, setPublicCards] = useState([]);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [targetUser, setTargetUser] = useState(null);
  const { sessionUser: localSessionUser } = useContext(SessionContext);
  const router = useRouter();

  useEffect(() => {
    const fetchPublicCards = async () => {
      await getPublicCards(setPublicCards, setError);
    };
    fetchPublicCards();
  }, []);

  useEffect(() => {
    if (publicCards.length > 0) {
      console.log("📦 Public Cards updated:", publicCards);
    }
  }, [publicCards]);

  useEffect(() => {
    setCurrentUser({ id: "user123" });
    setTargetUser({ id: "user456" });
  }, []);

  if (!currentUser || !targetUser) {
    return <div>Loading...</div>;
  }

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
    setUploadingImage(null);
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

  const handlePublish = async () => {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = document.getElementById("minRate").value;
    const estimatedDuration = document.getElementById("workDuration").value;
    const imageInput = document.getElementById("image");

    if (!title) {
      alert("Please enter a Title.");
      return;
    }
    if (!description) {
      alert("Please enter a Description.");
      return;
    }

    let imageUrl = null;

    try {
      if (imageInput.files && imageInput.files[0]) {
        console.log("⏳ Uploading image...");
        imageUrl = await uploadImageToCloudinary(imageInput.files[0], "default");
        console.log("✅ Image uploaded:", imageUrl);
      } else {
        console.log("⚠️ No image selected for upload.");
      }

      const response = await fetch(
        "http://localhost:8080/artist/commission-cards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            description,
            price: price ? parseFloat(price) : null,
            estimatedDuration: estimatedDuration ? parseInt(estimatedDuration) : null,
            sampleImageUrl: imageUrl,
            open: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create Commission Card.");
      }

      const data = await response.json();
      console.log("✅ Commission Card created:", data);
      alert("Commission Card created successfully!");
      closeCreateModal();
      setPublicCards([data, ...publicCards]);
    } catch (err) {
      console.error("❌ Error creating Commission Card:", err);
      alert(`Error: ${err.message}`);
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
          <RequestGrid requests={publicCards} onRequestClick={handleRequestClick} />
        </div>
        <ChatButton userId={currentUser?.id} otherUserId={targetUser?.id} />
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
              <button
                className={modalStyles.publishButton}
                onClick={handlePublish}
              >
                PUBLISH
              </button>
            </div>
            <div className={modalStyles.modalBody}>
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
                  max="150"
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > 150) {
                      e.target.value = 150;
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value > 150) {
                      e.target.value = 150;
                    }
                  }}
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
                {selectedRequest.artistProfilePicture && (
                  <img
                    src={selectedRequest.artistProfilePicture}
                    alt={selectedRequest.artistName || "Artist"}
                    className={detailStyles.profileImage}
                  />
                )}
              </div>
              <div className={detailStyles.artistInfo}>
                <h3 className={detailStyles.title}>{selectedRequest.title}</h3>
                <p className={detailStyles.username}>
                  {"@" + (selectedRequest.artistName || "Unknown Artist")}
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
              <h4 className={detailStyles.descriptionTitle}>Description</h4>
              <ul className={detailStyles.descriptionList}>
                <li>{selectedRequest.description}</li>
                <li>
                  Estimated Duration: {selectedRequest.estimatedDuration} days
                </li>
              </ul>
            </div>

            <div className={detailStyles.box4}>
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