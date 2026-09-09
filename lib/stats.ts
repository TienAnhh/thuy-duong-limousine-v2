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

export async function getAllTimeTotals() {
  const result = await prisma.dailyStat.aggregate({
    _sum: { pageViews: true, callClicks: true, zaloClicks: true },
  });
  return {
    pageViews: result._sum.pageViews ?? 0,
    callClicks: result._sum.callClicks ?? 0,
    zaloClicks: result._sum.zaloClicks ?? 0,
  };
}

function dateKeysBetween(from: string, to: string): string[] {
  const keys: string[] = [];
  const cursor = new Date(from + "T00:00:00Z");
  const end = new Date(to + "T00:00:00Z");
  // giới hạn tối đa 366 ngày để tránh truy vấn quá lớn nếu chọn nhầm khoảng quá rộng
  let guard = 0;
  while (cursor <= end && guard < 366) {
    keys.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    guard++;
  }
  return keys;
}

export async function getStatsRange(from: string, to: string) {
  const keys = dateKeysBetween(from, to);
  const rows = await prisma.dailyStat.findMany({ where: { date: { in: keys } } });
  const byDate = new Map(rows.map((r) => [r.date, r]));

  const daily = keys.map((date) => {
    const row = byDate.get(date);
    return {
      date,
      label: date.slice(5).replace("-", "/"),
      pageViews: row?.pageViews ?? 0,
      callClicks: row?.callClicks ?? 0,
      zaloClicks: row?.zaloClicks ?? 0,
    };
  });

  const totals = daily.reduce(
    (acc, d) => ({
      pageViews: acc.pageViews + d.pageViews,
      callClicks: acc.callClicks + d.callClicks,
      zaloClicks: acc.zaloClicks + d.zaloClicks,
    }),
    { pageViews: 0, callClicks: 0, zaloClicks: 0 }
  );

  return { daily, totals };
}
