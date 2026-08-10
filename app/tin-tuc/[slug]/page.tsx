import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getNavPages, getNewsBySlug } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PreviewBanner from "@/components/PreviewBanner";
import FloatingActions from "@/components/FloatingActions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getNewsBySlug(params.slug);
  if (!post) return {};
  return { title: `${post.title} | Thùy Dương Limousine`, description: post.excerpt || undefined };
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const [post, navPages] = await Promise.all([getNewsBySlug(params.slug), getNavPages()]);
  if (!post) notFound();

  const otherPosts = await prisma.newsPost.findMany({
    where: { published: true, slug: { not: post.slug } },
    orderBy: { publishedAt: "desc" },
    take: 4,
    select: { slug: true, title: true, coverImage: true },
  });

  return (
    <>
      <PreviewBanner />
      <SiteHeader servicePages={navPages} />

      <section className={`page-hero${post.coverImage ? " has-banner" : ""}`}>
        {post.coverImage && (
          <div className="page-hero-bg">
            <img src={post.coverImage} alt={post.title} />
          </div>
        )}
        <div className="wrap">
          <div className="breadcrumb">
            <a href="/">Trang chủ</a> <span>/</span> <a href="/tin-tuc">Tin tức</a> <span>/</span>{" "}
            <span>{post.title}</span>
          </div>
          <h1>{post.title}</h1>
          <p className="lede">
            {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      <section>
        <div className="wrap article">
          <div className="article-body">
            {post.contentHtml && <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />}
          </div>

          <aside>
            <div className="side-card">
              <h4>Liên hệ nhanh</h4>
              <ul className="side-list">
                <li>
                  <b>Hotline:</b> 0912 415 045
                </li>
                <li>
                  <b>Zalo:</b> zalo.me/0912415045
                </li>
                <li>
                  <b>Địa chỉ:</b> 15 Nguyễn Bỉnh Khiêm, Ka Long, Móng Cái
                </li>
              </ul>
              <a className="cta-btn" style={{ width: "100%", justifyContent: "center" }} href="tel:0912415045">
                ☎ Gọi đặt vé ngay
              </a>
            </div>

            {otherPosts.length > 0 && (
              <div className="side-card">
                <h4>Bài viết khác</h4>
                <div className="related-list">
                  {otherPosts.map((p) => (
                    <a key={p.slug} href={`/tin-tuc/${p.slug}`}>
                      {p.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {navPages.length > 0 && (
              <div className="side-card">
                <h4>Dịch vụ</h4>
                <div className="related-list">
                  {navPages.map((p) => (
                    <a key={p.slug} href={`/${p.slug}`}>
                      {p.navLabel}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <SiteFooter servicePages={navPages} />
      <FloatingActions />
    </>
  );
}
