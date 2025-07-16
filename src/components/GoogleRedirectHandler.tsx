"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token); // تخزين التوكن
      router.replace("/"); // إزالة التوكن من الرابط + إعادة تحميل الصفحة بدون query
    }
  }, []);

  return null;
}
