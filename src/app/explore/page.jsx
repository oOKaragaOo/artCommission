"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/explore.module.css";
import detailStyles from "../../styles/artworkdetailpopup.module.css";
import Navbarone from "../components/Navbarone";
import Sidebar from "../components/Sidebar";
import ArtworkGrid from "../components/ArtworkGrid"; // Import the new component
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faHeart,
  faComment,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

function ExplorePage() {
  const [activeTab, setActiveTab] = useState("popular");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/posts", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to load posts");
        }
        const formatted = data.map((post) => ({
          id: post.postId,
          imageUrl: post.imageUrl,
          title: post.caption || "Untitled",
          artist: post.authorName || "Unknown Artist",
          likes: post.likeCount || 0,
          comments: post.comments?.length || 0,
          profileImageUrl:
            post.authorProfilePicture || "/images/default-profile.png",
          description: post.description || "",
        }));
        setArtworks(formatted);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setSelectedArtwork(null);
    document.body.style.overflow = "auto";
  };

  const artworksToDisplay = artworks;

  return (
    <div className={styles.container}>
      <Navbarone />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.artworks}>
          <div className={styles.artworkHeader}>
            <h2 className={styles.pageTitle}>Explore</h2>
          </div>
          <div className={styles.tabButtons}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "popular" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("popular")}
            >
              Popular
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "recent" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("recent")}
            >
              Recent
            </button>
          </div>
          {loading ? (
            <p>Loading artworks...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <ArtworkGrid
              artworks={artworksToDisplay}
              onArtworkClick={handleArtworkClick}
            />
          )}
        </div>
      </div>

      {selectedArtwork && (
        <div className={detailStyles.popupOverlay}>
          <div className={detailStyles.popupContent}>
            <button
              onClick={handleClosePopup}
              className={detailStyles.closeButton}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <img
              src={selectedArtwork.imageUrl}
              alt={selectedArtwork.title}
              className={detailStyles.detailImage}
            />
            <h3 className={detailStyles.detailTitle}>
              {selectedArtwork.title}
            </h3>
            <p className={detailStyles.detailArtist}>
              {selectedArtwork.artist}
            </p>
            {selectedArtwork.description && (
              <p className={detailStyles.detailDescription}>
                {selectedArtwork.description}
              </p>
            )}
            <div className={detailStyles.detailActions}>
              <button className={detailStyles.actionButton}>
                <FontAwesomeIcon icon={faHeart} /> {selectedArtwork.likes}
              </button>
              <button className={detailStyles.actionButton}>
                <FontAwesomeIcon icon={faComment} /> {selectedArtwork.comments}
              </button>
              <button className={detailStyles.actionButton}>
                <FontAwesomeIcon icon={faShare} /> Share
              </button>
              {/* Add more action buttons as needed */}
            </div>
            {/* Add comment section or more details here */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExplorePage;
