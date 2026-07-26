import { Link } from "react-router-dom";
import { Mail, User, Phone, Hash, Lock } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import PasswordInput from "../../components/forms/PasswordInput";
import Button from "../../components/ui/Button";

import { DEPARTMENTS, LEVELS } from "../../constants/options";
import { THEME } from "../../constants/theme";
import Form from "../../components/forms/Form";

import { registerLeftPanel } from "../../constants/authContent";
import AuthHeader from "../../components/auth/AuthHeader";

function Register() {
  return (
    <AuthLayout leftPanel={registerLeftPanel}>
      <AuthHeader
        title="Create your account"
        subtitle="Fill in your details to get started"
      />

      <Form className={THEME.spacing.md}>
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            leftIcon={User}
            placeholder="Enter full name"
          />

          <Input
            label="Email Address"
            type="email"
            leftIcon={Mail}
            placeholder="Enter email"
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            leftIcon={Phone}
            placeholder="Enter phone number"
          />

          <Input
            label="Matric Number"
            leftIcon={Hash}
            placeholder="Enter matric number"
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Department"
            options={DEPARTMENTS}
            placeholder="Select department"
          />

          <Select label="Level" options={LEVELS} placeholder="Select level" />
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PasswordInput label="Password" />

          <PasswordInput label="Confirm Password" />
        </div>

        <Button type="submit" fullWidth>
          Create Account
        </Button>

        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            defaultChecked
          />

          <span>
            I agree to the{" "}
            <Link
              to="/terms"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        <div className="text-center">
          <p className={THEME.typography.bodySmall}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign In
            </Link>
          </p>
        </div>
      </Form>
    </AuthLayout>
  );
}

export default Register;
