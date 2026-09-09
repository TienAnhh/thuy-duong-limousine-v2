import { getStatsFor, getStatsRange, getAllTimeTotals, vietnamDateKey } from "@/lib/stats";
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

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string };
}) {
  const todayKey = vietnamDateKey(0);
  const yesterdayKey = vietnamDateKey(-1);
  const defaultFrom = vietnamDateKey(-13); // mặc định 14 ngày gần nhất, giống trước đây

  const fromKey = searchParams.from || defaultFrom;
  const toKey = searchParams.to || todayKey;

  const [today, yesterday, allTime, range] = await Promise.all([
    getStatsFor(todayKey),
    getStatsFor(yesterdayKey),
    getAllTimeTotals(),
    getStatsRange(fromKey, toKey),
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

      <div style={{ marginBottom: 10, fontWeight: 600, color: "var(--admin-text)" }}>Tổng từ trước đến nay</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard title="Lượt xem trang" value={allTime.pageViews} />
        <StatCard title="Click gọi điện" value={allTime.callClicks} />
        <StatCard title="Click Zalo" value={allTime.zaloClicks} />
      </div>

      <div style={{ marginBottom: 10, fontWeight: 600, color: "var(--admin-text)" }}>Xem theo khoảng ngày</div>
      <form method="GET" style={{ display: "flex", gap: 12, alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap" }}>
        <div className="admin-field" style={{ marginBottom: 0 }}>
          <label>Từ ngày</label>
          <input type="date" name="from" defaultValue={fromKey} required />
        </div>
        <div className="admin-field" style={{ marginBottom: 0 }}>
          <label>Đến ngày</label>
          <input type="date" name="to" defaultValue={toKey} required />
        </div>
        <button className="admin-btn" type="submit">
          Xem
        </button>
      </form>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
        <StatCard title="Lượt xem trang (trong khoảng)" value={range.totals.pageViews} />
        <StatCard title="Click gọi điện (trong khoảng)" value={range.totals.callClicks} />
        <StatCard title="Click Zalo (trong khoảng)" value={range.totals.zaloClicks} />
      </div>

      <div className="admin-card">
        <AnalyticsChart data={range.daily} />
      </div>
    </AdminShell>
  );
}
