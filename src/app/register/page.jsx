"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ แทน import ผิดจาก next/client

function Register() {
    const router = useRouter(); // ✅ ใช้ router ได้หลังเปลี่ยน import
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setconfPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confPassword) {
            setError("Passwords don't match");
            return;
        }

        if (!name || !email || !password || !confPassword || !role) {
            setError("Please complete all fields");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // เผื่อมี cookie session ฝั่ง spring
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role,
                }),
            });

            const data = await res.json();

            if (res.status === 409) {
                setError("Email already exists");
                return;
            }

            if (!res.ok) {
                setError(data.message || "User registration failed");
                return;
            }

            setError("");
            setSuccess("User registered successfully.");
            e.target.reset();

            // ✅ ไปหน้า welcome หลังสมัคร
            setTimeout(() => {
                router.replace("/welcome");
            }, 1000);

        } catch (err) {
            console.log("Error during register", err);
            setError("Something went wrong.");
        }
    };

    return (
        <div className="container mx-auto">
            {error && (
                <div className="bg-red-600 w-fit text-sm px-2 py-1 text-white rounded-md mt-2">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-400 w-fit text-sm text-white rounded-md mt-2">
                    {success}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" required className="w-full p-2 border rounded-md" />
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" required className="w-full p-2 border rounded-md" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full p-2 border rounded-md" />
                <input onChange={(e) => setconfPassword(e.target.value)} type="password" placeholder="Confirm Password" required className="w-full p-2 border rounded-md" />
                <input onChange={(e) => setRole(e.target.value)} type="text" placeholder="Who you are?" required className="w-full p-2 border rounded-md" />
                <button className="w-full p-2 bg-green-500 text-white rounded-md">Signup</button>
            </form>
        </div>
    );
}

export default Register;
