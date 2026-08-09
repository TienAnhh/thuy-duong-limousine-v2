import { Metadata } from "next";
import { notFound } from "next/navigation";
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
        <div className="wrap">
          <div className="article-body" style={{ maxWidth: 760 }}>
            {post.contentHtml && <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />}
          </div>
        </div>
      </section>

      <SiteFooter servicePages={navPages} />
      <FloatingActions />
    </>
  );
}
