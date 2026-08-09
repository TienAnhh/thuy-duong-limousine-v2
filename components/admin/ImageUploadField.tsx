"use client";

import { useRef, useState } from "react";

export default function ImageUploadField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload thất bại");
      onChange(data.url);
    } catch (err: any) {
      setError(err.message || "Upload thất bại");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/... hoặc dán URL ảnh"
          style={{ flex: 1 }}
        />
        <button
          type="button"
          className="admin-btn ghost"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{ whiteSpace: "nowrap" }}
        >
          {uploading ? "Đang tải..." : "📤 Tải ảnh lên"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {error && <p style={{ color: "var(--admin-danger)", fontSize: 12.5, marginTop: 6 }}>{error}</p>}
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          style={{ marginTop: 10, maxHeight: 140, borderRadius: 6, border: "1px solid var(--admin-border)" }}
        />
      )}
    </div>
  );
}
