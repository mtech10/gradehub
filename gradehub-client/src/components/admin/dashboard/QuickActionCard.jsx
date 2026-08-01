import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const colors = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-emerald-100 text-emerald-600",
  orange: "bg-orange-100 text-orange-600",
  purple: "bg-purple-100 text-purple-600",
  indigo: "bg-indigo-100 text-indigo-600",
  rose: "bg-rose-100 text-rose-600",
};

function QuickActionCard({ action }) {
  const navigate = useNavigate();

  const Icon = action.icon;

  return (
    <button
      onClick={() => navigate(action.path)}
      className="
        group
        w-full
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        text-left
        transition-all
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-lg
      "
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors[action.color]}`}
        >
          <Icon size={22} />
        </div>

        <ArrowRight
          size={18}
          className="text-slate-400 transition group-hover:translate-x-1"
        />
      </div>

      <h4 className="mt-5 font-semibold text-slate-900">{action.title}</h4>

      <p className="mt-1 text-sm text-slate-500">{action.description}</p>
    </button>
  );
}

export default QuickActionCard;
