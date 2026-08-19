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
  yDomain = [0, 5],
}) {
  return (
    <Card title={title} subtitle={subtitle} padding="none">
      <div className="h-[300px] sm:h-[380px] p-3 sm:p-5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />

            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={yDomain}
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip cursor={{ stroke: "#CBD5E1" }} />

            <Line
              type="monotone"
              dataKey={yKey}
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default CGPAChart;
