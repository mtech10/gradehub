function DashboardHeader() {
  const hour = new Date().getHours();

  let greeting = "Good morning";

  if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon";
  }

  if (hour >= 17) {
    greeting = "Good evening";
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          {greeting}, Ademola! 👋
        </h1>

        <p className="mt-2 text-lg text-slate-500">
          Here's an overview of your academic performance.
        </p>
      </div>

      <div className="text-right">
        <p className="text-lg font-medium text-slate-700">{today}</p>

        <p className="mt-2 text-slate-500">☀️ 25°C</p>
      </div>
    </div>
  );
}

export default DashboardHeader;
