import Logo from "../ui/Logo";

function AuthHeader({ title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <div className="mb-8 flex justify-center">
        <Logo />
      </div>

      <h1 className="text-[48px] font-bold tracking-tight text-slate-900">
        {title}
      </h1>

      <p className="mt-4 text-lg text-slate-500">{subtitle}</p>
    </div>
  );
}

export default AuthHeader;
