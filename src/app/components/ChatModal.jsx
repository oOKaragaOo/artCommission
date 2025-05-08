import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/ChatModal.module.css';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faSmile,
  faPaperclip,
  faMicrophone,
  faFlag,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

const socket = io('http://localhost:8080');

function ChatModal({ isOpen, onClose, userId, otherUserId, otherUserProfile }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);
  const roomId = [userId, otherUserId].sort().join('-');

  useEffect(() => {
    if (isOpen) {
      socket.emit('joinRoom', roomId);

      const handleReceiveMessage = (data) => {
        if (data.roomId === roomId) {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      };

      socket.on('receiveMessage', handleReceiveMessage);

      return () => {
        socket.off('receiveMessage', handleReceiveMessage);
        socket.emit('leaveRoom', roomId);
      };
    }
  }, [isOpen, roomId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      const messageData = {
        roomId,
        senderId: userId,
        text: trimmedMessage,
        timestamp: Date.now(),
      };
      socket.emit('sendMessage', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage('');
    }
  };

  const handleReportUser = () => {
    console.log(`Report user ${otherUserId}`);
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
                <img
                  src={otherUserProfile}
                  alt={`Profile of User ${otherUserId}`}
                  className={styles.profileImage}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className={styles.defaultProfileIcon}
                />
              )}
            </div>
            <span className={styles.contactName}>{otherUserId}</span>
          </div>
          <div className={styles.headerActions}>
            <button
              onClick={handleReportUser}
              className={styles.reportButton}
              title="Report User"
            >
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
              className={`${styles.message} ${
                msg.senderId === userId ? styles.sent : styles.received
              }`}
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