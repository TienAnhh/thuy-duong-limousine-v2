import { getStatsFor, getRecentStats, vietnamDateKey } from "@/lib/stats";
import AdminShell from "@/components/admin/AdminShell";
import AnalyticsChart from "@/components/admin/AnalyticsChart";

export const dynamic = "force-dynamic";

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="admin-card">
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value.toLocaleString("vi-VN")}</div>
      <div style={{ color: "var(--admin-muted)", fontSize: 13.5 }}>{title}</div>
    </div>
  );
}

export default async function AdminAnalyticsPage() {
  const todayKey = vietnamDateKey(0);
  const yesterdayKey = vietnamDateKey(-1);
  const [today, yesterday, recent] = await Promise.all([
    getStatsFor(todayKey),
    getStatsFor(yesterdayKey),
    getRecentStats(14),
  ]);

  return (
    <AdminShell active="analytics">
      <p className="admin-h1">Thống kê truy cập</p>

      <div style={{ marginBottom: 10, fontWeight: 600, color: "var(--admin-text)" }}>Hôm nay</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard title="Lượt xem trang" value={today.pageViews} />
        <StatCard title="Click gọi điện" value={today.callClicks} />
        <StatCard title="Click Zalo" value={today.zaloClicks} />
      </div>

      <div style={{ marginBottom: 10, fontWeight: 600, color: "var(--admin-text)" }}>Hôm qua</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard title="Lượt xem trang" value={yesterday.pageViews} />
        <StatCard title="Click gọi điện" value={yesterday.callClicks} />
        <StatCard title="Click Zalo" value={yesterday.zaloClicks} />
      </div>

      <div style={{ marginBottom: 10, fontWeight: 600, color: "var(--admin-text)" }}>14 ngày gần nhất</div>
      <div className="admin-card">
        <AnalyticsChart data={recent} />
      </div>
    </AdminShell>
  );
}
