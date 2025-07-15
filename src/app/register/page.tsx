"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react'; // <-- استيراد الأيقونات
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // <-- حالة جديدة لإظهار كلمة المرور
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const res = await fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Registration successful! Please log in.');
        router.push('/login');
      } else {
        setError(data.error || 'Failed to register.');
      }
    } catch (err) {
      setError('Could not connect to the server.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-slate-800 p-8 rounded-lg border border-slate-700">
        <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center bg-red-900/20 p-3 rounded-md">{error}</p>}
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">Username</label>
            <input
              type="text" id="username" value={username}
              onChange={(e) => setUsername(e.target.value)} required
              className="block w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input
              type="email" id="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required
              className="block w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          
          {/* --- قسم كلمة المرور الجديد --- */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} // <-- تغيير النوع ديناميكيًا
                id="password" value={password}
                onChange={(e) => setPassword(e.target.value)} required
                className="block w-full bg-slate-900 border border-slate-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // <-- تبديل حالة الإظهار
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-800 px-2 text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`}
              className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-slate-600 rounded-md hover:bg-slate-700 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                {/* Google Icon SVG */}
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,35.846,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              <span>Sign in with Google</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}