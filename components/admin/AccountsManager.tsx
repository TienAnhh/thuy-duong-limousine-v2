"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Account = {
  id: string;
  username: string;
  role: string;
  active: boolean;
  createdAt: string;
};

export default function AccountsManager({
  initialAccounts,
  currentUserId,
}: {
  initialAccounts: Account[];
  currentUserId: string;
}) {
  const router = useRouter();
  const [accounts, setAccounts] = useState(initialAccounts);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("admin");
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername, password: newPassword, role: newRole }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Có lỗi khi tạo tài khoản");
      setAccounts((a) => [...a, body]);
      setNewUsername("");
      setNewPassword("");
      setNewRole("admin");
      setShowForm(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function toggleActive(acc: Account) {
    setError("");
    const res = await fetch(`/api/admin/accounts/${acc.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !acc.active }),
    });
    const body = await res.json();
    if (!res.ok) {
      setError(body.error || "Có lỗi xảy ra");
      return;
    }
    setAccounts((list) => list.map((a) => (a.id === acc.id ? body : a)));
  }

  async function handleDelete(acc: Account) {
    if (!confirm(`Xóa tài khoản "${acc.username}"? Không thể hoàn tác.`)) return;
    setError("");
    const res = await fetch(`/api/admin/accounts/${acc.id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Có lỗi xảy ra");
      return;
    }
    setAccounts((list) => list.filter((a) => a.id !== acc.id));
  }

  return (
    <div>
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-card" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tài khoản</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.id}>
                <td>
                  {acc.username}
                  {acc.id === currentUserId && (
                    <span style={{ color: "var(--admin-muted)", fontSize: 12 }}> (bạn)</span>
                  )}
                </td>
                <td>{acc.role === "superadmin" ? "Super Admin" : "Admin"}</td>
                <td>{acc.active ? "Đang hoạt động" : "Đã khóa"}</td>
                <td style={{ color: "var(--admin-muted)" }}>{new Date(acc.createdAt).toLocaleDateString("vi-VN")}</td>
                <td>
                  {acc.id !== currentUserId && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="admin-btn ghost" onClick={() => toggleActive(acc)}>
                        {acc.active ? "Khóa" : "Mở khóa"}
                      </button>
                      <button className="admin-btn danger" onClick={() => handleDelete(acc)}>
                        Xóa
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!showForm ? (
        <button className="admin-btn" onClick={() => setShowForm(true)} style={{ marginTop: 16 }}>
          + Thêm tài khoản
        </button>
      ) : (
        <form onSubmit={handleCreate} className="admin-card" style={{ marginTop: 16, maxWidth: 420 }}>
          <p style={{ fontWeight: 600, marginBottom: 14 }}>Thêm tài khoản mới</p>
          <div className="admin-field">
            <label>Tên đăng nhập</label>
            <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required />
          </div>
          <div className="admin-field">
            <label>Mật khẩu (tối thiểu 8 ký tự)</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} />
          </div>
          <div className="admin-field">
            <label>Vai trò</label>
            <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
              <option value="admin">Admin (không quản lý được tài khoản khác)</option>
              <option value="superadmin">Super Admin (toàn quyền)</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="admin-btn" type="submit" disabled={loading}>
              {loading ? "Đang tạo..." : "Tạo tài khoản"}
            </button>
            <button className="admin-btn ghost" type="button" onClick={() => setShowForm(false)}>
              Hủy
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
