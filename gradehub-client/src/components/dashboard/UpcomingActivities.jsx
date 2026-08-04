import Card from "../ui/Card";
import Badge from "../ui/Badge";

import { THEME } from "../../constants/theme";

function UpcomingActivities({
  activities = [],
  title = "Upcoming Activities",
  subtitle = "Academic calendar and deadlines",
}) {
  return (
    <Card
      title={title}
      subtitle={subtitle}
      headerAction={
        <button
          type="button"
          className={`${THEME.linkButton.base} ${THEME.linkButton.primary}`}
        >
          View Calendar
        </button>
      }
    >
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {activity.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">{activity.date}</p>
              </div>

              <Badge variant={activity.variant}>{activity.type}</Badge>
            </div>

            {activity.description && (
              <p className="mt-3 text-sm text-slate-600">
                {activity.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
export default UpcomingActivities;
