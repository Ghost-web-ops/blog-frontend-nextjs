"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";

// هذا هو "المغلف" الذي سيتعامل مع كل طلبات الـ API
export function useApi() {
  const { token, logout } = useAuth();
  const router = useRouter();

  const apiFetch = useCallback(async (url: string, options: RequestInit = {}) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, { ...options, headers });

    // إذا كان التوكن غير صالح أو منتهي الصلاحية
    if (res.status === 401 || res.status === 403) {
      toast.error("Your session has expired. Please log in again.");
      logout();
      router.push('/login');
      // إيقاف التنفيذ وإرجاع خطأ
      throw new Error("Unauthorized");
    }

    return res;
  }, [token, logout, router]);

  return apiFetch;
}