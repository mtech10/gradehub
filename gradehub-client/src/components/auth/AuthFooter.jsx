import { Link } from "react-router-dom";

function AuthFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 text-sm text-slate-500">
        <span>© 2026 GradeHub. All rights reserved.</span>

        <Link to="/privacy" className="hover:text-blue-600">
          Privacy Policy
        </Link>

        <span>•</span>

        <Link to="/terms" className="hover:text-blue-600">
          Terms of Service
        </Link>

        <span>•</span>

        <Link to="/help" className="hover:text-blue-600">
          Help
        </Link>
      </div>
    </footer>
  );
}

export default AuthFooter;
