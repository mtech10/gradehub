import { Link } from "react-router-dom";

function AuthLink({ to, children }) {
  return (
    <Link
      to={to}
      className="
        font-medium
        text-blue-600
        transition-colors
        hover:text-blue-700
      "
    >
      {children}
    </Link>
  );
}

export default AuthLink;
