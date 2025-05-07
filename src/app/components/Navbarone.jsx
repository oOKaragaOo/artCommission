import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/Navbarone.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faFileImport,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeNotificationTab, setActiveNotificationTab] = useState("all");

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setIsNotificationOpen(false);
    }
  };

  //Notification ดึงข้อมูลเมื่อเปิด dropdown
  useEffect(() => {
    if (isNotificationOpen) {
      fetchNotifications();
    }
  }, [isNotificationOpen]);

  //สร้างฟังก์ชัน
  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:8080/notifications", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch notifications");
      const data = await res.json();
      console.log("📩 Notifications:", data);
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (err) {
      console.error(err);
    }
  };

  //ฟิลเตอร์
  const filteredNotifications = () => {
    if (activeNotificationTab === "all") {
      return notifications;
    }
    return notifications.filter((note) => note.type === activeNotificationTab);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);
  
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <img src="/images/ArtCommission LOGO_.png" alt="" />
        </Link>
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search..." />
      </div>
      <div className={styles.icons}>
        <div className={styles.notificationIcon} ref={notificationRef}>
          <FontAwesomeIcon
            icon={faBell}
            className={styles.icon}
            onClick={toggleNotification}
          />
          {isNotificationOpen && (
            <div className={styles.notificationDropdown}>
              <div className={styles.notificationHeader}>
                <h3>Notification</h3>
                <div className={styles.notificationTabs}>
                  <button
                    className={
                      activeNotificationTab === "all" ? styles.active : ""
                    }
                    onClick={() => setActiveNotificationTab("all")}
                  >
                    All
                  </button>
                  <button
                    className={
                      activeNotificationTab === "general" ? styles.active : ""
                    }
                    onClick={() => setActiveNotificationTab("general")}
                  >
                    General
                  </button>
                  <button
                    className={
                      activeNotificationTab === "incoming-orders"
                        ? styles.active
                        : ""
                    }
                    onClick={() => setActiveNotificationTab("incoming-orders")}
                  >
                    <FontAwesomeIcon
                      icon={faFileImport}
                      className={styles.tabIcon}
                    />{" "}
                    Orders
                  </button>
                  <button
                    className={
                      activeNotificationTab === "outgoing-requests"
                        ? styles.active
                        : ""
                    }
                    onClick={() =>
                      setActiveNotificationTab("outgoing-requests")
                    }
                  >
                    <FontAwesomeIcon
                      icon={faFileExport}
                      className={styles.tabIcon}
                    />{" "}
                    Requests
                  </button>
                  <button
                    className={
                      activeNotificationTab === "chat" ? styles.active : ""
                    }
                    onClick={() => setActiveNotificationTab("chat")}
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className={styles.tabIcon}
                    />{" "}
                    Chat
                  </button>
                </div>
              </div>
              <ul className={styles.notificationList}>
                {filteredNotifications().length > 0 ? (
                  filteredNotifications().map((note) => (
                    <li key={note.id} className={styles.notificationItem}>
                      <span className={styles.notificationMessage}>
                        {note.message}
                      </span>
                      <span className={styles.notificationTime}>
                        {note.time}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className={styles.notificationItem}>
                    <span className={styles.notificationMessage}>
                      No new notifications.
                    </span>
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
          <img
            src="/images/profile.png"
            alt="Profile"
            className={styles.profile}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
