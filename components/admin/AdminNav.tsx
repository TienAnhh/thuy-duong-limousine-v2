"use client";

import { useState } from "react";

type ActiveKey = "dashboard" | "pages" | "prices" | "news" | "contacts" | "accounts" | "activity" | "analytics";

export default function AdminNav({ active, isSuperAdmin }: { active: ActiveKey; isSuperAdmin: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="admin-nav-burger"
        aria-label="Mở menu quản trị"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        &#9776; Danh mục
      </button>
      <nav className={`admin-nav${open ? " open" : ""}`}>
        <a href="/admin" className={active === "dashboard" ? "active" : ""} onClick={() => setOpen(false)}>
          Tổng quan
        </a>
        <a href="/admin/pages" className={active === "pages" ? "active" : ""} onClick={() => setOpen(false)}>
          Trang nội dung
        </a>
        <a href="/admin/prices" className={active === "prices" ? "active" : ""} onClick={() => setOpen(false)}>
          Bảng giá
        </a>
        <a href="/admin/news" className={active === "news" ? "active" : ""} onClick={() => setOpen(false)}>
          Tin tức
        </a>
        <a href="/admin/analytics" className={active === "analytics" ? "active" : ""} onClick={() => setOpen(false)}>
          Thống kê truy cập
        </a>
        {isSuperAdmin && (
          <a href="/admin/contacts" className={active === "contacts" ? "active" : ""} onClick={() => setOpen(false)}>
            Đăng ký / liên hệ
          </a>
        )}
        {isSuperAdmin && (
          <a href="/admin/accounts" className={active === "accounts" ? "active" : ""} onClick={() => setOpen(false)}>
            Tài khoản quản trị
          </a>
        )}
        {isSuperAdmin && (
          <a href="/admin/activity" className={active === "activity" ? "active" : ""} onClick={() => setOpen(false)}>
            Nhật ký hoạt động
          </a>
        )}
        <a href="/" target="_blank" rel="noreferrer" style={{ marginTop: 16, color: "var(--admin-muted)" }}>
          ↗ Xem trang web
        </a>
      </nav>
    </>
  );
}
