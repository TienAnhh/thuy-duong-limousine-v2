export default function FloatingActions() {
  return (
    <div className="floating-actions">
      <a className="floating-btn call" href="tel:0912415045" aria-label="Gọi đặt vé 0912 415 045">
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
      >
        <span className="fab-circle">
          <span className="pulse-ring"></span>
          <span className="pulse-ring ring2"></span>
          <span className="fab-icon zalo-icon">Zalo</span>
        </span>
        <span className="fab-label">Chat hỗ trợ</span>
      </a>
      <a
        className="floating-btn fb"
        href="https://www.facebook.com/profile.php?id=61592646196118"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fanpage Facebook"
      >
        <span className="fab-circle">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" aria-hidden="true">
            <path d="M15.36 4.03h-2.1c-1.68 0-2.83.4-3.55 1.15-.72.76-1.08 1.87-1.08 3.32v1.9H6.5v3.15h2.13V21h3.25v-7.45h2.83l.4-3.15h-3.23V8.7c0-.9.24-1.5.62-1.86.36-.34.98-.5 1.85-.5h1.4V4.03z" />
          </svg>
        </span>
        <span className="fab-label">Fanpage</span>
      </a>
    </div>
  );
}
