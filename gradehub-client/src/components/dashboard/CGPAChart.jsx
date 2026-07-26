import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { cgpaTrend } from "../../constants/chartData";
import Card from "../ui/Card";

function CGPAChart() {
  return (
    <Card
      title="CGPA Trend"
      subtitle="Academic performance over time"
      padding="none"
    >
      <div className="h-[420px] p-6">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={cgpaTrend}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="semester" />

            <YAxis domain={[3.5, 5]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="cgpa"
              stroke="#2563EB"
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "#2563EB",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default CGPAChart;
