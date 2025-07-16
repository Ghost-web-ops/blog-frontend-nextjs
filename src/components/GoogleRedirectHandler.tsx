"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function GoogleRedirectHandler() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      login(token); // تخزين التوكن في AuthContext + localStorage
      toast.success("Logged in successfully with Google!");
      router.push("/"); // إعادة التوجيه للصفحة الرئيسية
    }
  }, [params, login, router]);

  return null;
}
