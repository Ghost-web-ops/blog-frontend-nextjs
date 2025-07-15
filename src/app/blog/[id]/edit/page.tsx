"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import { Post } from "@/interfaces";
import toast from "react-hot-toast";

export default function EditPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { token } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // جلب بيانات المقال الحالية لملء الفورم
  useEffect(() => {
    if (!id) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const fetchPost = async () => {
      const res = await fetch(`${apiUrl}/api/posts/${id}`);
      if (res.ok) {
        const post: Post = await res.json();
        setTitle(post.title);
        setContent(post.content);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!token) {
      toast.error("Please login to edit a post.");
      return;
    }

    const res = await fetch(`${apiUrl}/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      toast.success("Post updated successfully!");
      router.push(`/blog/${id}`); // العودة لصفحة المقال بعد التعديل
    } else {
      toast.error("Failed to update post.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-lg border border-slate-700">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-slate-300"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={10}
              className="mt-1 block w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}
