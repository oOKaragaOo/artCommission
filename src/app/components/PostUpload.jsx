// components/PostUpload.jsx
"use client"
export default function PostUpload({ onPost }) {
    return (
        <div className="bg-gray-100 text-center rounded-lg p-4 shadow mb-4">
            <button
                onClick={onPost}
                className="text-cyan-400 font-semibold hover:underline">
                + New Post
            </button>
        </div>
    );
}

