// src/app/page.tsx
import { Post } from "@/interfaces";
import PostCard from "../components/PostCard";
import dynamic from "next/dynamic";
const GoogleRedirectHandler = dynamic(() => import("../components/GoogleRedirectHandler"), { ssr: false });

async function getPosts(): Promise<Post[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/api/posts`, { cache: "no-store" });
    if (!res.ok) return [];

    const posts = await res.json();
    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-12">
      <GoogleRedirectHandler />
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          The Blog
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Welcome to a space of ideas and stories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="col-span-full text-center text-slate-500">
            No posts found.
          </p>
        )}
      </div>
    </main>
  );
}
