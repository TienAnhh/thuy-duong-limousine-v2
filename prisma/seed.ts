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
      icon: "🚐",
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
      icon: "✈️",
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
      icon: "🏷️",
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
      icon: "📦",
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

  const priceRows = [
    { route: "Hải Phòng – Vân Đồn", price: "250.000đ", duration: "~1h30", note: "1 khách trả đầu cao tốc, từ 2 khách hỗ trợ trả tận nơi", sortOrder: 1 },
    { route: "Hải Phòng – Tiên Yên, Đầm Hà", price: "250.000 – 300.000đ", duration: "~2h00", note: "300k khi trả tận nơi tại Đầm Hà", sortOrder: 2 },
    { route: "Hải Phòng – Hải Hà, Móng Cái", price: "300.000đ", duration: "~2h30", note: "Đón trả trung tâm", sortOrder: 3 },
    { route: "Móng Cái – Sân bay Cát Bi", price: "300.000đ", duration: "~1h00", note: "Đón trả tận sảnh", sortOrder: 4 },
    { route: "Hải Phòng – Hạ Long (Hòn Gai, Bãi Cháy)", price: "170.000 – 200.000đ", duration: "~1h15", note: "Đón trả trung tâm", sortOrder: 5 },
    { route: "Hải Phòng – Móng Cái (Trà Cổ, Bình Ngọc)", price: "350.000đ", duration: "~3h00", note: "Đón trả tận nơi", sortOrder: 6 },
    { route: "Móng Cái – Trung tâm Hải Phòng", price: "300.000đ", duration: "~2h30", note: "Đón trả tận nơi", sortOrder: 7 },
    { route: "Móng Cái – Đồ Sơn", price: "350.000 – 400.000đ", duration: "~3h00", note: "400k/khách lẻ, 350k/người từ 2 khách", sortOrder: 8 },
    { route: "Móng Cái – Thủy Nguyên", price: "350.000đ", duration: "~2h30–3h", note: "Đón trả tận nơi", sortOrder: 9 },
    { route: "Móng Cái – KCN Tràng Duệ", price: "350.000 – 400.000đ", duration: "~3h00", note: "400k/khách lẻ, 350k/người từ 2 khách", sortOrder: 10 },
    { route: "Hạ Long (Hà Tu) – Trung tâm Móng Cái", price: "300.000đ", duration: "~2h00", note: "Chạy cao tốc", sortOrder: 11 },
    { route: "Trung tâm Hạ Long – Trung tâm Móng Cái", price: "250.000đ", duration: "~2h00", note: "Chạy cao tốc", sortOrder: 12 },
    { route: "Trung tâm Hạ Long – Trà Cổ, Bình Ngọc", price: "300.000đ", duration: "~2h15", note: "Đón trả tận nơi", sortOrder: 13 },
  ];

  const existingPriceCount = await prisma.priceRow.count();
  if (existingPriceCount === 0) {
    await prisma.priceRow.createMany({ data: priceRows });
    console.log(`Đã seed ${priceRows.length} dòng bảng giá.`);
  } else {
    console.log("Bảng giá đã có dữ liệu, bỏ qua.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
