import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import Card from "../ui/Card";

function CGPAChart({
  title = "CGPA Trend",
  subtitle = "Academic performance over time",
  data = [],
  xKey = "semester",
  yKey = "cgpa",
  yDomain = [3.5, 5],
}) {
  return (
    <Card title={title} subtitle={subtitle} padding="none">
      <div className="h-[420px] p-6">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />

            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={yDomain}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip cursor={{ stroke: "#CBD5E1" }} />

            <Line
              type="monotone"
              dataKey={yKey}
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default CGPAChart;
