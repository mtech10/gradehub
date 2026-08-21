import { CalendarDays } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

function RegistrationStatus({ rules, currentUnits }) {
  const isValid =
    currentUnits >= rules.minUnits && currentUnits <= rules.maxUnits;

  return (
    <Card padding="md" className="border-blue-200 bg-blue-50/50 p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <CalendarDays size={22} className="sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                Registration {rules.status}
              </h3>
              <Badge variant="success" size="sm">
                Active
              </Badge>
            </div>
            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-600">
              Closes on {rules.deadline}
            </p>
          </div>
        </div>

        {}
        <div className="flex items-center justify-around sm:justify-center w-full lg:w-fit gap-3 sm:gap-4 rounded-xl border border-slate-200 bg-white px-4 sm:px-6 py-3 shadow-sm">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Min
            </p>
            <p className="text-base sm:text-lg font-semibold text-slate-900">
              {rules.minUnits}
            </p>
          </div>

          <div className="h-7 sm:h-8 w-px bg-slate-200" />

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Current
            </p>
            <p
              className={`text-lg sm:text-xl font-bold ${isValid ? "text-green-600" : "text-red-600"}`}
            >
              {currentUnits}
            </p>
          </div>

          <div className="h-7 sm:h-8 w-px bg-slate-200" />

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Max
            </p>
            <p className="text-base sm:text-lg font-semibold text-slate-900">
              {rules.maxUnits}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default RegistrationStatus;
