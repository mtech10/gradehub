import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import PasswordInput from "../../components/forms/PasswordInput";
import Button from "../../components/ui/Button";
import Form from "../../components/forms/Form";
import { useToast } from "../../context/ToastContext";

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      addToast({
        title: "Validation Error",
        message: "Your passwords do not match.",
        type: "warning",
      });
      return;
    }

    setSubmitting(true);

    // Simulate API Call
    setTimeout(() => {
      setSubmitting(false);
      addToast({
        title: "Password Reset Successful",
        message: "Your account password has been updated. Please log in.",
        type: "success",
      });
      navigate("/login");
    }, 1500);
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new password for your GradeHub account."
    >
      <Form onSubmit={handleSubmit}>
        <PasswordInput
          label="New Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />

        <PasswordInput
          label="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />

        <Button type="submit" fullWidth loading={submitting}>
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
