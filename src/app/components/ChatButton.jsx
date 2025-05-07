// components/ChatButton.jsx
import React, { useState } from 'react';
import styles from '../../styles/ChatButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import ChatModal from '../components/ChatModal';
import ChatDropdown from '../components/ChatDropdown';

function ChatButton({ userId }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsChatOpen(false); // ปิด Modal ถ้าเปิดอยู่
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleOpenChat = (otherUserId, otherUserProfile) => {
    setSelectedUserId(otherUserId);
    setSelectedUserProfile(otherUserProfile);
    setIsChatOpen(true);
    setIsDropdownOpen(false); // ปิด Dropdown เมื่อเลือกแชท
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedUserId(null);
    setSelectedUserProfile(null);
  };

  return (
    <div className={styles.chatButtonContainer}>
      <button className={styles.chatButton} onClick={handleToggleDropdown}>
        <FontAwesomeIcon icon={faCommentDots} className={styles.chatIcon} />
        Chat
      </button>

      {isDropdownOpen && (
        <ChatDropdown
          isOpen={isDropdownOpen}
          onClose={handleCloseDropdown}
          userId={userId}
          onSelectChat={handleOpenChat}
        />
      )}

      {isChatOpen && selectedUserId && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={handleCloseChat}
          userId={userId}
          otherUserId={selectedUserId}
          otherUserProfile={selectedUserProfile}
        />
      )}
    </div>
  );
}

export default ChatButton;