"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

type StatPoint = {
  label: string;
  pageViews: number;
  callClicks: number;
  zaloClicks: number;
};

export default function AnalyticsChart({ data }: { data: StatPoint[] }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 16, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e5e9" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#6b7580" }} />
          <YAxis tick={{ fontSize: 12, fill: "#6b7580" }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #e2e5e9", fontSize: 13 }}
            labelStyle={{ fontWeight: 600 }}
          />
          <Legend wrapperStyle={{ fontSize: 13 }} />
          <Line type="monotone" dataKey="pageViews" name="Lượt xem trang" stroke="#1f6f78" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="callClicks" name="Click gọi điện" stroke="#b03a2e" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="zaloClicks" name="Click Zalo" stroke="#0068ff" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
