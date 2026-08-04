import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import Card from "../ui/Card";

function QuickLinks({ links = [] }) {
  return (
    <Card title="Quick Links" padding="none">
      <div className="flex flex-col">
        {links.map((link, index) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.title}
              to={link.path}
              className={`
                flex items-center justify-between
                p-5
                transition-colors
                hover:bg-slate-50
                ${index !== links.length - 1 ? "border-b border-slate-100" : ""}
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${link.iconColor}`}
                >
                  <Icon size={20} />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">{link.title}</h4>

                  <p className="text-sm text-slate-500">{link.description}</p>
                </div>
              </div>

              <ChevronRight size={18} className="text-slate-400" />
            </Link>
          );
        })}
      </div>
    </Card>
  );
}

export default QuickLinks;
