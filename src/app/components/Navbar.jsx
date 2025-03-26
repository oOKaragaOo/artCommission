"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import SignForm from "./SignForm";

function Navbar({ session }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <nav className="bg-[#333] text-white p-5">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <Link href="/">Art Commission</Link>
                        </div>
                        <ul className="flex list-none">
                            {!session ? (
                                <>
                                    <li className="mx-3">
                                        <button
                                            onClick={() => {
                                                setIsLogin(true);
                                                setIsOpen(true);
                                            }}
                                        >
                                            Sign In
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="mx-3">
                                        <Link href="/welcome" className="text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer">
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="mx-3">
                                        <a
                                            onClick={() => signOut()}
                                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer"
                                        >
                                            Log-Out
                                        </a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Popup Modal */}
            <SignForm isOpen={isOpen} setIsOpen={setIsOpen} isLogin={isLogin} />
        </>
    );
}

export default Navbar;
