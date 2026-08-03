import { CalendarDays } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

function RegistrationStatus({ rules, currentUnits }) {
  const isValid =
    currentUnits >= rules.minUnits && currentUnits <= rules.maxUnits;

  return (
    <Card padding="md" className="border-blue-200 bg-blue-50/50">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Status & Deadline */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100">
            <CalendarDays size={24} className="text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-slate-900">
                Registration {rules.status}
              </h3>
              <Badge variant="success" size="sm">
                Active
              </Badge>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Closes on {rules.deadline}
            </p>
          </div>
        </div>

        {/* Unit Counters - Added w-fit to prevent stretching */}
        <div className="flex w-fit items-center gap-4 sm:gap-4 rounded-xl border border-slate-200 bg-white px-6 py-3 shadow-sm">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Min
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {rules.minUnits}
            </p>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Current
            </p>
            <p
              className={`text-xl font-bold ${isValid ? "text-green-600" : "text-red-600"}`}
            >
              {currentUnits}
            </p>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Max
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {rules.maxUnits}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default RegistrationStatus;
