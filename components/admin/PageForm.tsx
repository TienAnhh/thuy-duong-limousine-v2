"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type PageFormData = {
  slug: string;
  type: string;
  navLabel: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  bannerUrl: string;
  priceFrom: string;
  duration: string;
  bodyHtml: string;
  published: boolean;
  sortOrder: number;
};

const emptyForm: PageFormData = {
  slug: "",
  type: "service",
  navLabel: "",
  h1: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
  bannerUrl: "",
  priceFrom: "",
  duration: "",
  bodyHtml: "",
  published: true,
  sortOrder: 0,
};

export default function PageForm({
  mode,
  pageId,
  initial,
}: {
  mode: "create" | "edit";
  pageId?: string;
  initial?: Partial<PageFormData>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<PageFormData>({ ...emptyForm, ...initial });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof PageFormData>(key: K, value: PageFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSaved(false);
    try {
      const url = mode === "create" ? "/api/admin/pages" : `/api/admin/pages/${pageId}`;
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
      if (mode === "create") {
        const created = await res.json();
        router.push(`/admin/pages/${created.id}`);
      } else {
        setSaved(true);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Có lỗi khi lưu");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!pageId) return;
    if (!confirm("Xóa trang này? Không thể hoàn tác.")) return;
    const res = await fetch(`/api/admin/pages/${pageId}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Không xóa được");
      return;
    }
    router.push("/admin/pages");
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="admin-error">{error}</div>}
      {saved && <div className="admin-success">Đã lưu thay đổi.</div>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="admin-field">
          <label>Loại trang</label>
          <select value={form.type} onChange={(e) => update("type", e.target.value)}>
            <option value="route">Tuyến đường</option>
            <option value="service">Dịch vụ</option>
            <option value="static">Trang cố định</option>
          </select>
        </div>
        <div className="admin-field">
          <label>Slug (đường dẫn URL) {mode === "edit" && "— không nên đổi sau khi đã dùng"}</label>
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="vd: tuyen-hai-phong-cam-pha"
            required
          />
        </div>
      </div>

      <div className="admin-field">
        <label>Tên hiển thị (trong menu, footer, danh sách admin)</label>
        <input value={form.navLabel} onChange={(e) => update("navLabel", e.target.value)} required />
      </div>

      <div className="admin-field">
        <label>Tiêu đề H1</label>
        <input value={form.h1} onChange={(e) => update("h1", e.target.value)} required />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="admin-field">
          <label>Giá từ (vd: 300.000đ)</label>
          <input value={form.priceFrom} onChange={(e) => update("priceFrom", e.target.value)} />
        </div>
        <div className="admin-field">
          <label>Thời gian di chuyển (vd: ~2h30)</label>
          <input value={form.duration} onChange={(e) => update("duration", e.target.value)} />
        </div>
      </div>

      <div className="admin-field">
        <label>URL ảnh banner</label>
        <input value={form.bannerUrl} onChange={(e) => update("bannerUrl", e.target.value)} placeholder="/images/..." />
      </div>

      <div className="admin-field">
        <label>Meta title (thẻ tiêu đề SEO, để trống sẽ dùng H1)</label>
        <input value={form.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} />
      </div>

      <div className="admin-field">
        <label>Meta description (mô tả SEO)</label>
        <textarea value={form.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} />
      </div>

      <div className="admin-field">
        <label>Từ khóa SEO</label>
        <input value={form.keywords} onChange={(e) => update("keywords", e.target.value)} placeholder="cách nhau bằng dấu phẩy" />
      </div>

      <div className="admin-field">
        <label>Nội dung mô tả (hỗ trợ HTML cơ bản: &lt;p&gt;, &lt;b&gt;, &lt;ul&gt;&lt;li&gt;...)</label>
        <textarea value={form.bodyHtml} onChange={(e) => update("bodyHtml", e.target.value)} style={{ minHeight: 160 }} />
      </div>

      <div className="admin-field" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          id="published"
          checked={form.published}
          onChange={(e) => update("published", e.target.checked)}
          style={{ width: "auto" }}
        />
        <label htmlFor="published" style={{ margin: 0 }}>
          Hiển thị công khai trên website
        </label>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button className="admin-btn" type="submit" disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
        {mode === "edit" && form.slug !== "home" && (
          <button type="button" className="admin-btn danger" onClick={handleDelete}>
            Xóa trang
          </button>
        )}
      </div>
    </form>
  );
}
