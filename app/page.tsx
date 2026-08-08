import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getNavPages, getPageBySlug } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingActions from "@/components/FloatingActions";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getPageBySlug("home");
  return {
    title: home?.metaTitle || "Thùy Dương Limousine",
    description: home?.metaDescription || "Xe Limousine Hải Phòng - Hạ Long - Móng Cái",
  };
}

export default async function HomePage() {
  const [home, navPages] = await Promise.all([getPageBySlug("home"), getNavPages()]);
  const routePages = await prisma.page.findMany({
    where: { published: true, type: "route" },
    orderBy: { sortOrder: "asc" },
  });
  const servicePages = await prisma.page.findMany({
    where: { published: true, type: "service" },
    orderBy: { sortOrder: "asc" },
  });

  const h1 = home?.h1 || "Thùy Dương Limousine";
  const lede =
    home?.bodyHtml?.replace(/<[^>]+>/g, "").slice(0, 220) ||
    "Thùy Dương Limousine phục vụ hành trình Hải Phòng – Hạ Long – Móng Cái, đón trả tận nơi, chạy liên tục từ sáng sớm đến tối muộn.";
  const banner = home?.bannerUrl || "/images/hero-thuy-duong.jpg";

  return (
    <>
      <SiteHeader servicePages={navPages} />

      <section className="hero">
        <div className="hero-media">
          <img src={banner} alt={h1} />
        </div>
        <div className="wrap hero-inner">
          <span className="eyebrow">Xe limousine cao tốc &nbsp;·&nbsp; đón trả tận nơi</span>
          <h1>{h1}</h1>
          <p className="lede">{lede}</p>
          <div className="hero-ctas">
            <a className="cta-btn" href="tel:0912415045">
              ☎ Đặt vé: 0912 415 045
            </a>
            <a className="cta-btn ghost" href="#bang-gia">
              Xem bảng giá
            </a>
          </div>
        </div>
      </section>

      <section className="tight">
        <div className="wrap about-grid">
          <div className="about-copy">
            <span className="eyebrow">Về chúng tôi</span>
            <h2 style={{ color: "var(--navy)", margin: "14px 0 18px", fontSize: "clamp(24px,3vw,32px)" }}>
              Đơn vị vận tải quen thuộc trên tuyến biên giới
            </h2>
            <div dangerouslySetInnerHTML={{ __html: home?.bodyHtml || "" }} />
            <div className="about-figures">
              <div className="fig">
                <div className="n num">4h30–19h</div>
                <div className="l">Khung giờ chạy xe liên tục</div>
              </div>
              <div className="fig">
                <div className="n num">60ph</div>
                <div className="l">Tần suất mỗi chuyến</div>
              </div>
              <div className="fig">
                <div className="n num">{routePages.length}+</div>
                <div className="l">Tuyến đang khai thác</div>
              </div>
              <div className="fig">
                <div className="n num">100%</div>
                <div className="l">Đón trả tận nơi theo yêu cầu</div>
              </div>
            </div>
          </div>
          <div className="about-panel">
            <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
              Cam kết
            </span>
            <h3>Vì sao hành khách chọn đi cùng chúng tôi</h3>
            <ul>
              <li>Tư vấn lịch trình và điểm đón miễn phí qua hotline hoặc Zalo</li>
              <li>Xe đến điểm hẹn đúng giờ, không để khách chờ lâu</li>
              <li>Không thu thêm phụ phí ngoài giá vé đã báo</li>
              <li>Hỗ trợ đổi/hoàn vé khi lịch trình thay đổi đột xuất</li>
              <li>Nhận gửi hàng hóa, bưu kiện đi trong ngày trên cùng tuyến</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-cream" id="tuyen">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Tuyến đường khai thác</span>
            <h2>Các chặng đang chạy hằng ngày</h2>
            <p>Xe xuất bến liên tục từ 4h30 đến 19h, trung bình một tiếng một chuyến.</p>
          </div>
          <div className="route-grid">
            {routePages.map((r) => (
              <div className="route-card" key={r.slug}>
                <div className="rc-top">
                  <h4>{r.navLabel}</h4>
                  {r.priceFrom && (
                    <div className="price">
                      {r.priceFrom}
                      <small>/khách</small>
                    </div>
                  )}
                </div>
                {r.duration && (
                  <div className="rc-meta">
                    <span>
                      ⏱ <b>{r.duration}</b>
                    </span>
                  </div>
                )}
                <a className="rc-link" href={`/${r.slug}`}>
                  Xem lịch trình chi tiết →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="bang-gia">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Bảng giá dịch vụ</span>
            <h2 style={{ color: "var(--navy)" }}>Bảng giá xe Limousine tuyến Hải Phòng - Hạ Long - Móng Cái</h2>
            <p>Giá vé tính theo đầu khách. Một số điểm lẻ có phụ thu nhẹ nếu yêu cầu đón trả tận nơi ngoài trung tâm.</p>
          </div>
          <div className="price-table-wrap">
            <div className="price-table-scroll">
              <table className="pricing">
                <thead>
                  <tr>
                    <th>Tuyến đường</th>
                    <th>Giá vé</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {routePages.map((r) => (
                    <tr key={r.slug}>
                      <td className="route">{r.navLabel}</td>
                      <td className="price num" data-label="Giá vé">
                        {r.priceFrom || "Liên hệ"}
                      </td>
                      <td className="note" data-label="Ghi chú">
                        {r.duration ? `Thời gian ${r.duration}` : "Đón trả theo yêu cầu"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="price-note">
              Lưu ý: xe chạy liên tục từ 4h30 sáng đến 19h tối, trung bình một tiếng một chuyến. Gọi hotline để
              được báo giá chính xác theo điểm đón trả cụ thể.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Cam kết dịch vụ</span>
            <h2 style={{ color: "#fff" }}>Đi cùng Thùy Dương, khách hàng nhận được gì</h2>
          </div>
          <div className="benefit-grid">
            <div className="benefit">
              <div className="idx">01</div>
              <h4>Tư vấn miễn phí</h4>
              <p>Hỗ trợ chọn giờ chạy và điểm đón phù hợp với lịch trình của khách.</p>
            </div>
            <div className="benefit">
              <div className="idx">02</div>
              <h4>Đón trả đúng giờ</h4>
              <p>Xe có mặt tại điểm hẹn đúng khung giờ đã xác nhận.</p>
            </div>
            <div className="benefit">
              <div className="idx">03</div>
              <h4>Tài xế tận tâm</h4>
              <p>Lái xe thông thuộc cung đường, hỗ trợ hành lý cho khách.</p>
            </div>
            <div className="benefit">
              <div className="idx">04</div>
              <h4>Không phụ phí phát sinh</h4>
              <p>Giá vé thông báo trước là giá cuối cùng.</p>
            </div>
            <div className="benefit">
              <div className="idx">05</div>
              <h4>Hỗ trợ đổi lịch</h4>
              <p>Linh hoạt đổi giờ hoặc hoàn vé khi có thay đổi đột xuất.</p>
            </div>
            <div className="benefit">
              <div className="idx">06</div>
              <h4>Chọn xe theo yêu cầu</h4>
              <p>Có thể đặt riêng nguyên xe cho nhóm, đoàn hoặc gia đình.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream" id="dich-vu">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Dịch vụ</span>
            <h2 style={{ color: "var(--navy)" }}>Ngoài chở khách, chúng tôi còn hỗ trợ</h2>
          </div>
          <div className="service-grid">
            {servicePages.map((s) => (
              <div className="service-card" key={s.slug}>
                <h4>{s.navLabel}</h4>
                <p>{s.metaDescription || s.h1}</p>
                <a className="link" href={`/${s.slug}`}>
                  Xem chi tiết →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lien-he">
        <div className="wrap">
          <div className="contact-wrap">
            <div className="contact-info">
              <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
                Liên hệ
              </span>
              <h3>Đặt vé hoặc hỏi lịch trình</h3>
              <p>Gọi trực tiếp hoặc nhắn Zalo, đội ngũ Thùy Dương Limousine phản hồi trong ít phút.</p>
              <ul className="contact-list">
                <li>
                  <span>📍</span>
                  <div>
                    <b>Địa chỉ</b>15 Nguyễn Bỉnh Khiêm, Ka Long, Móng Cái, Quảng Ninh
                  </div>
                </li>
                <li>
                  <span>☎</span>
                  <div>
                    <b>Hotline đặt vé</b>
                    <a href="tel:0912415045">0912 415 045</a>
                  </div>
                </li>
                <li>
                  <span>💬</span>
                  <div>
                    <b>Zalo</b>
                    <a href="https://zalo.me/0912415045" target="_blank" rel="noopener noreferrer">
                      zalo.me/0912415045
                    </a>
                  </div>
                </li>
              </ul>
              <a className="zalo-btn" href="https://zalo.me/0912415045" target="_blank" rel="noopener noreferrer">
                💬 Chat Zalo ngay
              </a>
            </div>
            <div className="contact-form">
              <h4>Gửi yêu cầu đặt xe</h4>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter servicePages={navPages} />
      <FloatingActions />
    </>
  );
}
