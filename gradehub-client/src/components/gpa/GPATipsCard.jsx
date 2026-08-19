import { Lightbulb, CheckCircle2 } from "lucide-react";
import Card from "../ui/Card";

function GPATipsCard({ tips }) {
  return (
    <Card padding="lg" className="p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Lightbulb size={18} className="sm:w-5 sm:h-5" />
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-slate-900">
          Tips
        </h3>
      </div>

      <ul className="space-y-3">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-3">
            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0 text-green-500 sm:w-[18px] sm:h-[18px]"
            />
            <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {tip}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default GPATipsCard;
