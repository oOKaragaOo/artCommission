"use client"

import React, {useEffect, useState} from "react";
import { signIn } from "next-auth/react";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

function LoginPage( ) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {data: session} = useSession();
    const router = useRouter();

    useEffect(()=>{
            if(session){
                router.replace("/welcome");
            }
        },
        [session])

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
            <div className="container mx-auto">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && (
                        <div className=" bg-red-500 w-fit text-sm px-2 py-1 text-white   rounded-md mt-2">
                            {error}
                        </div>
                    )}
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email Address" required className="w-full p-2 border rounded-md" />
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full p-2 border rounded-md" />
                    <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit" >Login</button>

                    {/*<input onChange={(e)=>setEmail(e.target.value)} className='block bg-gray-300 my-2 rounded-md' type="email" name="email" placeholder="Email" />*/}
                    {/*<input onChange={(e)=>setPassword(e.target.value)} className='block bg-gray-300 my-2 rounded-md' type="password" name="password" placeholder="Password" />*/}
                    {/*<button className='block bg-green-500 p-2 rounded-md text-white'  type="submit">Sign In</button>*/}
                </form>
            </div>
        </div>
    )
}
export default LoginPage;