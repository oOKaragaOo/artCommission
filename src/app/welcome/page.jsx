"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { SessionContext } from "@/app/api/checkUser/route";

const WelcomePage = () => {
    const { sessionUser } = useContext(SessionContext);
    const router = useRouter();

    useEffect(() => {
        // ถ้าโหลดเสร็จแล้วแต่ไม่มี session -> redirect
        if (sessionUser === null) {
            router.replace("/");
        }
    }, [sessionUser, router]);

    // ยังโหลด session อยู่
    if (sessionUser === undefined) return <p>Loading...</p>;

    return (
        <div>
            <Navbar />
            <div className="container mx-auto my-3">
                <h3>Welcome : {sessionUser ? sessionUser.name : 'Guest'} </h3>
                <p className="lead">Email: {sessionUser ? sessionUser.email : 'Not available'}</p>
                <hr className="my-2" />
                <p>Lorem ipsum sit amen</p>
            </div>
        </div>
    );
};

export default WelcomePage;
