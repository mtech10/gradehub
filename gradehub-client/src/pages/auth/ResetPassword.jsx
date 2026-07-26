import { Link } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import PasswordInput from "../../components/forms/PasswordInput";
import Button from "../../components/ui/Button";
import { THEME } from "../../constants/theme";
import Form from "../../components/forms/Form";

function ResetPassword() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new password for your GradeHub account."
    >
      <Form>
        <PasswordInput
          label="New Password"
          name="password"
          autoComplete="new-password"
          required
        />

        <PasswordInput
          label="Confirm New Password"
          name="confirmPassword"
          autoComplete="new-password"
          required
        />

        <Button type="submit" fullWidth>
          Update Password
        </Button>

        <div className="text-center">
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Back to Login
          </Link>
        </div>
      </Form>
    </AuthLayout>
  );
}

export default ResetPassword;
