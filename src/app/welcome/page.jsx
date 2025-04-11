"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const WelcomePage = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch("http://localhost:8080/auth/session", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!res.ok) {
                    console.log(res+"application/json");
                    router.replace("/");
                    return;
                }

                const data = await res.json();
                setSession(data);
            } catch (err) {
                console.error("Session check failed", err);
                router.replace("/login");
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, [router]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <Navbar session={session} />
            <div className="container mx-auto my-3">
                <h3>Welcome {session?.user?.name}</h3>
                <p className="lead">Email: {session?.user?.email}</p>
                <hr className="my-2" />
                <p>Lorem ipsum sit amen</p>
            </div>
        </div>
    );
};

export default WelcomePage;
