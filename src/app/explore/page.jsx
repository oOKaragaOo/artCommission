"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/explore.module.css";
import detailStyles from "../../styles/artworkdetailpopup.module.css";
import Navbarone from "../components/Navbarone";
import Sidebar from "../components/Sidebar";
import ArtworkGrid from "../components/ArtworkGrid";
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
          <div
            className={`${detailStyles.popupContent} bg-gray-100 p-4 rounded shadow mb-4`}
          >
            <button
              onClick={handleClosePopup}
              className={detailStyles.closeButton}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {/* หัวโพสต์ */}
            <div className="flex items-center gap-2 mb-2">
              <img
                src={selectedArtwork.profileImageUrl || "/default-avatar.png"}
                className="w-8 h-8 rounded-full object-cover"
                alt="author"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {selectedArtwork.artist}
                </p>
                {/* <p className="text-sm text-gray-400">{/* Add createdAt if available *}</p> */}
              </div>
            </div>

            {/* แคปชันและรูป */}
            {selectedArtwork.description && (
              <p className="text-sm text-gray-500 mb-2">
                {selectedArtwork.description}
              </p>
            )}
            <img
              src={selectedArtwork.imageUrl}
              alt={selectedArtwork.title}
              className="h-60 w-full object-cover rounded"
            />

            {/* ปุ่ม */}
            <div className="flex items-center gap-4 mt-4">
              <button className="bg-gray-800 text-white px-3 py-1 rounded-full">
                ❤️ {selectedArtwork.likes || 0}
              </button>
              <button className="bg-gray-800 text-white px-3 py-1 rounded-full">
                💬 {selectedArtwork.comments || 0}{" "}
                {/* ปรับถ้าโครงสร้าง comment ต่างกัน */}
              </button>
              <button className="bg-gray-800 text-white px-3 py-1 rounded-full">
                <FontAwesomeIcon icon={faShare} /> Share
              </button>
            </div>

            {/* ส่วน Comment (ถ้าต้องการ) */}
            {/* <div className="mt-4 space-y-2">
                    {/* Map through comments * /}
                </div> */}

            {/* ช่อง Comment (ถ้าต้องการ) */}
            <form onSubmit={handleSubmit} className="flex mt-4">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="แสดงความคิดเห็น..."
                className="w-full p-2 rounded-l bg-amber-200 text-sm"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 rounded-r hover:bg-gray-800"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExplorePage;
