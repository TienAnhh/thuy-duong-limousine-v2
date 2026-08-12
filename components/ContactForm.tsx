"use client";

import { useState } from "react";

export default function ContactForm({ defaultRoute = "" }: { defaultRoute?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      route: (form.elements.namedItem("route") as HTMLInputElement).value,
      note: (form.elements.namedItem("note") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Có lỗi xảy ra, vui lòng gọi hotline.");
      }
      form.reset();
      setStatus("done");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Có lỗi xảy ra, vui lòng gọi hotline.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input name="name" type="text" placeholder="Họ tên" required />
        <input name="phone" type="tel" placeholder="Số điện thoại" required />
      </div>
      <div className="form-row full">
        <input name="route" type="text" defaultValue={defaultRoute} placeholder="Tuyến đường muốn đi (VD: Hải Phòng - Móng Cái)" />
      </div>
      <div className="form-row full">
        <textarea name="note" placeholder="Ghi chú thêm: giờ đón, điểm đón, số lượng khách..." />
      </div>
      <button className="submit-btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Đang gửi..." : "Gửi yêu cầu"}
      </button>
      {status === "done" && (
        <p style={{ display: "block", color: "var(--teal)", fontSize: 13.5, marginTop: 10 }}>
          Đã ghi nhận yêu cầu. Chúng tôi sẽ liên hệ lại sớm, hoặc gọi hotline để được xác nhận nhanh nhất.
        </p>
      )}
      {status === "error" && (
        <p style={{ display: "block", color: "#b03a2e", fontSize: 13.5, marginTop: 10 }}>{errorMsg}</p>
      )}
    </form>
  );
}
