// app/profile/page.jsx
"use client"
// import ProfileCard from "@/app/components/ProfileCard";
import PostUpload from "@/app/components/PostUpload";
import ProfileFeed from "@/app/components/ProfileFeed";
import Navbar from "@/app/components/Navbar";
import React, {useEffect, useState} from "react";
import {checkSession} from "@/app/api/route";



export default function ProfilePage() {
    const [sessionUser, setSessionUser] = useState(null);
    useEffect(() => {
        const fetchSession = async () => {
            await checkSession(setSessionUser);
        };
        fetchSession();
    }, []);

    // const user = {
    //     name: "Name",
    //     role: 0,
    //     // followers: 0,
    //     // followings: 0,
    //     // details: "Details",
    // };

    const posts = [
        { name: "NAME ARTIST", time: "2 days ago", account: "Account" },
        { name: "NAME ARTIST", time: "4 days ago", account: "Account" }
    ];

    const handleNewPost = () => {
        console.log("Post clicked");
    };

    return (
        <div>
            <Navbar session={sessionUser} />
            <div className="max-w-3xl mx-auto p-4">
                {/*<ProfileCard user={sessionUser} />*/}
                <div className="bg-gray-100 rounded-lg p-4 shadow mb-4 flex justify-between items-start">
                    <div>
                        <h1 className="text-xl font-semibold">{sessionUser ? sessionUser.name : 'Guest'}</h1>
                        <p className="text-sm text-gray-600">Role: { sessionUser ? sessionUser.role : 'none'} </p>
                        {/*<p className="mt-2 text-gray-700">{user.details}</p>*/}
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-gray-200 text-sm px-3 py-1 rounded">Add Cover</button>
                        <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded">Edit Profile</button>
                    </div>
                </div>
                <PostUpload onPost={handleNewPost} />
                <ProfileFeed posts={posts} />
                {/*<div></div>*/}
            </div>
        </div>

    );
}