"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

function HomePage() {
  return (
    <div className={styles.container}>
      <Navbar />
      <ContentSection />
    </div>
  );
}

function ContentSection() {
  return (
    <div className={styles.content}>
      <div className={styles.textContainer}>
        <h2>Platform for artists and supporters</h2>
        <h1 className={styles.title}>Art Commission</h1>
        <p className={styles.description}>
          สถานที่สำหรับศิลปินและผู้จ้างงานมาใช้คุยสำหรับรายละเอียดต่าง ๆ และยังเป็นคอมมูนิตี้สำหรับการโชว์ผลงาน
        </p>
      </div>
      <div className={styles.imageContainer}>
        <img src="/images/art-bg.png" alt="Art" className={styles.artImage} />
      </div>
    </div>
  );
}

export default HomePage;