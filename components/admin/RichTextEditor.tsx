"use client";

import { useCallback, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { FontSize } from "./tiptap-font-size";

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"];
const DEFAULT_SIZE_INDEX = 1; // 14px ~ cỡ chữ mặc định của nội dung

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
      TextStyle,
      FontSize,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
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

  function currentSizeIndex(): number {
    const size = editor!.getAttributes("textStyle").fontSize as string | undefined;
    const idx = size ? FONT_SIZES.indexOf(size) : DEFAULT_SIZE_INDEX;
    return idx === -1 ? DEFAULT_SIZE_INDEX : idx;
  }

  function changeFontSize(direction: 1 | -1) {
    const idx = currentSizeIndex();
    const nextIdx = Math.min(FONT_SIZES.length - 1, Math.max(0, idx + direction));
    editor!.chain().focus().setFontSize(FONT_SIZES[nextIdx]).run();
  }

  const insideTable = editor.isActive("table");

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

        <span className="rte-sep" />

        <button type="button" className="rte-btn" title="Giảm cỡ chữ" onClick={() => changeFontSize(-1)}>
          A−
        </button>
        <span className="rte-size-label">{FONT_SIZES[currentSizeIndex()]}</span>
        <button type="button" className="rte-btn" title="Tăng cỡ chữ" onClick={() => changeFontSize(1)}>
          A+
        </button>
        {editor.getAttributes("textStyle").fontSize && (
          <button type="button" className="rte-btn" title="Về cỡ chữ mặc định" onClick={() => editor.chain().focus().unsetFontSize().run()}>
            Mặc định
          </button>
        )}

        <span className="rte-sep" />

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

        <span className="rte-sep" />

        {!insideTable ? (
          <button
            type="button"
            className="rte-btn"
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          >
            ▦ Chèn bảng
          </button>
        ) : (
          <>
            <button type="button" className="rte-btn" onClick={() => editor.chain().focus().addColumnAfter().run()}>
              + Cột
            </button>
            <button type="button" className="rte-btn" onClick={() => editor.chain().focus().addRowAfter().run()}>
              + Dòng
            </button>
            <button type="button" className="rte-btn" onClick={() => editor.chain().focus().deleteColumn().run()}>
              − Cột
            </button>
            <button type="button" className="rte-btn" onClick={() => editor.chain().focus().deleteRow().run()}>
              − Dòng
            </button>
            <button type="button" className="rte-btn danger" onClick={() => editor.chain().focus().deleteTable().run()}>
              🗑 Xóa bảng
            </button>
          </>
        )}
      </div>
      {uploadError && <p style={{ color: "var(--admin-danger)", fontSize: 12.5, padding: "6px 12px 0" }}>{uploadError}</p>}
      <EditorContent editor={editor} className="rte-content" />
    </div>
  );
}
