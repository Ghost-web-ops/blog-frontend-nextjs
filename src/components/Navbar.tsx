"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/'); // توجيه المستخدم للصفحة الرئيسية بعد تسجيل الخروج
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          My<span className="text-cyan-400">Blog</span>
        </Link>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link href="/admin/create-post" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                Create Post
              </Link>
              <button onClick={handleLogout} className="text-slate-300 hover:text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-slate-300 hover:text-white">Login</Link>
              <Link href="/register" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
