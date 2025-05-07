// components/ChatDropdown.jsx
import React, { useState, useEffect } from 'react';
import styles from '../../styles/ChatDropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function ChatDropdown({ isOpen, onClose, userId, onSelectChat }) {
  const [chatList, setChatList] = useState([
    { otherUserId: 'Deaww', otherUserProfile: 'https://shorturl.asia/9yaZ5', username: 'Deaww' },
    { otherUserId: 'Kahnoon', otherUserProfile: 'https://shorturl.asia/xFwYW', username: 'Kahnoon' },
    { otherUserId: 'HartZep', otherUserProfile: 'https://shorturl.asia/sLHJC', username: 'HartZep' },
    { otherUserId: 'Neo', otherUserProfile: 'https://shorturl.asia/Rfx0j', username: 'Neo' },
    { otherUserId: 'Oat', otherUserProfile: 'https://shorturl.asia/W76bO', username: 'Oat' },
    { otherUserId: 'Wern', otherUserProfile: 'https://shorturl.asia/2DM47', username: 'Wern' },
    // เพิ่มรายชื่อ Mockup Chat เพิ่มเติมได้ที่นี่
  ]);
  const [loading, setLoading] = useState(false); // ตั้งเป็น false สำหรับ Mockup
  const [error, setError] = useState(null); // ตั้งเป็น null สำหรับ Mockup

  const handleSelect = (otherUserId, otherUserProfile) => {
    onSelectChat(otherUserId, otherUserProfile);
    onClose(); // ปิด Dropdown หลังจากเลือกแชท
  };

  if (!isOpen) {
    return null;
  }

  if (loading) {
    return <div className={styles.dropdown}>Loading chats...</div>;
  }

  if (error) {
    return <div className={styles.dropdown}>Error loading chats: {error}</div>;
  }

  return (
    <div className={styles.dropdown}>
      <ul className={styles.chatList}>
        {chatList.map(chat => (
          <li
            key={chat.otherUserId} // หรือ ID ของ Conversation
            className={styles.chatItem}
            onClick={() => handleSelect(chat.otherUserId, chat.otherUserProfile)}
          >
            <div className={styles.profileIcon}>
              {chat.otherUserProfile ? (
                <img src={chat.otherUserProfile} alt={chat.username} />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} />
              )}
            </div>
            <span className={styles.username}>{chat.username || chat.otherUserId}</span> {/* ใช้ username ถ้ามี */}
          </li>
        ))}
        {chatList.length === 0 && !loading && <li className={styles.noChats}>No recent chats</li>}
      </ul>
    </div>
  );
}

export default ChatDropdown;