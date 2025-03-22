"use client"


import React from 'react';
import Link from "next/link";
import {signOut} from "next-auth/react";
function Navbar({session}) {

    return (
        <nav className='bg-[#333] text-white p-5'>
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <Link href="/">NextAuth</Link>
                    </div>
                    <ul className="flex list-none">
                        {!session ? (
                            <>
                                <li className='mx-3'><Link href="/login">Sign In</Link></li>
                                <li className='mx-3'><Link href="/register">Sign Up</Link></li>
                            </>
                        ):(
                            <li className='mx-3'><a onClick={()=> signOut()} className='bg-red-500 cursor-pointer text-white border px-2 py-2 rounded-md text-lg my-2'>Log Out</a></li>

                        )}

                    </ul>
                </div >
            </div>
        </nav>
    )
}
export default Navbar