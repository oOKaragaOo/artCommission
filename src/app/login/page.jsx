"use client"

import React, {use, useState} from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { signIn } from "next-auth/react";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";


function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {data: session} = useSession();
    const router = useRouter();
    if (session) router.replace("/welcome")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await signIn("credentials", {
                email, password, redirect:false});
            if(res.error) {
                setError("Invalid Credentials");
                return;
            }
            router.replace("/welcome");
        }catch(error){
console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <h3>Register Page</h3>
                <hr className="my-3" />
                <form onSubmit={handleSubmit}>

                    {error && (
                        <div className=" bg-red-500 w-fit text-sm px-2 py-1 text-white   rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    <input onChange={(e)=>setEmail(e.target.value)} className='block bg-gray-300 my-2 rounded-md' type="email" name="email" placeholder="Email" />
                    <input onChange={(e)=>setPassword(e.target.value)} className='block bg-gray-300 my-2 rounded-md' type="password" name="password" placeholder="Password" />

                    <button className='block bg-green-500 p-2 rounded-md text-white'  type="submit">Sign In</button>
                </form>
                <hr className="my-3" />
                <p>Already have an account? go to
                    <Link className='text-blue-500' href="/register">  Register  </Link> Page
                </p>
            </div>
        </div>
    )
}
export default LoginPage;