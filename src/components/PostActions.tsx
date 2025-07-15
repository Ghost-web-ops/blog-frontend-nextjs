// src/app/components/PostActions.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Post } from "@/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";

export default function PostActions({ post }: { post: Post }) {
  const [isOwner, setIsOwner] = useState(false);
  const { token } = useAuth();
   const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<{ userId: number }>(token);
        
        // ---  هذا هو التعديل الحاسم ---
        // نتأكد من أننا نقارن أرقامًا
        if (decodedToken && post.user_id === decodedToken.userId) {
          setIsOwner(true);
        }
        // -----------------------------

      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token, post.user_id]);

  const confirmDelete = async () => {
    if (!isOwner || !token) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/posts/${post.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (res.ok) {
      toast.success('Post deleted successfully.');
      setIsModalOpen(false);
      router.push('/');
      router.refresh();
    } else {
      toast.error('Failed to delete the post.');
    }
  };

  if (!isOwner) {
    return null;
  }

  return (
    <div className="flex gap-4">
      <Link href={`/blog/${post.id}/edit`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md">
        Edit
      </Link>
      <button onClick={() => setIsModalOpen(true)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
          Delete
        </button>
        <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Post"
      >
        <p>Are you sure you want to permanently delete this post? This action cannot be undone.</p>
      </ConfirmationModal>
    </div>
  );
}