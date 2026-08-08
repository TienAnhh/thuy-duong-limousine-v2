"use client";

import { useState, useRef, useEffect } from "react";

type NavPage = { slug: string; navLabel: string; type: string };

export default function SiteHeader({ servicePages }: { servicePages: NavPage[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) && window.innerWidth > 980) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  function handleDropdownTriggerClick(e: React.MouseEvent) {
    if (typeof window !== "undefined" && window.innerWidth <= 980) {
      e.preventDefault();
      setDropdownOpen((v) => !v);
    }
  }

  function closeMenus() {
    setMobileOpen(false);
    setDropdownOpen(false);
  }

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div>
            <span>15 Nguyễn Bỉnh Khiêm, Ka Long, Móng Cái, Quảng Ninh</span>
          </div>
          <div>
            <a href="tel:0912415045">Hotline: 0912 415 045</a>
            <span className="divider">|</span>
            <a href="https://zalo.me/0912415045" target="_blank" rel="noopener noreferrer">
              Zalo đặt vé
            </a>
          </div>
        </div>
      </div>

      <header className="site">
        <div className="wrap">
          <a className="brand" href="/">
            <div className="brand-mark">TD</div>
            <div className="brand-text">
              <div className="name">THÙY DƯƠNG LIMOUSINE</div>
              <div className="tag">Hải Phòng · Hạ Long · Móng Cái</div>
            </div>
          </a>

          <nav className={`main${mobileOpen ? " mobile-open" : ""}`}>
            <a href="/" onClick={closeMenus}>
              Trang chủ
            </a>
            <a href="/#bang-gia" className="nav-price-link" onClick={closeMenus}>
              Xem bảng giá
            </a>
            <div className={`has-dropdown${dropdownOpen ? " open" : ""}`} ref={dropdownRef}>
              <a href="#" className="dropdown-trigger" onClick={handleDropdownTriggerClick}>
                Dịch vụ cho thuê xe <span className="dropdown-toggle-icon">▾</span>
              </a>
              <div className="dropdown-menu">
                {servicePages.map((p) => (
                  <a key={p.slug} href={`/${p.slug}`} onClick={closeMenus}>
                    {p.navLabel}
                  </a>
                ))}
                <a href="/tin-tuc" onClick={closeMenus}>
                  Tin tức
                </a>
              </div>
            </div>
            <a href="/#lien-he" onClick={closeMenus}>
              Liên hệ
            </a>
          </nav>

          <div className="header-actions">
            <a className="cta-btn ghost" href="/#bang-gia">
              Xem bảng giá
            </a>
            <a className="cta-btn" href="tel:0912415045">
              Gọi ngay
            </a>
            <button
              className="burger"
              aria-label="Mở menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              &#9776;
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
