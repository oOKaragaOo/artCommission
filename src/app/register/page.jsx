"use client"

import React, {use, useState} from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";



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
            setError("Username already exists");
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
        }else {
            console.log(" User registration failed ");
        }

    }catch(err){
        console.log("Error during register",err);
    }};

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <h3>Register Page</h3>
                <hr className="my-3" />


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
                <form onSubmit={handleSubmit}>
                    <input onChange={(e) => setName(e.target.value)} className='block bg-gray-300 my-2 rounded-md' type="text" name="username" placeholder="Username" />
                    <input onChange={(e) => setEmail(e.target.value)} className='block bg-gray-300 my-2 rounded-md' type="email" name="email" placeholder="Email" />
                    <input onChange={(e) => setPassword(e.target.value)} className='block bg-gray-300 my-2 rounded-md' type="password" name="password" placeholder="Password" />
                    <input onChange={(e) => setconfPassword(e.target.value)} className='block bg-gray-300 my-2 rounded-md' type="password" name="confirm_password" placeholder="Confirm Password" />
                    <button className='block bg-green-500 p-2 rounded-md text-white'  type="submit">Sign Up</button>
                </form>
                <hr className="my-3" />
                <p>Already have an account? go to
                    <Link className='text-blue-500' href="/login">  Log In  </Link> Page
                </p>
            </div>
        </div>
    )
}
export default Register;