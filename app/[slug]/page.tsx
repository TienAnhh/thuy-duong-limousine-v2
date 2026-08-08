import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNavPages, getPageBySlug } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingActions from "@/components/FloatingActions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);
  if (!page) return {};
  return {
    title: page.metaTitle || page.h1,
    description: page.metaDescription || undefined,
  };
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const [page, navPages] = await Promise.all([getPageBySlug(params.slug), getNavPages()]);

  if (!page) notFound();

  return (
    <>
      <SiteHeader servicePages={navPages} />

      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <a href="/">Trang chủ</a> <span>/</span> <span>{page.navLabel}</span>
          </div>
          <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
            {page.type === "route" ? "Tuyến xe limousine" : "Dịch vụ cho thuê xe"}
          </span>
          <h1>{page.h1}</h1>
          {page.metaDescription && <p className="lede">{page.metaDescription}</p>}
          <div className="hero-ctas" style={{ marginTop: 24 }}>
            <a className="cta-btn" href="tel:0912415045">
              ☎ Đặt vé: 0912 415 045
            </a>
            <a className="cta-btn ghost" href="https://zalo.me/0912415045" target="_blank" rel="noopener noreferrer">
              Chat Zalo
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap article">
          <div className="article-body">
            {page.bodyHtml && <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />}
          </div>

          <aside>
            <div className="side-card">
              <h4>Thông tin nhanh</h4>
              {page.priceFrom && (
                <div className="side-price">
                  {page.priceFrom}
                  <small> /khách</small>
                </div>
              )}
              <ul className="side-list" style={{ marginTop: 18 }}>
                {page.duration && (
                  <li>
                    <b>Thời gian:</b> {page.duration}
                  </li>
                )}
                <li>
                  <b>Giờ chạy:</b> 4h30 – 19h00
                </li>
                <li>
                  <b>Đón trả:</b> tận nơi theo yêu cầu
                </li>
              </ul>
              <a className="cta-btn" style={{ width: "100%", justifyContent: "center" }} href="tel:0912415045">
                ☎ Gọi đặt vé ngay
              </a>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter servicePages={navPages} />
      <FloatingActions />
    </>
  );
}
