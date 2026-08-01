import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import Card from "../../ui/Card";
import Button from "../../ui/Button";

import { upcomingActivities } from "../../../constants/admin/dashboardData";

const colors = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-emerald-100 text-emerald-600",
  orange: "bg-orange-100 text-orange-600",
  purple: "bg-purple-100 text-purple-600",
};

function UpcomingActivities() {
  const navigate = useNavigate();

  return (
    <Card padding="lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Upcoming Activities
          </h3>

          <p className="text-sm text-slate-500">Important academic events</p>
        </div>

        <Button size="sm" onClick={() => navigate("/admin/calendar")}>
          Calendar
        </Button>
      </div>

      <div className="space-y-4">
        {upcomingActivities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-blue-200 hover:bg-slate-50"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors[activity.color]}`}
              >
                <Icon size={20} />
              </div>

              <div className="flex-1">
                <p className="font-medium text-slate-900">{activity.title}</p>

                <p className="text-sm text-slate-500">{activity.date}</p>
              </div>

              <ChevronRight size={18} className="text-slate-400" />
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default UpcomingActivities;
