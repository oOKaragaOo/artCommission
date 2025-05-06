// components/ChatButton.jsx
import React from 'react';
import styles from '../../styles/ChatButton.module.css'; // Import CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

function ChatButton() {
  const handleClick = () => {
    // เพิ่ม Logic เมื่อคลิกปุ่ม Chat ที่นี่
    console.log('Chat button clicked!');
    // ตัวอย่าง: เปิด Modal Chat หรือนำทางไปยังหน้า Chat
  };

  return (
    <button className={styles.chatButton} onClick={handleClick}>
      <FontAwesomeIcon icon={faCommentDots} className={styles.chatIcon} />
      Chat
    </button>
  );
}

export default ChatButton;