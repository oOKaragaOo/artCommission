// components/ProfileFeed.jsx
"use client";

export default function ProfileFeed({ posts }) {
  return (
    <div className="space-y-4">
      {posts.map((post, idx) => (
        <div key={idx} className="bg-gray-100 p-4 rounded shadow">
          {/* หัวโพสต์ */}
          <div className="flex items-center gap-2 mb-2">
            {/* รูปโปรไฟล์ผู้โพสต์ */}
            <img
              src={post["profile_picture"] || "/default-avatar.png"} // fallback ถ้าไม่มีรูป
              alt="Author"
              className="w-8 h-8 rounded-full object-cover"
            />

            {/* ชื่อและเวลา */}
            <div>
              <p className="font-semibold text-gray-800">
                {post.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-400">{post.createdAt}</p>
            </div>
          </div>

          {/* แคปชันโพสต์ */}
          <p className="text-sm text-gray-500 mb-2">{post["caption"]}</p>

          {/* รูปภาพ */}
          {post["imageUrl"] && post["imageUrl"].trim() !== "" && (
            <div>
              <img
                src={post["imageUrl"]}
                alt="Post"
                className="h-60 w-full object-cover rounded"
              />

              {/* ปุ่ม Like / Comment / Share */}
              <div className="flex items-center gap-4 mt-4">
                {/* ❤️ Like */}
                <button className="flex items-center bg-gray-800 text-white px-3 py-1 rounded-full shadow hover:bg-red-600 transition">
                  <span className="text-xl mr-2">❤️</span>
                  <span className="text-sm font-bold">
                    {post["likeCount"] || 0}
                  </span>
                </button>

                {/* 💬 Comment */}
                <button className="flex items-center bg-gray-800 text-white px-3 py-1 rounded-full shadow hover:bg-blue-600 transition">
                  <span className="text-xl mr-2">💬</span>
                  <span className="text-sm font-bold">
                    {post["comments"] ? post["comments"].length : 0}
                  </span>
                </button>

                {/* ➤ Share */}
                <button className="flex items-center bg-gray-800 text-yellow-400 px-3 py-1 rounded-full shadow hover:bg-yellow-500 hover:text-black transition">
                  <span className="text-xl mr-2">➤</span>
                  <span className="text-sm font-semibold">Share</span>
                </button>
              </div>
            </div>
          )}

          {/* Comments */}
          {post["comments"] && post["comments"].length > 0 ? (
            <div className="mt-4 space-y-2">
              {post["comments"].map((comment, commentIdx) => (
                <div key={commentIdx} className="flex items-start gap-2">
                  {/* รูปโปรไฟล์ */}
                  <img
                    src={comment.profilePicture || "/default-avatar.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />

                  {/* ชื่อ + ข้อความ */}
                  <div>
                    <p className="text-sm text-gray-800 font-semibold">
                      {comment.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-300 mt-4">
              You are first comment on this post!
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
