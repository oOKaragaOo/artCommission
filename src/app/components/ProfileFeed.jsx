// components/ProfileFeed.jsx
"use client"
export default function ProfileFeed({ posts }) {
    return (
        <div className="space-y-4">
            {posts.map((post, idx) => (
                <div key={idx} className="bg-gray-100 p-4 rounded shadow">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-black rounded-full" />

                        <div>
                            <p className="font-semibold">{post["authorName"]}
                            </p>
                                <p className="text-sm text-gray-400">{post["createdAt"]}</p>
                        </div>
                    </div>
                            <p className="text-sm text-gray-500">{post["caption"]}</p>

                    {/* แสดงรูปภาพถ้า imageUrl มีค่า */}
                    {post["imageUrl"] && post["imageUrl"].trim() !== "" ? (
                        <div>
                            <img
                                src={post["imageUrl"]}
                                alt={""} // ใช้ข้อความ default หากไม่มี caption
                                className="h-60 w-full object-cover rounded"
                            />
                        </div>
                    ) : null}

                    {/* แสดง Comments */}
                    {post["comments"] && post["comments"].length > 0 ? (
                        <div className="mt-4 space-y-2">
                            {post["comments"].map((comment, commentIdx) => (
                                <p key={commentIdx} className="text-sm text-gray-700 font-semibold">
                                    - {comment}
                                </p>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-300 mt-4">You are first comment on this post !</p>
                    )}
                </div>
            ))}
        </div>
    );
}