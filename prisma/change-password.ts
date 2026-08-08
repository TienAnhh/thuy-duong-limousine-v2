import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function main() {
  const username = process.argv[2];
  const newPassword = process.argv[3];

  if (!username || !newPassword) {
    console.log("Cách dùng: npx tsx prisma/change-password.ts <username> <mat-khau-moi>");
    process.exit(1);
  }

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) {
    console.log(`Không tìm thấy tài khoản "${username}"`);
    process.exit(1);
  }

  await prisma.admin.update({
    where: { username },
    data: { passwordHash: await hashPassword(newPassword) },
  });

  console.log(`Đã đổi mật khẩu cho "${username}" thành công.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
