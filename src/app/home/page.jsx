// home/page.jsx
"use client";

import React, { useState } from 'react';
import styles from '../../styles/feedpage.module.css';
import detailStyles from '../../styles/postdetailpopup.module.css'; // Import styles for the popup
import Navbarone from '../components/Navbarone';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons';

const FeedPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      artistName: 'USER NAME 1',
      account: '@NameAccount1',
      image: '/images/test1.jpg',
      likes: 15,
      comments: 3,
      shares: 2,
      liked: false,
      description: 'This is the first post with a longer description.',
    },
    {
      id: 2,
      artistName: 'USER NAME 2',
      account: '@NameAccount2',
      image: '/images/test2.jpg',
      likes: 28,
      comments: 8,
      shares: 5,
      liked: true,
      description: 'Another interesting post for your feed.',
    },
    {
      id: 3,
      artistName: 'USER NAME 3',
      account: '@NameAccount3',
      image: '/images/test3.jpg',
      likes: 28,
      comments: 8,
      shares: 5,
      liked: true,
      description: 'A third post to showcase the feed.',
    },
    {
      id: 4,
      artistName: 'USER NAME 4',
      account: '@NameAccount4',
      image: '/images/test4.jpg',
      likes: 28,
      comments: 8,
      shares: 5,
      liked: true,
      description: 'The last sample post in this feed.',
    },
    // เพิ่มโพสต์อื่นๆ
  ]);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked } : post
      )
    );
  };

  const handleComment = (postId) => {
    alert(`เปิดความคิดเห็นสำหรับโพสต์ ID: ${postId}`);
  };

  const handleShare = (postId) => {
    alert(`แชร์โพสต์ ID: ${postId}`);
  };

  const handleOpenPostDetail = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden'; // Prevent scrolling on the background
  };

  const handleClosePostDetail = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'auto'; // Allow scrolling again
  };

  return (
    <div className={styles.container}>
      <Navbarone />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.feed}>
          {posts.map((post) => (
            <div key={post.id} className={styles.post}>
              <div className={styles.postHeader}>
                <img src="/images/default-avatar.png" alt={post.artistName} className={styles.avatar} />
                <div className={styles.artistInfo}>
                  <h3>{post.artistName}</h3>
                  <p>{post.account}</p>
                </div>
              </div>
              <div className={styles.postImage} onClick={() => handleOpenPostDetail(post)}>
                <img src={post.image} alt="Post Image" />
              </div>
              <div className={styles.postActions}>
                <button className={`${styles.actionButton} ${post.liked ? styles.liked : ''}`} onClick={() => handleLike(post.id)}>
                  <FontAwesomeIcon icon={faHeart} /> {post.likes}
                </button>
                <button className={styles.actionButton} onClick={() => handleComment(post.id)}>
                  <FontAwesomeIcon icon={faComment} /> {post.comments}
                </button>
                <button className={styles.actionButton} onClick={() => handleShare(post.id)}>
                  <FontAwesomeIcon icon={faShare} /> {post.shares}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPost && (
        <div className={detailStyles.popupOverlay}>
          <div className={detailStyles.popupContent}>
            <button onClick={handleClosePostDetail} className={detailStyles.closeButton}>
              &times; {/* Using a simple 'x' for close icon */}
            </button>
            <div className={detailStyles.gridItemImage}>
              <img src={selectedPost.image} alt="Post Image" />
            </div>
            <div className={detailStyles.gridItemDetails}>
              {/* Part 1: Header */}
              <div className={detailStyles.detailHeader}>
                <img src="/images/default-avatar.png" alt={selectedPost.artistName} className={detailStyles.avatar} />
                <div className={detailStyles.artistInfo}>
                  <h3>{selectedPost.artistName}</h3>
                  <p>{selectedPost.account}</p>
                </div>
              </div>

              {/* Part 2: Comments Section */}
              <div className={detailStyles.commentsSection}>
                <p className={detailStyles.postDetailDescription}>{selectedPost.description}</p>
                {/* Example Comments - Replace with your actual comment data */}
                <div className={detailStyles.comment}>
                  <strong>another_user:</strong> Looks amazing! <span>👏</span>
                </div>
                <div className={detailStyles.comment}>
                  <strong>cool_artist:</strong> Great shot!
                </div>
                {/* ... more comments ... */}
              </div>

              {/* Part 3: Actions Buttons */}
              <div className={detailStyles.detailActions}>
                <button className={`${detailStyles.actionButton} ${selectedPost.liked ? detailStyles.liked : ''}`} onClick={() => handleLike(selectedPost.id)}>
                  <FontAwesomeIcon icon={faHeart} /> <span className={detailStyles.actionCount}>{selectedPost.likes}</span>
                </button>
                <button className={detailStyles.actionButton} onClick={() => handleComment(selectedPost.id)}>
                  <FontAwesomeIcon icon={faComment} /> <span className={detailStyles.actionCount}>{selectedPost.comments}</span>
                </button>
                <button className={detailStyles.actionButton} onClick={() => handleShare(selectedPost.id)}>
                  <FontAwesomeIcon icon={faShare} />
                </button>
              </div>

              {/* Part 4: Comment Input */}
              <div className={detailStyles.commentInputSection}>
                <button className={detailStyles.emojiButton}> {/* Replace the img with a button */}
                  <img src="/images/emoji_icon.png" alt="Emoji Icon" className={detailStyles.emojiIcon} /> {/* Image inside the button */}
                </button>
                <input type="text" className={detailStyles.commentInput} placeholder="เพิ่มความคิดเห็น..." />
                <button className={detailStyles.postButton}>โพสต์</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedPage;