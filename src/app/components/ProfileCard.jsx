// components/ProfileCard.jsx
"use client"
import {useState} from "react";
const [sessionUser] = useState(null);

export default function ProfileCard({ user={sessionUser} }) {
    return (
        <div className="bg-gray-100 rounded-lg p-4 shadow mb-4 flex justify-between items-start">
            <div>
                <h1 className="text-xl font-semibold">{user.name}</h1>
                <p className="text-sm text-gray-600">Role: {user.role} </p>
                {/*<p className="mt-2 text-gray-700">{user.details}</p>*/}
            </div>
            <div className="flex gap-2">
                <button className="bg-gray-200 text-sm px-3 py-1 rounded">Add Cover</button>
                <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded">Edit Profile</button>
            </div>
        </div>
    );
}