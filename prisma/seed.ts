import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function main() {
  const adminUsername = process.env.SEED_ADMIN_USERNAME || "admin";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "admin123";

  const existing = await prisma.admin.findUnique({ where: { username: adminUsername } });
  if (!existing) {
    await prisma.admin.create({
      data: {
        username: adminUsername,
        passwordHash: await hashPassword(adminPassword),
        role: "superadmin",
        active: true,
      },
    });
    console.log(`Đã tạo admin: ${adminUsername} / ${adminPassword} (đổi mật khẩu sau khi đăng nhập lần đầu)`);
  } else {
    console.log("Admin đã tồn tại, bỏ qua.");
  }

  const pages = [
    {
      slug: "home",
      type: "static",
      navLabel: "Trang chủ",
      h1: "Nối phố cảng Hải Phòng với biên giới Móng Cái, mỗi giờ một chuyến",
      metaTitle: "Thùy Dương Limousine | Xe Limousine Hải Phòng - Hạ Long - Móng Cái",
      metaDescription: "Thùy Dương Limousine chạy tuyến Hải Phòng - Hạ Long - Móng Cái, đón trả tận nơi, tần suất 1 tiếng/chuyến từ 4h30 đến 19h.",
      keywords: "xe limousine hải phòng móng cái, xe limousine hạ long",
      bannerUrl: "/images/hero-banner.jpg",
      bodyHtml: "<p>Thùy Dương Limousine khai thác tuyến cao tốc Hải Phòng - Hạ Long - Móng Cái, phục vụ khách du lịch, người đi công tác, học sinh sinh viên và khách đi khám chữa bệnh.</p>",
      sortOrder: 0,
    },
    {
      slug: "tuyen-hai-phong-mong-cai",
      type: "route",
      navLabel: "Hải Phòng - Móng Cái",
      h1: "Xe Limousine Hải Phòng - Móng Cái",
      metaTitle: "Xe Limousine Hải Phòng - Móng Cái | Đón trả tận nơi",
      metaDescription: "Xe limousine Hải Phòng đi Móng Cái, giá từ 300.000đ, chạy liên tục 4h30-19h.",
      keywords: "xe limousine hải phòng móng cái",
      priceFrom: "300.000đ",
      duration: "~2h30 - 3h00",
      bodyHtml: "<p>Tuyến chủ lực, kết nối trung tâm Hải Phòng với thành phố biên giới Móng Cái.</p>",
      sortOrder: 1,
    },
    {
      slug: "dich-vu-dua-don-san-bay",
      type: "service",
      navLabel: "Đưa đón sân bay",
      h1: "Dịch vụ đưa đón sân bay Cát Bi",
      metaTitle: "Dịch vụ đưa đón sân bay Cát Bi - Hải Phòng",
      metaDescription: "Đưa đón tận nơi từ và đến sân bay Cát Bi, giá 300.000đ/khách.",
      keywords: "đưa đón sân bay cát bi",
      priceFrom: "300.000đ",
      bodyHtml: "<p>Thùy Dương Limousine bố trí xe đón khách tận sảnh sân bay Cát Bi.</p>",
      sortOrder: 2,
    },
    {
      slug: "dich-vu-thue-xe-limousine",
      type: "service",
      navLabel: "Cho thuê xe Limousine",
      h1: "Cho thuê xe Limousine theo đoàn",
      metaTitle: "Cho thuê xe Limousine theo đoàn, theo ngày",
      metaDescription: "Cho thuê xe Limousine theo chuyến hoặc theo ngày, phục vụ đoàn khách.",
      keywords: "thuê xe limousine theo đoàn",
      bodyHtml: "<p>Cho thuê nguyên xe Limousine theo chuyến hoặc theo ngày, lịch trình chủ động.</p>",
      sortOrder: 3,
    },
    {
      slug: "dich-vu-gui-hang",
      type: "service",
      navLabel: "Gửi hàng nhanh",
      h1: "Dịch vụ gửi hàng nhanh trong ngày",
      metaTitle: "Dịch vụ gửi hàng nhanh trong ngày",
      metaDescription: "Nhận gửi hàng hóa, bưu kiện, giấy tờ nhanh trong ngày trên tuyến Hải Phòng - Hạ Long - Móng Cái.",
      keywords: "gửi hàng hải phòng móng cái",
      bodyHtml: "<p>Tận dụng lịch xe chạy liên tục để giao hàng nhanh trong ngày.</p>",
      sortOrder: 4,
    },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    });
  }
  console.log(`Đã seed ${pages.length} trang mặc định.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
