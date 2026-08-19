import { Link } from "react-router-dom";
import { useLayout } from "../../context/LayoutContext";

function AuthFooter() {
  const { sidebarOpen } = useLayout();

  return (
    <footer className="border-t border-slate-200 bg-white py-4 sm:py-5 px-4 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500 text-center sm:text-left">
        <span>© 2026 GradeHub. All rights reserved.</span>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <Link to="/privacy" className="hover:text-blue-600 transition-colors">
            Privacy Policy
          </Link>

          <span className="hidden sm:inline">•</span>

          <Link to="/terms" className="hover:text-blue-600 transition-colors">
            Terms of Service
          </Link>

          <span className="hidden sm:inline">•</span>

          <Link to="/help" className="hover:text-blue-600 transition-colors">
            Help
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default AuthFooter;
