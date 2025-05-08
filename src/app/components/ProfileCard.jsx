"use client";
import { useState } from "react";

export default function ProfileCard({ userData, onEditClick, isOwnProfile }) {
  const [isFollowing, setIsFollowing] = useState(false); // สถานะ follow/unfollow
  const [loading, setLoading] = useState(false);
  console.log("111",userData);

  const handleFollow = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/user/${userData.user_id}/follow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        setIsFollowing(true);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error following user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/user/${userData.user_id}/unfollow`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        setIsFollowing(false);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gray-100 min-w-190 rounded-lg shadow mb-4 overflow-hidden">
      {/* Cover Background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gray-500 z-0" />

      {/* Content */}
      <div className="relative z-10 px-6 pt-20 pb-4">
        <div className="flex items-start">
          {/* Avatar */}
          <div className="w-30 h-25 rounded-full bg-black flex items-center justify-center border-4 border-white shadow overflow-hidden">
            <img
              src={userData?.profile_picture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="ml-4 mt-14 text-gray-800 w-full">
            {/* Name + Button */}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">
                {userData?.name || "Guest"}
              </h1>

              {isOwnProfile ? (
                <button
                  onClick={onEditClick}
                  className="flex items-center text-black text-sm px-3 py-1 border border-gray-500 rounded hover:bg-gray-200 transition"
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <button
                  onClick={isFollowing ? handleUnfollow : handleFollow}
                  disabled={loading}
                  className={`flex items-center text-sm px-3 py-1 border rounded transition ${
                    isFollowing
                      ? "border-red-400 text-red-500 hover:bg-red-100"
                      : "text-black border-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {loading
                    ? "Loading..."
                    : isFollowing
                    ? "Unfollow"
                    : "Follow"}
                </button>
              )}
            </div>

            {/* Role + Followers */}
            <p className="text-sm text-gray-600">
              <span>Role: {userData?.role || "none"}</span>
              <span className="ml-2">
                Followers: {userData?.followerCount || 0}
              </span>
            </p>

            {userData?.description && (
              <p className="text-sm text-gray-700 mt-1">
                {userData?.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
