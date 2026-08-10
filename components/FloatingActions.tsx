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
          <span className="fab-icon">f</span>
        </span>
        <span className="fab-label">Fanpage</span>
      </a>
    </div>
  );
}
