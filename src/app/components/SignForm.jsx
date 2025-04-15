"use client";


import { motion } from "framer-motion";
import React, {useEffect, useState} from "react";
import Register from "@/app/register/page";
import LoginPage from "@/app/login/page";

export default function SignForm({ isOpen, setIsOpen}) {
    const [isLogin, setIsLogin] = useState(true);
    if (!isOpen) return null;
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center  bg-black/50  z-999">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white p-6 rounded-lg shadow-lg w-96"
                    >
                        {/* Header */}
                        <div className="flex justify-between mb-4">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`w-1/2 p-2 ${
                                    isLogin ? "border-b-2 border-blue-500 font-bold" : ""
                                }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`w-1/2 p-2 ${
                                    !isLogin ? "border-b-2 border-blue-500 font-bold" : ""
                                }`}
                            >
                                Signup
                            </button>
                        </div>

                        {/* Form */}
                        {isLogin ? (
                            <LoginPage/>
                        ) : (
                            <Register/>
                        )}

                        {/* ปุ่มปิด Modal */}
                        <button
                            className="mt-4 w-full p-2 bg-gray-300 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </button>
                    </motion.div>
                </div>
            )}
        </>
    );
}
