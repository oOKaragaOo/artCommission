"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Invalid Credentials");
                return;
            }

            // เก็บ Token หรือ Session ตามที่ต้องการ
            localStorage.setItem("userId", data.userId);
            router.replace("/welcome");
        } catch (error) {
            console.error(error);
            setError("Something went wrong!");
        }
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
