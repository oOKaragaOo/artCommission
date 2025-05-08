import React, { useState, useEffect } from 'react';
import styles from '../../styles/ChatDropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const MOCK_CHAT_LIST = [ // Mock data
  { otherUserId: 'Deaww', otherUserProfile: 'https://shorturl.asia/9yaZ5', username: 'Deaww' },
  { otherUserId: 'Kahnoon', otherUserProfile: 'https://shorturl.asia/xFwYW', username: 'Kahnoon' },
  { otherUserId: 'HartZep', otherUserProfile: 'https://shorturl.asia/sLHJC', username: 'HartZep' },
  { otherUserId: 'Neo', otherUserProfile: 'https://shorturl.asia/Rfx0j', username: 'Neo' },
  { otherUserId: 'Oat', otherUserProfile: 'https://shorturl.asia/W76bO', username: 'Oat' },
  { otherUserId: 'Wern', otherUserProfile: 'https://shorturl.asia/2DM47', username: 'Wern' },
];

function ChatDropdown({ isOpen, onClose, userId, onSelectChat }) {
  const [chatList, setChatList] = useState(MOCK_CHAT_LIST);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelect = (otherUserId, otherUserProfile) => {
    onSelectChat(otherUserId, otherUserProfile);
    onClose();
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
            key={chat.otherUserId}
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
            <span className={styles.username}>{chat.username || chat.otherUserId}</span>
          </li>
        ))}
        {chatList.length === 0 && !loading && <li className={styles.noChats}>No recent chats</li>}
      </ul>
    </div>
  );
}

export default ChatDropdown;