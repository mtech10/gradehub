import Logo from "../ui/Logo";
import AuthFeature from "./AuthFeature";

import towerImage from "../../assets/images/auth/tower.jpg";

function AuthLeftPanel({ badge, title, description, features = [] }) {
  return (
    <section className="hidden lg:grid grid-cols-[44%_56%] bg-white overflow-hidden">
      {/* LEFT CONTENT */}
      {/* INCREASED Z-INDEX: Set to z-30 so the overflowing text stays above the SVG and image */}
      <div className="relative z-30 flex flex-col px-12 py-12 bg-white">
        <Logo />

        {/* OVERFLOW WRAPPER: w-[115%] forces this block to extend 15% past the left column's edge */}
        <div className="w-[115%]">
          <p className="mt-12 text-sm uppercase tracking-[0.25em] font-semibold text-slate-500">
            {badge}
          </p>

          {/* Added a subtle drop-shadow to ensure the text remains readable when overlapping the image */}
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

      {/* RIGHT IMAGE */}
      {/* Set a baseline z-10 for the right container */}
      <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 z-10">
        {/* WAVY SVG MASK */}
        {/* Set to z-20 so it sits above the image, but below the left panel's text (z-30) */}
        <svg
          className="absolute inset-y-0 -left-1 z-20 h-full w-32 text-white drop-shadow-sm md:w-40"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,0 L40,0 C-20,30 120,70 40,100 L0,100 Z" />
        </svg>

        {/* TOWER IMAGE */}
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
