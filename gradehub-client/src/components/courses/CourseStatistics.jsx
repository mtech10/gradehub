import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import {
  ClipboardList,
  ClipboardCheck,
  Clipboard,
  Calculator,
} from "lucide-react";
import Card from "../ui/Card";
import { THEME } from "../../constants/theme";

// Mock Data Sets
const statsData = {
  "this-session": {
    total: 32,
    chart: [
      { name: "In Progress", value: 5, color: THEME.colors.info },
      { name: "Completed", value: 27, color: THEME.colors.success },
      { name: "Dropped", value: 0, color: THEME.colors.warning },
    ],
    list: [
      { label: "Total Units Registered", value: "98", icon: ClipboardList },
      { label: "Total Units Completed", value: "81", icon: ClipboardCheck },
      { label: "Total Units Remaining", value: "17", icon: Clipboard },
      { label: "Average Unit Load", value: "19.6", icon: Calculator },
    ],
  },
  "all-time": {
    total: 145,
    chart: [
      { name: "In Progress", value: 5, color: THEME.colors.info },
      { name: "Completed", value: 138, color: THEME.colors.success },
      { name: "Dropped", value: 2, color: THEME.colors.warning },
    ],
    list: [
      { label: "Total Units Registered", value: "342", icon: ClipboardList },
      { label: "Total Units Completed", value: "325", icon: ClipboardCheck },
      { label: "Total Units Remaining", value: "17", icon: Clipboard },
      { label: "Average Unit Load", value: "21.4", icon: Calculator },
    ],
  },
};

function CourseStatistics() {
  const [timeframe, setTimeframe] = useState("this-session");
  const currentData = statsData[timeframe];

  return (
    <Card
      title="Course Statistics"
      headerAction={
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="this-session">This Session</option>
          <option value="all-time">All Time</option>
        </select>
      }
    >
      {/* Chart Section */}
      <div className="mb-8 flex items-center gap-6">
        <div className="relative flex h-[100px] w-[100px] shrink-0 items-center justify-center">
          <PieChart width={100} height={100}>
            <Pie
              data={currentData.chart}
              cx="50%"
              cy="50%"
              innerRadius={36}
              outerRadius={50}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              animationDuration={500}
            >
              {currentData.chart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-900">
              {currentData.total}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
              Total
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2">
          {currentData.chart.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600">{item.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-slate-900">
                  {item.value}
                </span>
                <span className="w-8 text-right text-slate-400">
                  ({Math.round((item.value / currentData.total) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* List Section */}
      <div className="space-y-4">
        {currentData.list.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-50">
                  <Icon size={14} className="text-blue-600" />
                </div>
                <span className="text-sm text-slate-600">{stat.label}</span>
              </div>
              <span className="font-semibold text-slate-900">{stat.value}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default CourseStatistics;
