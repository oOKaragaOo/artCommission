"use client"

import React from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";

const WelcomePage =()=>{

    const {data:session}=useSession();
    console.log(session);
    if(!session)  redirect("/login");
    return (
        <div>
            <Navbar session={session} />
            <div className="container mx-auto my-3">
                <h3>Welcome {session?.user?.name}</h3>
                <p className="lead"> Email : {session?.user?.email} </p>
                <hr className='my-2'/>
                <p>Lorem ipsum sit amen </p>
            </div>
        </div>
    )
}
export default WelcomePage;