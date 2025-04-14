"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import Link from 'next/link'; // เพิ่ม import Link

function HomePage() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h2>Platform for artists and supporters</h2>
          <h1 className={styles.title}>Art Commission</h1>
          <p className={styles.description}>
            สถานที่สำหรับศิลปินและผู้จ้างงานมาใช้คุยสำหรับรายละเอียดต่าง ๆ และยังเป็นคอมมูนิตี้สำหรับการโชว์ผลงาน
          </p>
          <Link href="/register" className={styles.signupButton}> {/* เปลี่ยน button เป็น Link */}
            Sign Up
          </Link>
        </div>
        <div className={styles.imageContainer}>
          <img src="/images/art-bg.png" alt="Art" className={styles.artImage} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;