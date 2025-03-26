"use client"

import React, {use, useState} from "react";

import {signIn, useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {router} from "next/client";



function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setconfPassword] = useState("");
    const [error, setError] = useState("");

    const [success, setSuccess] = useState(" ");

    const {data: session} = useSession();
    if (session) redirect("/welcome");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confPassword){
            setError("Passwords don't match");
            return;
        }

        if(!name || !email || !password || !confPassword){
            setError("Please complete all fields");
        }

    try {

        const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        })

        const {user} = await resCheckUser.json();
        if(user){
            setError("Email already exists");
            return;
        }
        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,email,password
            })
        })
        if (res.ok){
            const form = e.target;
            setError(" ");
            setSuccess(" User registered successfully. ");
            form.reset();

            e.preventDefault();
            try{
                const res = await signIn("credentials", {
                    email, password, redirect:false});
                if(res.error) {
                    setError("Invalid Credentials");
                    return;
                }
                await router.replace("/welcome");
            }catch(error){
                console.log(error);
            }

        }else {
            console.log(" User registration failed ");
        }

    }catch(err){
        console.log("Error during register",err);
    }};

    return (
            <div className="container mx-auto">

                    {error && (
                        <div className=" bg-red-600 w-fit text-sm px-2 py-1 text-white   rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className=" bg-green-400 w-fit text-sm text-white   rounded-md mt-2">
                            {success}
                        </div>
                    )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input onChange={(e) => setName(e.target.value)} type="name" placeholder="Name" required className="w-full p-2 border rounded-md" />
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" required className="w-full p-2 border rounded-md" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full p-2 border rounded-md" />
                    <input onChange={(e) => setconfPassword(e.target.value)} type="password" placeholder="Confirm Password" required className="w-full p-2 border rounded-md" />

                    <button className="w-full p-2 bg-green-500 text-white rounded-md">Signup</button>
                </form>

            </div>

    )
}
export default Register;