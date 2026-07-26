// src/constants/theme.js

export const THEME = {
  /* ==========================================
     COLORS
  ========================================== */

  colors: {
    primary: "#2563EB",
    primaryDark: "#1D4ED8",

    secondary: "#0F172A",

    success: "#16A34A",

    warning: "#F59E0B",

    danger: "#DC2626",

    info: "#0EA5E9",

    background: "#F8FAFC",

    surface: "#FFFFFF",

    text: "#0F172A",

    textLight: "#64748B",

    border: "#E2E8F0",
  },

  /* ==========================================
     TYPOGRAPHY
  ========================================== */

  typography: {
    hero: "text-5xl font-bold text-slate-900",

    h1: "text-4xl font-bold text-slate-900",

    h2: "text-3xl font-semibold text-slate-900",

    h3: "text-2xl font-semibold text-slate-900",

    h4: "text-xl font-semibold text-slate-900",

    body: "text-base text-slate-700",

    bodySmall: "text-sm text-slate-600",

    caption: "text-xs text-slate-500",

    label: "text-sm font-medium text-slate-700",
  },

  /* ==========================================
     SPACING
  ========================================== */

  spacing: {
    xs: "space-y-2",

    sm: "space-y-4",

    md: "space-y-6",

    lg: "space-y-8",

    xl: "space-y-10",
  },

  /* ==========================================
     BORDER RADIUS
  ========================================== */

  radius: {
    sm: "rounded-md",

    md: "rounded-xl",

    lg: "rounded-2xl",

    full: "rounded-full",
  },

  /* ==========================================
     SHADOWS
  ========================================== */

  shadows: {
    sm: "shadow-sm",

    md: "shadow-md",

    lg: "shadow-lg",

    xl: "shadow-xl",
  },

  /* ==========================================
     RESPONSIVE BREAKPOINTS
  ========================================== */

  breakpoints: {
    sm: "640px",

    md: "768px",

    lg: "1024px",

    xl: "1280px",
  },

  /* ==========================================
     BUTTON
  ========================================== */

  button: {
    base: "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",

    variants: {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200",

      secondary:
        "bg-slate-900 text-white hover:bg-slate-800 focus:ring-4 focus:ring-slate-200",

      outline:
        "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-4 focus:ring-slate-200",

      ghost: "bg-transparent text-slate-700 hover:bg-slate-100",

      success:
        "bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200",

      danger:
        "bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-200",
    },

    sizes: {
      sm: "h-9 px-4 text-sm",

      md: "h-11 px-5 text-base",

      lg: "h-14 px-7 text-lg",
    },
  },

  linkButton: {
    base: `
    text-sm
    font-semibold
    transition-colors
    duration-200
  `,

    primary: `
    text-blue-600
    hover:text-blue-700
  `,

    secondary: `
    text-slate-600
    hover:text-slate-900
  `,
  },

  /* ==========================================
     INPUT
  ========================================== */

  input: {
    base: "w-full border border-slate-300 bg-white py-3 transition-all outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100",

    label: "mb-2 block text-sm font-medium text-slate-700",

    helper: "mt-2 text-sm text-slate-500",

    error: "border-red-500 focus:border-red-500 focus:ring-red-100",

    errorText: "mt-2 text-sm text-red-600",
  },

  /* ==========================================
     CARD
  ========================================== */

  card: {
    background: "bg-white",

    border: "border border-slate-200",

    padding: {
      none: "p-0",

      sm: "p-4",

      md: "p-6",

      lg: "p-8",
    },
  },

  /* ==========================================
     BADGE
  ========================================== */

  badge: {
    base: `
    inline-flex
    items-center
    justify-center
    font-medium
    whitespace-nowrap
  `,

    variants: {
      primary: "bg-blue-100 text-blue-700",

      success: "bg-green-100 text-green-700",

      warning: "bg-yellow-100 text-yellow-700",

      danger: "bg-red-100 text-red-700",

      info: "bg-sky-100 text-sky-700",

      secondary: "bg-slate-100 text-slate-700",

      purple: "bg-violet-100 text-violet-700",
    },
  },
};
