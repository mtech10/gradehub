import { Info } from "lucide-react";

import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { gradingScale } from "../../constants/gpaCalculator";

function GradingScaleCard() {
  return (
    <Card title="Grading Scale" padding="lg">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500">
            <th className="pb-3 font-medium">Grade</th>
            <th className="pb-3 font-medium">Grade Point</th>
            <th className="pb-3 font-medium text-right">Range (%)</th>
          </tr>
        </thead>

        <tbody>
          {gradingScale.map((row) => (
            <tr key={row.grade} className="border-t border-slate-100">
              <td className="py-2.5">
                <Badge variant={row.variant} size="sm">
                  {row.grade}
                </Badge>
              </td>
              <td className="py-2.5 text-slate-700">{row.point}</td>
              <td className="py-2.5 text-right text-slate-500">{row.range}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 p-3">
        <Info size={16} className="mt-0.5 shrink-0 text-slate-400" />
        <p className="text-xs text-slate-500">
          Grading scale may vary slightly by department.
        </p>
      </div>
    </Card>
  );
}

export default GradingScaleCard;
