import AuthLeftPanel from "../components/auth/AuthLeftPanel";
import AuthRightPanel from "../components/auth/AuthRightPanel";
import AuthFooter from "../components/auth/AuthFooter";

function AuthLayout({ children, leftPanel }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <main className="flex-1 grid lg:grid-cols-[50%_50%]">
        <AuthLeftPanel {...leftPanel} />
        <AuthRightPanel>{children}</AuthRightPanel>
      </main>

      <AuthFooter />
    </div>
  );
}

export default AuthLayout;
