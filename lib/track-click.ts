declare global {
  interface Window {
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

export type ClickType = "call" | "zalo";

/**
 * Ghi nhận 1 lượt bấm nút gọi / Zalo vào bảng DailyStat (qua /api/track/click).
 * Với nút gọi còn báo conversion cho Google Ads.
 * Không bao giờ ném lỗi để không ảnh hưởng việc gọi/chat của khách.
 */
export function trackClick(type: ClickType) {
  try {
    const payload = JSON.stringify({ type });
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/track/click",
        new Blob([payload], { type: "application/json" })
      );
    } else {
      fetch("/api/track/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // bỏ qua
  }

  if (type === "call") {
    try {
      window.gtag_report_conversion?.(); // báo conversion Google Ads khi bấm gọi
    } catch {
      // bỏ qua
    }
  }
}
