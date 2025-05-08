"use client";
import { useState } from "react";
import { commentPost, likePost, unlikePost, deletePost } from "@/app/api/route";
import { useRouter } from "next/navigation";
import { getAuthorProfile } from "@/app/api/route";

export default function PostItem({ post, setPosts }) {
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(post.likedByMe || false); // <-- จาก backend
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [shareCount, setShareCount] = useState(post.shareCount);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const result = await commentPost(post.id, commentText.trim());
    if (result.success) {
      setCommentText("");
      window.location.reload();
    } else {
      alert("เกิดข้อผิดพลาด: " + result.error);
    }
  };

  const handleLikeClick = async () => {
    if (liked) {
      const result = await unlikePost(post.postId);
      if (result.success) {
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        alert(result.error);
      }
    } else {
      const result = await likePost(post.postId);
      if (result.success) {
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      } else {
        alert(result.error);
      }
    }
  };

  const handleEditPost = () => {
    alert("คลิกแก้ไขโพสต์");
    // TODO: เปิด modal สำหรับแก้ไขโพสต์
  };

  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmed) return;

    const result = await deletePost(postId);

    if (result?.message === "Post deleted") {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      window.location.reload();
    } else {
      alert(result?.error || "Failed to delete post");
    }
  };

  const handleReportPost = () => {
    alert("รายงานโพสต์เรียบร้อย");
    // TODO: ส่งรายงานโพสต์
  };

  const handleAuthorProfile = async (authorId) => {
    const result = await getAuthorProfile(authorId);
    console.log("Author Profile:", result);

    if (result.error) {
        alert("ไม่สามารถโหลดโปรไฟล์ได้");
    } else {
      router.replace(`/profileauthor?authorId=${authorId}`); // 👈 ไปหน้าโปรไฟล์คนนั้นเลย
    }
};

  return (
    <div className="bg-gray-100 p-4 min-w-190 rounded shadow mb-4 relative">
      {/* หัวโพสต์ */}
      <div
        onClick={() => handleAuthorProfile(post.authorId)}
        className="flex items-center justify-between mb-2 cursor-pointer"
      >
        <div className="flex items-center gap-2">
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

        {/* Kebab button */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="text-2xl stext-gray-600 hover:text-gray-900 px-2 rounded-full"
          >
            ⋮
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
              <button
                onClick={() => {
                  handleEditPost(post.id);
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                ✏️ แก้ไขโพสต์
              </button>
              <button
                onClick={() => {
                  handleDeletePost(post.id); // ✅ ส่ง id เข้าไป
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                🗑️ ลบโพสต์
              </button>
              <button
                onClick={() => {
                  handleReportPost();
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                🚩 รายงานโพสต์
              </button>
            </div>
          )}
        </div>
      </div>

      {/* แคปชันและรูป */}
      <p className="text-sm text-gray-500 mb-2">{post.caption}</p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="post"
          className="h-130 w-full object-cover rounded"
        />
      )}

      {/* ปุ่ม */}
      <div className="flex items-center gap-4 mt-4">
        <button
          className={`px-3 py-1 rounded-full min-w-[60px] flex items-center justify-center ${
            liked ? "bg-red-600 text-white" : "bg-gray-800 text-white"
          }`}
          onClick={handleLikeClick}
        >
          ❤️ {likeCount}
        </button>
        <button className="bg-gray-800 text-white px-3 py-1 rounded-full">
          💬 {post.comments?.length || 0}
        </button>
        <button className="bg-gray-800 text-white px-3 py-1 rounded-full">
          ➥ {shareCount}
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
          className="w-full p-2 rounded-l border text-sm"
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
