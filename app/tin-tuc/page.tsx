import { Metadata } from "next";
import { getNavPages, getPublishedNews } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingActions from "@/components/FloatingActions";

// Cache trang danh sách 60 giây thay vì query DB ở mọi lượt truy cập.
// Khi admin đăng/sửa/xóa bài, revalidatePath("/tin-tuc") sẽ làm mới ngay lập tức,
// nên con số 60s chỉ là "lưới an toàn" phòng khi revalidatePath không chạy.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tin tức | Thùy Dương Limousine",
  description: "Tin tức, thông báo lịch chạy và cập nhật mới từ Thùy Dương Limousine.",
};

export default async function NewsListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const rawPage = Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page;
  const page = Math.max(1, parseInt(rawPage ?? "1", 10) || 1);

  const [{ posts, totalPages }, navPages] = await Promise.all([
    getPublishedNews(page),
    getNavPages(),
  ]);

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
            <div className="news-list">
              {posts.map((post) => (
                <a className="news-list-item" key={post.slug} href={`/tin-tuc/${post.slug}`}>
                  {post.coverImage && (
                    <div className="news-list-thumb">
                      <img src={post.coverImage} alt={post.title} />
                    </div>
                  )}
                  <div className="news-list-content">
                    <h4>{post.title}</h4>
                    {post.excerpt && <p>{post.excerpt}</p>}
                    <span className="link">Đọc tiếp →</span>
                  </div>
                </a>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div
              className="news-pagination"
              style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}
            >
              {page > 1 && (
                <a className="cta-btn" href={page - 1 === 1 ? "/tin-tuc" : `/tin-tuc?page=${page - 1}`}>
                  ← Trang trước
                </a>
              )}
              <span style={{ alignSelf: "center", color: "#5c666c" }}>
                Trang {page}/{totalPages}
              </span>
              {page < totalPages && (
                <a className="cta-btn" href={`/tin-tuc?page=${page + 1}`}>
                  Trang sau →
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      <SiteFooter servicePages={navPages} />
      <FloatingActions />
    </>
  );
}
