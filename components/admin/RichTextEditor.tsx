"use client";

import { useCallback, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { style: "max-width:100%;border-radius:8px;" } }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  });

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!editor) return;
      setUploading(true);
      setUploadError("");
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload ảnh thất bại");
        editor.chain().focus().setImage({ src: data.url }).run();
      } catch (err: any) {
        setUploadError(err.message || "Upload ảnh thất bại");
      } finally {
        setUploading(false);
      }
    },
    [editor]
  );

  if (!editor) return null;

  function btnClass(active: boolean) {
    return `rte-btn${active ? " active" : ""}`;
  }

  return (
    <div className="rte-wrap">
      <div className="rte-toolbar">
        <button type="button" className={btnClass(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </button>
        <button type="button" className={btnClass(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>
          I
        </button>
        <button
          type="button"
          className={btnClass(editor.isActive("heading", { level: 2 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>
        <button
          type="button"
          className={btnClass(editor.isActive("heading", { level: 3 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </button>
        <button type="button" className={btnClass(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • Danh sách
        </button>
        <button
          type="button"
          className="rte-btn"
          onClick={() => {
            const url = window.prompt("Nhập địa chỉ link:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          🔗 Link
        </button>
        <button type="button" className="rte-btn" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
          {uploading ? "Đang tải ảnh..." : "🖼 Chèn ảnh"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
            e.target.value = "";
          }}
        />
      </div>
      {uploadError && <p style={{ color: "var(--admin-danger)", fontSize: 12.5, padding: "6px 12px 0" }}>{uploadError}</p>}
      <EditorContent editor={editor} className="rte-content" />
    </div>
  );
}
