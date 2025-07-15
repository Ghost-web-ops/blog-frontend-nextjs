// src/app/posts/create/page.tsx
"use client";

import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useApi } from '../../hooks/useApi';
import toast from 'react-hot-toast';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
   const apiFetch = useApi(); 
  useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const res = await apiFetch(`${apiUrl}/api/posts`, { // <-- استخدام apiFetch بدلاً من fetch
        method: 'POST',
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        toast.success("Post created successfully!");
        router.push('/');
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to create post.");
      }
    } catch (error) {
      // سيتم معالجة خطأ المصادقة تلقائيًا، هنا نعالج الأخطاء الأخرى
      if ((error as Error).message !== "Unauthorized") {
         toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-lg border border-slate-700">
        <h1 className="text-3xl font-bold text-center mb-6">Create New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300">Title</label>
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
            <label htmlFor="content" className="block text-sm font-medium text-slate-300">Content</label>
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
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}