import { GraduationCap } from "lucide-react";

function Logo({ size = "md", variant = "light" }) {
  const sizes = {
    sm: {
      icon: 22,
      title: "text-xl",
      subtitle: "text-[10px]",
    },
    md: {
      icon: 28,
      title: "text-2xl",
      subtitle: "text-xs",
    },
    lg: {
      icon: 36,
      title: "text-4xl",
      subtitle: "text-sm",
    },
  };

  const current = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
        <GraduationCap size={current.icon} />
      </div>

      <div>
        <h1
          className={`
    font-bold
    ${current.title}
    ${variant === "dark" ? "text-white" : "text-slate-900"}
  `}
        >
          GradeHub
        </h1>

        <p
          className={`
    ${current.subtitle}
    ${variant === "dark" ? "text-slate-400" : "text-slate-500"}
  `}
        >
          {" "}
          Academic Management System
        </p>
      </div>
    </div>
  );
}

export default Logo;
