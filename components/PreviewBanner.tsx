import { draftMode } from "next/headers";

export default function PreviewBanner() {
  const { isEnabled } = draftMode();
  if (!isEnabled) return null;

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#c9a227",
        color: "#0b1f2a",
        fontSize: 13.5,
        fontWeight: 600,
        padding: "8px 16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 14,
      }}
    >
      <span>👁 Đang xem bản nháp — nội dung này chưa hiển thị công khai cho khách</span>
      <a
        href="/api/admin/preview/disable"
        style={{ color: "#0b1f2a", textDecoration: "underline", fontWeight: 700 }}
      >
        Thoát xem trước
      </a>
    </div>
  );
}
