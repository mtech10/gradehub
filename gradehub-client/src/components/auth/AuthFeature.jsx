function AuthFeature({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow border border-slate-100">
        <Icon size={24} className="text-blue-600" />
      </div>

      <div>
        <h4 className="font-semibold text-slate-900">{title}</h4>

        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

export default AuthFeature;
