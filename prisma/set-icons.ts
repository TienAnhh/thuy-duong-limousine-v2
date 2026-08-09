import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const icons: Record<string, string> = {
  "tuyen-hai-phong-mong-cai": "🚐",
  "dich-vu-dua-don-san-bay": "✈️",
  "dich-vu-thue-xe-limousine": "🏷️",
  "dich-vu-gui-hang": "📦",
};

async function main() {
  for (const [slug, icon] of Object.entries(icons)) {
    const page = await prisma.page.findUnique({ where: { slug } });
    if (!page) {
      console.log(`Bỏ qua - không tìm thấy trang: ${slug}`);
      continue;
    }
    await prisma.page.update({ where: { slug }, data: { icon } });
    console.log(`Đã gán icon ${icon} cho: ${slug}`);
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
