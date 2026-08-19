import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import Card from "../ui/Card";

function CourseStatistics({ statistics = {} }) {
  const [timeframe, setTimeframe] = useState("this-session");
  const currentData = statistics[timeframe];

  if (!currentData) return null;

  return (
    <Card
      title="Course Statistics"
      headerAction={
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs sm:text-sm font-medium text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="this-session">This Session</option>
          <option value="all-time">All Time</option>
        </select>
      }
    >
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-4">
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

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg sm:text-xl font-bold text-slate-900">
              {currentData.total}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
              Total
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-2 w-full">
          {currentData.chart.map((item) => {
            const percentage =
              currentData.total > 0
                ? Math.round((item.value / currentData.total) * 100)
                : 0;

            return (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600 truncate">{item.name}</span>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className="font-semibold text-slate-900">
                    {item.value}
                  </span>
                  <span className="w-8 text-right text-slate-400">
                    ({percentage}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {currentData.list.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0 gap-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-blue-50">
                  <Icon size={14} className="text-blue-600" />
                </div>
                <span className="text-xs sm:text-sm text-slate-600 truncate">
                  {stat.label}
                </span>
              </div>
              <span className="font-semibold text-slate-900 text-xs sm:text-sm shrink-0">
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default CourseStatistics;
