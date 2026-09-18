import { CallLink, ZaloLink } from "@/components/TrackedLinks";

export default function FloatingActions() {
  return (
    <div className="floating-actions">
      <CallLink className="floating-btn call" aria-label="Gọi đặt vé 0912 415 045">
        <span className="fab-circle">
          <span className="pulse-ring"></span>
          <span className="pulse-ring ring2"></span>
          <span className="fab-icon">☎</span>
        </span>
        <span className="fab-label">0912 415 045</span>
      </CallLink>
      <ZaloLink className="floating-btn zalo" aria-label="Chat Zalo hỗ trợ">
        <span className="fab-circle">
          <span className="pulse-ring"></span>
          <span className="pulse-ring ring2"></span>
          <span className="fab-icon zalo-icon">Zalo</span>
        </span>
        <span className="fab-label">Chat hỗ trợ</span>
      </ZaloLink>
    </div>
  );
}
