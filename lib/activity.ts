import { prisma } from "./prisma";
import { getSession } from "./session";

export async function logActivity(action: "create" | "update" | "delete", targetType: string, targetLabel: string) {
  try {
    const session = await getSession();
    if (!session) return;
    if (session.role === "superadmin") return; // chỉ ghi log của admin thường theo yêu cầu

    await prisma.activityLog.create({
      data: {
        adminUsername: session.username,
        action,
        targetType,
        targetLabel,
      },
    });
  } catch {
    // ghi log thất bại không được làm hỏng thao tác chính
  }
}
