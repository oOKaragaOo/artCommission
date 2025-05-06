"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {checkSession, getProfile, loginUser} from "@/app/api/route";
import { SessionContext } from "@/app/api/checkUser/route";
function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { setSessionUser } = useContext(SessionContext); // ✅


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const result = await loginUser(email, password);
        if (result.error) {
            setError(result.error);
            return;
        }

        await checkSession(setSessionUser);// ✅ After login

        localStorage.setItem("userId", result.userId || "guest");

        router.replace("/explore");

    };

    return (
        <div>
            <div className="container mx-auto">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500 w-fit text-sm px-2 py-1 text-white rounded-md mt-2">
                            {error}
                        </div>
                    )}
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" required className="w-full p-2 border rounded-md" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full p-2 border rounded-md" />
                    <button className="w-full p-2 bg-blue-500 text-white rounded-md my-4" type="submit">Login</button>
                </form>
            </div>
            <Link className="text-blue-500" href="/register">Forget password</Link>
        </div>
    );
}

export default LoginPage;
