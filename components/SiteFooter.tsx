type NavPage = { slug: string; navLabel: string; type: string };

export default function SiteFooter({ servicePages }: { servicePages: NavPage[] }) {
  const routePages = servicePages.filter((p) => p.type === "route");
  const otherServices = servicePages.filter((p) => p.type === "service");

  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand" href="/">
              <div className="brand-mark">TD</div>
              <div className="brand-text">
                <div className="name">THÙY DƯƠNG LIMOUSINE</div>
                <div className="tag">Hải Phòng · Hạ Long · Móng Cái</div>
              </div>
            </a>
            <p>
              Xe Limousine tuyến Hải Phòng - Hạ Long - Móng Cái, đón trả tận nơi, chạy liên tục từ 4h30 đến 19h
              hằng ngày.
            </p>
            <a className="zalo-btn" href="https://zalo.me/0912415045" target="_blank" rel="noopener noreferrer">
              💬 Chat Zalo
            </a>
            <a
              className="zalo-btn"
              href="https://www.facebook.com/profile.php?id=61592646196118"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: 10 }}
            >
              📘 Fanpage Facebook
            </a>
          </div>
          <div>
            <h5>Tuyến đường</h5>
            <ul>
              {routePages.map((p) => (
                <li key={p.slug}>
                  <a href={`/${p.slug}`}>{p.navLabel}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Dịch vụ</h5>
            <ul>
              {otherServices.map((p) => (
                <li key={p.slug}>
                  <a href={`/${p.slug}`}>{p.navLabel}</a>
                </li>
              ))}
              <li>
                <a href="/tin-tuc">Tin tức</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="wrap bottom-bar" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <span>© {new Date().getFullYear()} Thùy Dương Limousine. Bảo lưu mọi quyền.</span>
          <span>
            15 Nguyễn Bỉnh Khiêm, Ka Long, Móng Cái · <a href="tel:0912415045">0912 415 045</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
