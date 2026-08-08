import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const username = process.argv[2];
  if (!username) {
    console.log("Cách dùng: npx tsx prisma/set-role.ts <username> [superadmin|admin]");
    process.exit(1);
  }
  const role = process.argv[3] === "admin" ? "admin" : "superadmin";

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) {
    console.log(`Không tìm thấy tài khoản "${username}"`);
    process.exit(1);
  }

  await prisma.admin.update({ where: { username }, data: { role } });
  console.log(`Đã đặt "${username}" thành vai trò: ${role}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
