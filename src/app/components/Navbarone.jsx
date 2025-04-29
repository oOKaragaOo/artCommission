import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/Navbarone.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faFileImport, faFileExport } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  const [activeNotificationTab, setActiveNotificationTab] = useState('all');

  const notifications = [
    { id: 1, type: 'general', message: 'New content you might like!', time: '5 mins ago' },
    { id: 2, type: 'important', message: 'Your artwork has been featured!', time: '1 hour ago' },
    { id: 3, type: 'incoming-orders', message: 'You have a new order: Artwork #123', time: '2 hours ago' },
    { id: 4, type: 'outgoing-requests', message: 'Your request for collaboration on Project X has been accepted.', time: '3 hours ago' },
    { id: 5, type: 'chat', message: 'New message from UserXYZ', time: '4 hours ago' },
    { id: 6, type: 'general', message: 'Someone liked your recent post.', time: '6 hours ago' },
    // Add more notifications
  ];

  const filteredNotifications = () => {
    if (activeNotificationTab === 'all') {
      return notifications;
    } else if (activeNotificationTab === 'general') {
      return notifications.filter(n => n.type === 'general' || n.type === 'important');
    } else if (activeNotificationTab === 'incoming-orders') {
      return notifications.filter(n => n.type === 'incoming-orders');
    } else if (activeNotificationTab === 'outgoing-requests') {
      return notifications.filter(n => n.type === 'outgoing-requests');
    } else if (activeNotificationTab === 'chat') {
      return notifications.filter(n => n.type === 'chat');
    }
    return [];
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setIsNotificationOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationRef]);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <span className="font-bold text-xl">LOGO A-Comm</span>
        </Link>
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="ค้นหา" />
      </div>
      <div className={styles.icons}>
        <div className={styles.notificationIcon} ref={notificationRef}>
          <FontAwesomeIcon icon={faBell} className={styles.icon} onClick={toggleNotification} />
          {isNotificationOpen && (
            <div className={styles.notificationDropdown}>
              <div className={styles.notificationHeader}>
                <h3>Notification</h3>
                <div className={styles.notificationTabs}>
                  <button
                    className={activeNotificationTab === 'all' ? styles.active : ''}
                    onClick={() => setActiveNotificationTab('all')}
                  >
                    All
                  </button>
                  <button
                    className={activeNotificationTab === 'general' ? styles.active : ''}
                    onClick={() => setActiveNotificationTab('general')}
                  >
                    General
                  </button>
                  <button
                    className={activeNotificationTab === 'incoming-orders' ? styles.active : ''}
                    onClick={() => setActiveNotificationTab('incoming-orders')}
                  >
                    <FontAwesomeIcon icon={faFileImport} className={styles.tabIcon} /> Orders
                  </button>
                  <button
                    className={activeNotificationTab === 'outgoing-requests' ? styles.active : ''}
                    onClick={() => setActiveNotificationTab('outgoing-requests')}
                  >
                    <FontAwesomeIcon icon={faFileExport} className={styles.tabIcon} /> Requests
                  </button>
                  <button
                    className={activeNotificationTab === 'chat' ? styles.active : ''}
                    onClick={() => setActiveNotificationTab('chat')}
                  >
                    <FontAwesomeIcon icon={faEnvelope} className={styles.tabIcon} /> Chat
                  </button>
                </div>
              </div>
              <ul className={styles.notificationList}>
                {filteredNotifications().length > 0 ? (
                  filteredNotifications().map(note => (
                    <li key={note.id} className={styles.notificationItem}>
                      <span className={styles.notificationMessage}>{note.message}</span>
                      <span className={styles.notificationTime}>{note.time}</span>
                    </li>
                  ))
                ) : (
                  <li className={styles.notificationItem}>
                    <span className={styles.notificationMessage}>No new notifications.</span>
                  </li>
                )}
              </ul>
              <div className={styles.notificationFooter}>
                <Link href="/notifications">See All</Link>
              </div>
            </div>
          )}
        </div>
        <Link href="/profile">
          <img src="/images/profile.png" alt="Profile" className={styles.profile} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;