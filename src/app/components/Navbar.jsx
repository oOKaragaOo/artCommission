"use client";

import React, {useContext, useState} from "react";
import Link from "next/link";
import SignForm from "./SignForm";
import {SessionContext} from "@/app/api/checkUser/route";

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

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const { sessionUser } = useContext(SessionContext);

    return (
        <>

            <nav className='bg-white text-black p-5'>
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-18 h-18">
          <Link href="/">
            <img src="/images/ArtCommission LOGO_.png" alt="" />
          </Link>
        </div>
        <ul className="flex list-none">
          <li className='mx-3'>
            <Link href="/home">หน้าแรก</Link>
          </li>
          <li className='mx-3'>
            <Link href="/explore">สำรวจ</Link>
          </li>
          <li className='mx-3'>
            <Link href="/artists">นักวาด</Link>
          </li>
          <li className='mx-3'>
            <Link href="/artseek">กระดานจ้างงาน</Link>
          </li>
        </ul>
        <div>

                            {sessionUser ? (
                                <>
                                <ul className ="flex list-none" >  
                                        <Link
                                            href="/profile"
                                            className="text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer"
                                        >
                                            Profile
                                        </Link>

                                        <button
                                            onClick={Logout}
                                            className="text-white bg-gradient-to-r from-red-400 via-red-500   to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer"
                                        >
                                            Log-Out
                                        </button>

                                </ul>  
                                </>
                            ) : ( <>
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
            </nav>

            {/* Popup Modal */}
            <SignForm isOpen={isOpen} setIsOpen={setIsOpen} isLogin={isLogin} />

            </>          
    );
}

export default Navbar;
