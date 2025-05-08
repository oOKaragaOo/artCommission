import React, { useState } from 'react';
import styles from '../../styles/ChatButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import ChatModal from '../components/ChatModal';
import ChatDropdown from '../components/ChatDropdown';

function ChatButton({ userId }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
    setIsChatOpen(false);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleOpenChat = (otherUserId, otherUserProfile) => {
    setSelectedChat({ otherUserId, otherUserProfile });
    setIsChatOpen(true);
    setIsDropdownOpen(false);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedChat(null);
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

      {isChatOpen && selectedChat && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={handleCloseChat}
          userId={userId}
          otherUserId={selectedChat.otherUserId}
          otherUserProfile={selectedChat.otherUserProfile}
        />
      )}
    </div>
  );
}

export default ChatButton;