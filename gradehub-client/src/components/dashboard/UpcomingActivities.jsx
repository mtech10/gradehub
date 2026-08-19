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
          className={`${THEME.linkButton.base} ${THEME.linkButton.primary} text-xs sm:text-sm`}
        >
          View Calendar
        </button>
      }
    >
      <div className="space-y-3 sm:space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="rounded-xl border border-slate-100 p-3.5 sm:p-4 hover:border-slate-200 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                  {activity.title}
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">{activity.date}</p>
              </div>

              <Badge
                variant={activity.variant}
                className="shrink-0 text-[10px] sm:text-xs"
              >
                {activity.type}
              </Badge>
            </div>

            {activity.description && (
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
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
