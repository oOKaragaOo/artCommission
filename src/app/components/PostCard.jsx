"use client";
import { useState } from "react";
import { commentPost } from "@/app/api/route";

export default function PostItem({ post }) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const result = await commentPost(post.id, commentText.trim());
    if (result.success) {
      setCommentText("");
      window.location.reload();
      // หากต้องการ refresh comment ก็ใส่ callback มาเพิ่มได้
    } else {
      alert("เกิดข้อผิดพลาด: " + result.error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow mb-4">
      {/* หัวโพสต์ */}
      <div className="flex items-center gap-2 mb-2">
        <img
          src={post.authorProfile || "/default-avatar.png"}
          className="w-8 h-8 rounded-full object-cover"
          alt="author"
        />
        <div>
          <p className="font-semibold text-gray-800">{post.authorName}</p>
          <p className="text-sm text-gray-400">{post.createdAt}</p>
        </div>
      </div>

      {/* แคปชันและรูป */}
      <p className="text-sm text-gray-500 mb-2">{post.caption}</p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="post"
          className="h-60 w-full object-cover rounded"
        />
      )}

      {/* ปุ่ม */}
      <div className="flex items-center gap-4 mt-4">
        <button className="bg-gray-800 text-white px-3 py-1 rounded-full">
          ❤️ {post.likeCount || 0}
        </button>
        <button className="bg-gray-800 text-white px-3 py-1 rounded-full">
          💬 {post.comments?.length || 0}
        </button>
      </div>

      {/* คอมเมนต์ */}
      <div className="mt-4 space-y-2">
        {post.comments?.map((cmt, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <img
              src={cmt.profilePicture || "/default-avatar.png"}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{cmt.name}</p>
              <p className="text-sm">{cmt.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ช่อง comment */}
      <form onSubmit={handleSubmit} className="flex mt-4">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="แสดงความคิดเห็น..."
          className="w-full p-2 rounded-l bg-amber-200 text-sm"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 rounded-r hover:bg-gray-800"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
