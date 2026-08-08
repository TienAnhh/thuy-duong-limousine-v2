"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Đăng nhập thất bại");
      }
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} className="admin-card" style={{ width: 340 }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Đăng nhập quản trị</p>
        <p style={{ color: "var(--admin-muted)", fontSize: 13, marginBottom: 18 }}>Thùy Dương Limousine</p>

        {error && <div className="admin-error">{error}</div>}

        <div className="admin-field">
          <label>Tài khoản</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
        </div>
        <div className="admin-field">
          <label>Mật khẩu</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="admin-btn" type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
