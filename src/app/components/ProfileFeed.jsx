"use client";
import { commentPost } from "@/app/api/route";
import { useState } from "react";

export default function ProfileFeed({ posts }) {
  const [commentTexts, setCommentTexts] = useState({}); // ใช้เก็บคอมเมนต์แยก postId

  const handleSubmit = async (e, postId) => {
    e.preventDefault();
    const text = commentTexts[postId]?.trim();
    if (!text) return;

    const result = await commentPost(postId, text);
    if (result.success) {
      alert("คอมเมนต์เรียบร้อยแล้ว!");
      setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
    } else {
      alert("เกิดข้อผิดพลาด: " + result.error);
    }
  };

  return (
    <div className="space-y-4">
      {posts.map((post, idx) => (
        <div key={idx} className="bg-gray-100 p-4 rounded shadow">
          {/* หัวโพสต์ */}
          <div className="flex items-center gap-2 mb-2">
            <img
              src={post.profile_picture || "/default-avatar.png"}
              alt="Author"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-800">{post.name || "Unknown"}</p>
              <p className="text-sm text-gray-400">{post.createdAt}</p>
            </div>
          </div>

          {/* แคปชันโพสต์ */}
          <p className="text-sm text-gray-500 mb-2">{post.caption}</p>

          {/* รูปภาพ */}
          {post.imageUrl?.trim() && (
            <div>
              <img
                src={post.imageUrl}
                alt="Post"
                className="h-60 w-full object-cover rounded"
              />

              {/* ปุ่ม Like / Comment / Share */}
              <div className="flex items-center gap-4 mt-4">
                <button className="flex items-center bg-gray-800 text-white px-3 py-1 rounded-full shadow hover:bg-red-600 transition">
                  <span className="text-xl mr-2">❤️</span>
                  <span className="text-sm font-bold">{post.likeCount || 0}</span>
                </button>

                <button className="flex items-center bg-gray-800 text-white px-3 py-1 rounded-full shadow hover:bg-blue-600 transition">
                  <span className="text-xl mr-2">💬</span>
                  <span className="text-sm font-bold">
                    {post.comments?.length || 0}
                  </span>
                </button>

                <button className="flex items-center bg-gray-800 text-yellow-400 px-3 py-1 rounded-full shadow hover:bg-yellow-500 hover:text-black transition">
                  <span className="text-xl mr-2">➤</span>
                  <span className="text-sm font-semibold">Share</span>
                </button>
              </div>
            </div>
          )}

          {/* Comments */}
          {post.comments?.length > 0 && (
            <div className="mt-4 space-y-2">
              {post.comments.map((comment, commentIdx) => (
                <div key={commentIdx} className="flex items-start gap-2">
                  <img
                    src={comment.profilePicture || "/default-avatar.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-800 font-semibold">
                      {comment.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Form คอมเมนต์ */}
          <form onSubmit={(e) => handleSubmit(e, post.id)} className="flex mt-4">
            <input
              value={commentTexts[post.id] || ""}
              onChange={(e) =>
                setCommentTexts((prev) => ({
                  ...prev,
                  [post.id]: e.target.value,
                }))
              }
              placeholder={
                post.comments?.length
                  ? "แสดงความคิดเห็นเพิ่มเติม..."
                  : "คุณคือคนแรกที่คอมเมนต์!"
              }
              className="text-sm text-gray-600 bg-amber-200 w-full p-2 rounded-l"
            />
            <button
              type="submit"
              className="text-sm text-white bg-black px-4 rounded-r hover:bg-gray-800 transition"
            >
              ➤
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
