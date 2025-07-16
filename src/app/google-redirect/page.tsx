// src/app/google-redirect/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function GoogleRedirectPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      login(token); // خزّنه في localStorage + context
      router.replace("/"); // رحل للصفحة الرئيسية
    }
  }, [token, login, router]);

  return <p className="text-center mt-12 text-slate-300">Signing in...</p>;
}
