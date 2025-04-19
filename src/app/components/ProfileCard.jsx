"use client";

export default function ProfileCard({ userData, error }) {

    return (
        <div className="bg-gray-100 rounded-lg p-4 shadow mb-4 flex justify-between items-start">
            {error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : userData ? (
                <div>
                    <div>
                        {/* ใช้ข้อมูลจาก userData */}
                        <div>
                        </div>
                        <h1 className="text-xl font-semibold">{userData["name"] || "Guest"}</h1>
                        <p className="text-sm text-gray-600">Email: {userData["email"] || "Not available"}</p>
                        <p className="text-sm text-gray-600">Role: {userData["role"] || "none"}</p>
                        <p className="text-sm text-gray-600">
                            Commission Status: { userData["commission_status"] || "none" }
                        </p>
                        <p className="text-sm text-gray-600">Status: {userData["status"] || "unknown"}</p>
                        <p className="text-sm text-gray-600">
                            Followers: {userData["followerCount"] || 0}
                        </p>
                        {userData.description && (
                            <p className="text-sm text-gray-700">Description: {userData.description}</p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-gray-200 text-sm px-3 py-1 rounded">Add Cover</button>
                        <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded">Edit Profile</button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

