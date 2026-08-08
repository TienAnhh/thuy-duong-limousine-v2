"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type NewsFormData = {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  coverImage: string;
  published: boolean;
};

const emptyForm: NewsFormData = {
  slug: "",
  title: "",
  excerpt: "",
  contentHtml: "",
  coverImage: "",
  published: true,
};

export default function NewsForm({
  mode,
  postId,
  initial,
}: {
  mode: "create" | "edit";
  postId?: string;
  initial?: Partial<NewsFormData>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<NewsFormData>({ ...emptyForm, ...initial });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof NewsFormData>(key: K, value: NewsFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSaved(false);
    try {
      const url = mode === "create" ? "/api/admin/news" : `/api/admin/news/${postId}`;
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
        router.push(`/admin/news/${created.id}`);
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
    if (!postId) return;
    if (!confirm("Xóa bài viết này? Không thể hoàn tác.")) return;
    const res = await fetch(`/api/admin/news/${postId}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Không xóa được");
      return;
    }
    router.push("/admin/news");
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="admin-error">{error}</div>}
      {saved && <div className="admin-success">Đã lưu thay đổi.</div>}

      <div className="admin-field">
        <label>Tiêu đề bài viết</label>
        <input value={form.title} onChange={(e) => update("title", e.target.value)} required />
      </div>

      <div className="admin-field">
        <label>Slug (đường dẫn) {mode === "edit" && "— không nên đổi sau khi đã dùng"}</label>
        <input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="vd: khai-truong-tuyen-moi" required />
      </div>

      <div className="admin-field">
        <label>Ảnh bìa (URL)</label>
        <input value={form.coverImage} onChange={(e) => update("coverImage", e.target.value)} placeholder="/images/..." />
      </div>

      <div className="admin-field">
        <label>Mô tả ngắn (hiện ở trang danh sách)</label>
        <textarea value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} />
      </div>

      <div className="admin-field">
        <label>Nội dung bài viết (hỗ trợ HTML cơ bản)</label>
        <textarea value={form.contentHtml} onChange={(e) => update("contentHtml", e.target.value)} style={{ minHeight: 220 }} />
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
          Xuất bản công khai
        </label>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button className="admin-btn" type="submit" disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
        {mode === "edit" && (
          <button type="button" className="admin-btn danger" onClick={handleDelete}>
            Xóa bài viết
          </button>
        )}
      </div>
    </form>
  );
}
