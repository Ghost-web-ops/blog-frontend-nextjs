// src/app/blog/[id]/page.tsx

import { Post } from "@/interfaces";
import { notFound } from "next/navigation";
import PostActions from "../../../components/PostActions"; // <-- استيراد المكون الجديد

async function getPost(id: string): Promise<Post | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  try {
    const res = await fetch(`${apiUrl}/api/posts/${id}`, { next: { revalidate: 0 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}
type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

// 2. تعديل المكون ليصبح async ويستخدم await مع الـ props
export default async function PostPage(props: PageProps) {
  // 3. استخدام await للحصول على قيمة params
  const { id } = await props.params;
  const post = await getPost(id);


  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        <div className="border-b border-slate-700 pb-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{post.title}</h1>
          <p className="text-slate-400">
            By {post.author} on {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="prose prose-invert lg:prose-xl text-slate-300">
          {post.content}
        </div>
      </article>
      
      {/* ✅ هنا سنعرض الأزرار التفاعلية من مكون منفصل */}
      <div className="max-w-4xl mx-auto mt-8">
        <PostActions post={post} />
      </div>
    </div>
  );
}