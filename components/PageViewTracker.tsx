"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return; // không tính lượt admin tự duyệt web
    fetch("/api/track/pageview", { method: "POST" }).catch(() => {});
  }, [pathname]);

  return null;
}
