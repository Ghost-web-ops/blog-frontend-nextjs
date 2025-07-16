// src/app/google-redirect/page.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function GoogleRedirectPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      login(token); // خزّن التوكن في AuthContext
      toast.success("Logged in with Google!");
      router.replace("/"); // ارجع للرئيسية
    } else {
      toast.error("Login failed.");
      router.replace("/login");
    }
  }, [params, login, router]);

  return <p className="text-center mt-10 text-white">Redirecting...</p>;
}
