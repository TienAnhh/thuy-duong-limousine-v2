import { Metadata } from "next";
import { getNavPages, getPublishedNews } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingActions from "@/components/FloatingActions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tin tức | Thùy Dương Limousine",
  description: "Tin tức, thông báo lịch chạy và cập nhật mới từ Thùy Dương Limousine.",
};

export default async function NewsListPage() {
  const [posts, navPages] = await Promise.all([getPublishedNews(), getNavPages()]);

  return (
    <>
      <SiteHeader servicePages={navPages} />

      <section className="page-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <a href="/">Trang chủ</a> <span>/</span> <span>Tin tức</span>
          </div>
          <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
            Cập nhật
          </span>
          <h1>Tin tức Thùy Dương Limousine</h1>
        </div>
      </section>

      <section className="bg-cream">
        <div className="wrap">
          {posts.length === 0 ? (
            <p style={{ color: "#5c666c" }}>Chưa có bài viết nào.</p>
          ) : (
            <div className="service-grid">
              {posts.map((post) => (
                <a className="service-card news-card" key={post.slug} href={`/tin-tuc/${post.slug}`}>
                  {post.coverImage && (
                    <div className="news-card-thumb">
                      <img src={post.coverImage} alt={post.title} />
                    </div>
                  )}
                  <h4>{post.title}</h4>
                  {post.excerpt && <p>{post.excerpt}</p>}
                  <span className="link">Đọc tiếp →</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter servicePages={navPages} />
      <FloatingActions />
    </>
  );
}
