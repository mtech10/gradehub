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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
          {greeting}, Ademola! 👋
        </h1>

        <p className="mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg text-slate-500">
          Here's an overview of your academic performance.
        </p>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
        <p className="text-xs sm:text-sm lg:text-base font-medium text-slate-700">
          {today}
        </p>
        <p className="text-xs sm:text-sm text-slate-500 sm:mt-1">☀️ 25°C</p>
      </div>
    </div>
  );
}

export default DashboardHeader;
