export default function FloatingActions() {
  return (
    <div className="floating-actions" style={{ position: "fixed", bottom: 20, right: 20, zIndex: 60, display: "flex", flexDirection: "column", gap: 10 }}>
      <a
        className="floating-call"
        href="https://zalo.me/0912415045"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        style={{ position: "static", background: "#0068ff" }}
      >
        Z
      </a>
      <a className="floating-call" href="tel:0912415045" aria-label="Gọi đặt vé" style={{ position: "static" }}>
        ☎
      </a>
    </div>
  );
}
