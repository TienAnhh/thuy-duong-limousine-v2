"use client";

import { useState } from "react";

type ServiceItem = {
  slug: string;
  navLabel: string;
  h1: string;
  metaDescription: string | null;
  icon: string | null;
};

const PAGE_SIZE = 4;

export default function ServiceGridPaginated({ services }: { services: ServiceItem[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(services.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const current = services.slice(start, start + PAGE_SIZE);

  function goTo(p: number) {
    const clamped = Math.min(Math.max(1, p), totalPages);
    setPage(clamped);
    document.getElementById("dich-vu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div className="service-grid">
        {current.map((s) => (
          <div className="service-card" key={s.slug}>
            {s.icon && <div className="icon">{s.icon}</div>}
            <h4>{s.navLabel}</h4>
            <p>{s.metaDescription || s.h1}</p>
            <a className="link" href={`/${s.slug}`}>
              Xem chi tiết →
            </a>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="service-pagination">
          <button type="button" className="page-btn" onClick={() => goTo(page - 1)} disabled={page === 1}>
            ‹ Trước
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              className={`page-btn${p === page ? " active" : ""}`}
              onClick={() => goTo(p)}
            >
              {p}
            </button>
          ))}
          <button type="button" className="page-btn" onClick={() => goTo(page + 1)} disabled={page === totalPages}>
            Sau ›
          </button>
        </div>
      )}
    </>
  );
}
