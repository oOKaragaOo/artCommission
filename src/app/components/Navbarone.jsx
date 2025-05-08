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
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setIsNotificationOpen(false);
        }
    };

    useEffect(() => {
        if (isNotificationOpen) {
            fetchNotifications();
        }
    }, [isNotificationOpen]);

    const fetchNotifications = async () => {
        try {
            const res = await fetch("http://localhost:8080/notifications", {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch notifications");
            }
            const data = await res.json();
            console.log("📩 Notifications:", data);
            setNotifications(data.notifications);
            setUnreadCount(data.unreadCount);
        } catch (error) { // Changed 'err' to 'error' for clarity
            console.error("Error fetching notifications:", error); // More descriptive error message
        }
    };

    const filteredNotifications = () => {
        if (activeNotificationTab === "all") {
            return notifications;
        }
        return notifications.filter((note) => note.type === activeNotificationTab);
    };

    useEffect(() => {
        const handleMouseDown = (event) => handleClickOutside(event); // Create a named handler

        document.addEventListener("mousedown", handleMouseDown);

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, [notificationRef]);

    return (
        <div className={styles.header}>
            <Logo />
            <SearchBar />
            <Icons
                isNotificationOpen={isNotificationOpen}
                toggleNotification={toggleNotification}
                notificationRef={notificationRef}
                activeNotificationTab={activeNotificationTab}
                setActiveNotificationTab={setActiveNotificationTab}
                filteredNotifications={filteredNotifications}
            />
        </div>
    );
};

const Logo = () => (
    <div className={styles.logo}>
        <Link href="/">
            <img src="/images/ArtCommission LOGO_.png" alt="Art Commission Logo" />  {/* Added alt text */}
        </Link>
    </div>
);

const SearchBar = () => (
    <div className={styles.searchBar}>
        <input type="text" placeholder="Search..." />
    </div>
);

const Icons = ({
    isNotificationOpen,
    toggleNotification,
    notificationRef,
    activeNotificationTab,
    setActiveNotificationTab,
    filteredNotifications,
}) => (
    <div className={styles.icons}>
        <NotificationIcon
            isOpen={isNotificationOpen}
            onToggle={toggleNotification}
            notificationRef={notificationRef}
            activeTab={activeNotificationTab}
            setActiveTab={setActiveNotificationTab}
            notifications={filteredNotifications()}
        />
        <ProfileIcon />
    </div>
);

const NotificationIcon = ({
    isOpen,
    onToggle,
    notificationRef,
    activeTab,
    setActiveTab,
    notifications,
}) => (
    <div className={styles.notificationIcon} ref={notificationRef}>
        <FontAwesomeIcon icon={faBell} className={styles.icon} onClick={onToggle} />
        {isOpen && (
            <div className={styles.notificationDropdown}>
                <NotificationHeader activeTab={activeTab} setActiveTab={setActiveTab} />
                <NotificationList notifications={notifications} />
                <NotificationFooter />
            </div>
        )}
    </div>
);

const NotificationHeader = ({ activeTab, setActiveTab }) => (
    <div className={styles.notificationHeader}>
        <h3>Notification</h3>
        <div className={styles.notificationTabs}>
            <TabButton
                label="All"
                type="all"
                activeTab={activeTab}
                onClick={setActiveTab}
            />
            <TabButton
                label="General"
                type="general"
                activeTab={activeTab}
                onClick={setActiveTab}
            />
            <TabButton
                label="Orders"
                type="incoming-orders"
                activeTab={activeTab}
                onClick={setActiveTab}
                icon={faFileImport}
            />
            <TabButton
                label="Requests"
                type="outgoing-requests"
                activeTab={activeTab}
                onClick={setActiveTab}
                icon={faFileExport}
            />
            <TabButton
                label="Chat"
                type="chat"
                activeTab={activeTab}
                onClick={setActiveTab}
                icon={faEnvelope}
            />
        </div>
    </div>
);

const TabButton = ({ label, type, activeTab, onClick, icon }) => (
    <button
        className={activeTab === type ? styles.active : ""}
        onClick={() => onClick(type)}
    >
        {icon && <FontAwesomeIcon icon={icon} className={styles.tabIcon} />} {label}
    </button>
);

const NotificationList = ({ notifications }) => (
    <ul className={styles.notificationList}>
        {notifications.length > 0 ? (
            notifications.map((note) => (
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
);

const NotificationFooter = () => (
    <div className={styles.notificationFooter}>
        <Link href="/notifications">See All</Link>
    </div>
);

const ProfileIcon = () => (
    <Link href="/profile">
        <img src="/images/profile.png" alt="Profile" className={styles.profile} />
    </Link>
);

export default Navbar;