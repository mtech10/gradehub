import Card from "../ui/Card";
import Badge from "../ui/Badge";

function ProfileMainCard({ data }) {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {}
        <div className="flex w-full flex-col items-center border-b border-slate-100 p-8 lg:w-1/3 lg:border-b-0 lg:border-r">
          <img
            src={data.personal.avatar}
            alt="Profile Avatar"
            className="mb-4 h-32 w-32 rounded-full object-cover shadow-sm"
          />
          <h2 className="text-2xl font-bold text-slate-900">
            {data.personal.name}
          </h2>
          <Badge variant="primary" rounded="full" className="mt-2 mb-8">
            {data.personal.levelBadge}
          </Badge>

          <div className="w-full space-y-4">
            {data.personal.contact.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-slate-600"
                >
                  <Icon size={18} className="shrink-0 text-slate-400" />
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {}
        <div className="w-full p-8 lg:w-2/3">
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {data.details.map((detail) => {
              const Icon = detail.icon;
              return (
                <div key={detail.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 mb-1">
                      {detail.label}
                    </p>
                    {detail.isBadge ? (
                      <Badge variant="success" size="sm">
                        {detail.value}
                      </Badge>
                    ) : (
                      <p className="text-sm font-semibold text-slate-900">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProfileMainCard;
