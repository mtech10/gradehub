import { CalendarDays } from "lucide-react";
import { upcomingActivities } from "../../constants/upcomingActivities";
import { CARD_HEIGHT, SCROLLBAR } from "../../constants/layout";
import Card from "../ui/Card";

function UpcomingActivities() {
  return (
    <Card
      title="Upcoming Activities"
      subtitle="Don't miss these events"
      padding="none"
    >
      <div className={`h-[420px] overflow-y-auto p-6 space-y-5 ${SCROLLBAR}`}>
        {" "}
        {upcomingActivities.map((activity) => (
          <div
            key={activity.title}
            className="flex gap-4 rounded-2xl border border-slate-100 p-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <CalendarDays size={22} className="text-blue-600" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">{activity.title}</h3>

              <p className="text-sm text-slate-500">{activity.type}</p>
            </div>

            <span className="text-sm text-slate-500">{activity.date}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default UpcomingActivities;
