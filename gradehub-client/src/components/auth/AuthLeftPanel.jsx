import Logo from "../ui/Logo";
import AuthFeature from "./AuthFeature";

import towerImage from "../../assets/images/auth/tower.jpg";

function AuthLeftPanel({ badge, title, description, features = [] }) {
  return (
    <section className="hidden lg:grid grid-cols-[44%_56%] bg-white overflow-hidden">
      {}
      {}
      <div className="relative z-30 flex flex-col px-12 py-12 bg-white w-[110%]">
        <Logo />

        {}
        <div className="w-[125%]">
          <p className="mt-12 text-sm uppercase tracking-[0.25em] font-semibold text-slate-500">
            {badge}
          </p>

          {}
          <h1 className="mt-5 text-6xl font-bold leading-tight text-slate-900 drop-shadow-sm">
            {title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600 drop-shadow-sm">
            {description}
          </p>
        </div>

        <div className="w-[130%] mt-10 space-y-6">
          {features.map((feature) => (
            <AuthFeature key={feature.title} {...feature} />
          ))}
        </div>
      </div>

      {}
      {}
      <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 z-10">
        {}
        {}
        <svg
          className="absolute inset-y-0 -left-1 z-20 h-full w-32 text-white drop-shadow-sm md:w-40"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,0 L40,0 C-20,30 120,70 40,100 L0,100 Z" />
        </svg>

        {}
        <img
          src={towerImage}
          alt="University of Ibadan Tower"
          className="image-fade-overlay absolute inset-0 h-full w-full object-cover object-center z-10"
        />
      </div>
    </section>
  );
}

export default AuthLeftPanel;
