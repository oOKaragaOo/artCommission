import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

const Navbar = () => {

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
        <img
          src="/images/notification.png"
          alt="Notification"
          className={styles.notification}
        />
        <Link href="/profile">
          <img src="/images/profile.png" alt="Profile" className={styles.profile} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;