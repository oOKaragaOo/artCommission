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
                            <p className="font-semibold">{post.name} <span className="text-sm text-gray-400">* {post.time}</span></p>
                            <p className="text-sm text-gray-500">@{post.account}</p>
                        </div>
                    </div>
                    <div className="bg-gray-400 h-60 rounded" />
                </div>
            ))}
        </div>
    );
}