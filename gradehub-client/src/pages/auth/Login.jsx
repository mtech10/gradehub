import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { ShieldCheck, ChartNoAxesColumn, Bell, Cloud } from "lucide-react";
import AuthHeader from "../../components/auth/AuthHeader";
import RememberMe from "../../components/auth/RememberMe";
import AuthLink from "../../components/auth/AuthLink";
import Divider from "../../components/ui/Divider";
import GoogleButton from "../../components/auth/GoogleButton";
import { loginLeftPanel } from "../../constants/authContent";
import Form from "../../components/forms/Form";

function Login() {
  return (
    <AuthLayout leftPanel={loginLeftPanel}>
      <AuthHeader
        title="Login to your account"
        subtitle="Enter your details below to access your account."
      />

      <Form className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <div className="flex items-center justify-between">
          <RememberMe />

          <AuthLink to="/forgot-password">Forgot Password?</AuthLink>
        </div>

        <Button fullWidth size="lg">
          Login
        </Button>

        <Divider />

        <GoogleButton />

        <p className="text-center text-slate-600">
          Don't have an account?{" "}
          <AuthLink to="/register">Create Account</AuthLink>
        </p>
      </Form>
    </AuthLayout>
  );
}

export default Login;
