import AuthLeftPanel from "../components/auth/AuthLeftPanel";
import AuthRightPanel from "../components/auth/AuthRightPanel";
import AuthFooter from "../components/auth/AuthFooter";

function AuthLayout({ children, leftPanel }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {}
      <main className="flex-1 grid lg:grid-cols-2 mb-5">
        <AuthLeftPanel {...leftPanel} />

        <AuthRightPanel>{children}</AuthRightPanel>
      </main>

      {}
      <AuthFooter />
    </div>
  );
}

export default AuthLayout;
