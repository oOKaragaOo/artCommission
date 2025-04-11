"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { checkSession } from "@/app/api/route";

const WelcomePage = () => {
    const [sessionUser, setSessionUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const verifySession = async () => {
            await checkSession(setSessionUser); //
            setLoading(false); //
        };

        verifySession(); //
    }, []);

    useEffect(() => {
        if (!loading) {
            if (!sessionUser) {
                router.replace("/login");
            }
        }
    }, [loading, sessionUser, router]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <Navbar session={sessionUser} />
            <div className="container mx-auto my-3">
                <h3>Welcome, {sessionUser ? sessionUser.name : 'Guest'}!</h3>
                <p className="lead">Email: {sessionUser ? sessionUser.email : 'Not available'}</p>
                <hr className="my-2" />
                <p>Lorem ipsum sit amen</p>
            </div>
        </div>
    );
};

export default WelcomePage;