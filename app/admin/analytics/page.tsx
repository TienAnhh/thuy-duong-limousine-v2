import { getStatsFor, vietnamDateKey } from "@/lib/stats";
import AdminShell from "@/components/admin/AdminShell";

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
  const [today, yesterday] = await Promise.all([getStatsFor(todayKey), getStatsFor(yesterdayKey)]);

  return (
    <AdminShell active="analytics">
      <p className="admin-h1">Thống kê truy cập</p>
      <p className="admin-sub">
        Số liệu tự đếm riêng của website (không tính khi admin duyệt trong khu vực quản trị). Ngày tính theo giờ
        Việt Nam.
      </p>

      <div style={{ marginBottom: 10, fontWeight: 600, color: "var(--admin-text)" }}>
        Hôm nay ({new Date().toLocaleDateString("vi-VN")})
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard title="Lượt xem trang" value={today.pageViews} />
        <StatCard title="Click gọi điện" value={today.callClicks} />
        <StatCard title="Click Zalo" value={today.zaloClicks} />
      </div>

      <div style={{ marginBottom: 10, fontWeight: 600, color: "var(--admin-text)" }}>Hôm qua</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <StatCard title="Lượt xem trang" value={yesterday.pageViews} />
        <StatCard title="Click gọi điện" value={yesterday.callClicks} />
        <StatCard title="Click Zalo" value={yesterday.zaloClicks} />
      </div>

      <p style={{ marginTop: 24, fontSize: 12.5, color: "var(--admin-muted)" }}>
        Lưu ý: đây là bộ đếm riêng, độc lập với Google Analytics — chỉ tính số click vào cụm nút gọi/Zalo nổi ở
        góc màn hình, chưa tính các link gọi/Zalo khác nằm rải rác trong trang.
      </p>
    </AdminShell>
  );
}
