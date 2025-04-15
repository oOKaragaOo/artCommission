"use client";

import React, { useEffect, useState } from "react";
import SignForm from "./SignForm";
import { checkSession } from '../api/route';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [sessionUser, setSessionUser] = useState(null); // ✅ session
    useEffect(() => {
        const fetchSession = async () => {
            await checkSession(setSessionUser);
        };
        fetchSession();
    }, []);
    
    const Logout = async () => {
      try {
          const res = await fetch("http://localhost:8080/auth/logout", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              credentials: "include",
          });
  
          if (res.ok) {
              window.location.href = "/";
          } else {
              console.log("Logout failed");
          }
      } catch (err) {
          console.error("Logout error:", err);
      }
  };

  return (
    <div className={styles.content}>
      <div className={styles.sidebar}>
        <ul>
          <li>
            <Link href="/explore">สำรวจ</Link>
          </li>
          <li>
            <Link href="/artists">นักวาด</Link>
          </li>
          <li>
            <Link href="/artseek">กระดานจ้างงาน</Link>
          </li>
          <li>
            <Link href="/marketplace">ตลาดซื้อขาย/ประมูล</Link>
          </li>
          <li>
            <Link href="/categories">Categories</Link>
          </li>
          <li>
            <Link href="/home">หน้าแรก</Link>
          </li>
          <li>
            <Link href="/following">กำลังติดตาม</Link>
          </li>
          <li>
            <Link href="/works">ผลงาน</Link>
          </li>
          <li>
            <Link href="/recommended-artists">นักวาดแนะนำ</Link>
          </li>
        </ul>
        <div className={styles.auth}>
          {sessionUser ? (
            <>
              <p>{sessionUser.name}</p>
              <button
                onClick={Logout}
                className="text-white bg-gradient-to-r from-red-400 via-red-500   to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer"
              >
                Log-Out
              </button>
            </>
        ) : ( 
          <>
              <button
                onClick={() => {
                    setIsLogin(true);
                    setIsOpen(true);
                }}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer"
              >
                Sign In
              </button>
          </>
        )}
        </div>
      </div>
      <SignForm isOpen={isOpen} setIsOpen={setIsOpen} isLogin={isLogin} />
    </div>
  );
};

export default Sidebar;