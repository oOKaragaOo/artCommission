"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerNewUser } from '../api/route';

function Register() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setconfPassword] = useState("");
    const [role, setRole] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const result = await registerNewUser(name, email, password, confPassword, role); // ✅ Register
        if (result.error) {
            setError(result.error);
            return;
        }
        setSuccess("User registered successfully.");
        e.target.reset();

        setTimeout(() => {
            router.replace("/welcome");
        }, 1000);
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
