import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";
import AuthFooter from "../components/auth/AuthFooter";

function StudentLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-420 px-8 py-6">
            <Outlet />
          </div>
        </main>
        <AuthFooter />
      </div>
    </div>
  );
}

export default StudentLayout;
