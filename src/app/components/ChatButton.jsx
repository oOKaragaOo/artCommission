// components/ChatButton.jsx
import React, { useState } from 'react';
import styles from '../../styles/ChatButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import ChatModal from '../components/ChatModal'; // Import ChatModal

function ChatButton({ userId, otherUserId }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleClick = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <button className={styles.chatButton} onClick={handleClick}>
        <FontAwesomeIcon icon={faCommentDots} className={styles.chatIcon} />
        Chat
      </button>
      <ChatModal
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        userId={userId} // ID ของ User ที่กำลังใช้งาน
        otherUserId={otherUserId} // ID ของ User ที่กำลังจะ Chat ด้วย (ต้องส่ง Props นี้มา)
      />
    </>
  );
}

export default ChatButton;