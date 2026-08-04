import { Lightbulb, CheckCircle2 } from "lucide-react";

import Card from "../ui/Card";

function GPATipsCard({ tips }) {
  return (
    <Card padding="lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <Lightbulb size={20} className="text-blue-600" />
        </div>

        <h3 className="text-lg font-semibold text-slate-900">Tips</h3>
      </div>

      <ul className="space-y-3">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-3">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-green-500"
            />
            <span className="text-sm text-slate-600">{tip}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default GPATipsCard;
