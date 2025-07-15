// src/app/components/PostCard.tsx
import Link from 'next/link';
import { Post } from '@/interfaces'; // استخدام @/ للوصول إلى مجلد src

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.id}`} className="block">
      <div className="border border-slate-700 rounded-lg p-6 hover:border-cyan-400 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">{post.title}</h2>
        <p className="text-slate-400 mb-4">
          By {post.author} on {new Date(post.created_at).toLocaleDateString()}
        </p>
        <p className="text-slate-300 line-clamp-3">
          {post.content}
        </p>
      </div>
    </Link>
  );
}