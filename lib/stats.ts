import { prisma } from "./prisma";

export function vietnamDateKey(offsetDays = 0): string {
  const now = new Date();
  now.setUTCHours(now.getUTCHours() + 7); // quy đổi sang giờ Việt Nam (UTC+7)
  now.setUTCDate(now.getUTCDate() + offsetDays);
  return now.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

export async function incrementStat(field: "pageViews" | "callClicks" | "zaloClicks") {
  const date = vietnamDateKey();
  await prisma.dailyStat.upsert({
    where: { date },
    create: { date, [field]: 1 },
    update: { [field]: { increment: 1 } },
  });
}

export async function getStatsFor(date: string) {
  const row = await prisma.dailyStat.findUnique({ where: { date } });
  return row || { date, pageViews: 0, callClicks: 0, zaloClicks: 0 };
}

export async function getRecentStats(days: number) {
  const keys: string[] = [];
  for (let i = days - 1; i >= 0; i--) keys.push(vietnamDateKey(-i));

  const rows = await prisma.dailyStat.findMany({ where: { date: { in: keys } } });
  const byDate = new Map(rows.map((r) => [r.date, r]));

  return keys.map((date) => {
    const row = byDate.get(date);
    return {
      date,
      label: date.slice(5).replace("-", "/"), // "08/13"
      pageViews: row?.pageViews ?? 0,
      callClicks: row?.callClicks ?? 0,
      zaloClicks: row?.zaloClicks ?? 0,
    };
  });
}
