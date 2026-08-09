"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type PriceRowData = {
  route: string;
  price: string;
  duration: string;
  note: string;
  sortOrder: number;
};

const empty: PriceRowData = { route: "", price: "", duration: "", note: "", sortOrder: 0 };

export default function PriceRowForm({
  mode,
  rowId,
  initial,
}: {
  mode: "create" | "edit";
  rowId?: string;
  initial?: Partial<PriceRowData>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<PriceRowData>({ ...empty, ...initial });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update<K extends keyof PriceRowData>(key: K, value: PriceRowData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = mode === "create" ? "/api/admin/prices" : `/api/admin/prices/${rowId}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Có lỗi khi lưu");
      }
      router.push("/admin/prices");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Có lỗi khi lưu");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!rowId) return;
    if (!confirm("Xóa dòng giá này?")) return;
    const res = await fetch(`/api/admin/prices/${rowId}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Không xóa được");
      return;
    }
    router.push("/admin/prices");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="admin-error">{error}</div>}

      <div className="admin-field">
        <label>Tuyến đường</label>
        <input value={form.route} onChange={(e) => update("route", e.target.value)} placeholder="Hải Phòng – Vân Đồn" required />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="admin-field">
          <label>Giá vé</label>
          <input value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="250.000đ" required />
        </div>
        <div className="admin-field">
          <label>Thời gian</label>
          <input value={form.duration} onChange={(e) => update("duration", e.target.value)} placeholder="~1h30" />
        </div>
      </div>
      <div className="admin-field">
        <label>Ghi chú</label>
        <input value={form.note} onChange={(e) => update("note", e.target.value)} placeholder="Đón trả trung tâm" />
      </div>
      <div className="admin-field">
        <label>Thứ tự hiển thị (số nhỏ hơn hiện trước)</label>
        <input type="number" value={form.sortOrder} onChange={(e) => update("sortOrder", Number(e.target.value))} />
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button className="admin-btn" type="submit" disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu"}
        </button>
        {mode === "edit" && (
          <button type="button" className="admin-btn danger" onClick={handleDelete}>
            Xóa dòng này
          </button>
        )}
      </div>
    </form>
  );
}
