"use client";

function trackClick(type: "call" | "zalo") {
  try {
    const data = new Blob([JSON.stringify({ type })], { type: "application/json" });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track/click", data);
    } else {
      fetch("/api/track/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // không để lỗi tracking ảnh hưởng tới việc gọi/chat của khách
  }
}

export default function FloatingActions() {
  return (
    <div className="floating-actions">
      <a
        className="floating-btn call"
        href="tel:0912415045"
        aria-label="Gọi đặt vé 0912 415 045"
        onClick={() => trackClick("call")}
      >
        <span className="fab-circle">
          <span className="pulse-ring"></span>
          <span className="pulse-ring ring2"></span>
          <span className="fab-icon">☎</span>
        </span>
        <span className="fab-label">0912 415 045</span>
      </a>
      <a
        className="floating-btn zalo"
        href="https://zalo.me/0912415045"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo hỗ trợ"
        onClick={() => trackClick("zalo")}
      >
        <span className="fab-circle">
          <span className="pulse-ring"></span>
          <span className="pulse-ring ring2"></span>
          <span className="fab-icon zalo-icon">Zalo</span>
        </span>
        <span className="fab-label">Chat hỗ trợ</span>
      </a>
    </div>
  );
}
