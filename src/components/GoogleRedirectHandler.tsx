"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleRedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      router.replace("/"); // إعادة التوجيه بدون الباراميتر
    }
  }, [searchParams, router]);

  return null; // لا يعرض أي شيء
}
