// app/profile/page.jsx
"use client"
import PostUpload from "@/app/components/PostUpload";
import ProfileFeed from "@/app/components/ProfileFeed";
import Navbar from "@/app/components/Navbar";
import React, {useContext, useState} from "react";
import ProfileForm from "../components/ProfileForm";
import {SessionContext} from "@/app/api/checkUser/route";

export default function ProfilePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const { sessionUser } = useContext(SessionContext);

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
                        <button
                            onClick={() => {
                                 setIsLogin(true);
                                 setIsOpen(true);}}
                            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer">
                                Edit Profile</button>
                    </div>
                </div>
                <PostUpload onPost={handleNewPost} />
                <ProfileFeed posts={posts} />
                <ProfileForm isOpen={isOpen} setIsOpen={setIsOpen} isLogin={isLogin} />
                {/*<div></div>*/}
            </div>
        </div>

    );
}