// components/ChatModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/ChatModal.module.css';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSmile, faPaperclip, faMicrophone, faFlag, faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Import faFlag สำหรับ Report Icon

const socket = io('http://localhost:8080'); // เชื่อมต่อกับ Backend Socket.IO

function ChatModal({ isOpen, onClose, userId, otherUserId, otherUserProfile }) { // รับ Props otherUserProfile สำหรับรูปโปรไฟล์
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);
  const roomId = [userId, otherUserId].sort().join('-'); // สร้าง Room ID ที่ไม่ซ้ำกัน

  useEffect(() => {
    if (isOpen) {
      socket.emit('joinRoom', roomId);

      socket.on('receiveMessage', (data) => {
        if (data.roomId === roomId) {
          setMessages(prevMessages => [...prevMessages, data]);
        }
      });
    }

    return () => {
      socket.off('receiveMessage');
      if (isOpen) {
        socket.emit('leaveRoom', roomId); // ถ้ามี Logic leave room
      }
    };
  }, [isOpen, roomId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        roomId,
        senderId: userId,
        text: newMessage,
        timestamp: Date.now(),
      };
      socket.emit('sendMessage', messageData);
      setMessages(prevMessages => [...prevMessages, messageData]);
      setNewMessage('');
    }
  };

  const handleReportUser = () => {
    // เพิ่ม Logic สำหรับการ Report User ที่นี่
    console.log(`Report user ${otherUserId}`);
    // อาจจะเปิด Modal สำหรับเหตุผลการ Report หรือส่งไปยัง API
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.chatHeader}>
          <div className={styles.contactInfo}>
            <div className={styles.profileImageContainer}>
                {otherUserProfile ? (
                    <img src={otherUserProfile} alt={`Profile of User ${otherUserId}`} className={styles.profileImage} />
                ) : (
                    <FontAwesomeIcon icon={faUserCircle} className={styles.defaultProfileIcon} />
                )}
            </div>
            <span className={styles.contactName}>{otherUserId}</span>
          </div>
          <div className={styles.headerActions}>
            <button onClick={handleReportUser} className={styles.reportButton} title="Report User">
              <FontAwesomeIcon icon={faFlag} />
            </button>
            <button onClick={onClose} className={styles.closeButton}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
        <div className={styles.messageContainer} ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${msg.senderId === userId ? styles.sent : styles.received}`}
            >
              {msg.text}
              <span className={styles.timestamp}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.inputArea}>
          <div className={styles.inputControls}>
            <button className={styles.controlButton}>
              <FontAwesomeIcon icon={faSmile} />
            </button>
            <button className={styles.controlButton}>
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className={styles.messageInput}
          />
          <div className={styles.inputControls}>
            <button onClick={handleSendMessage} className={styles.sendButton}>
              Send
            </button>
            <button className={styles.controlButton}>
              <FontAwesomeIcon icon={faMicrophone} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatModal;