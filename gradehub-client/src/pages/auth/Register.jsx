// import { Link } from "react-router-dom";
// import { Mail, User, Phone, Hash, Lock } from "lucide-react";

// import AuthLayout from "../../layouts/AuthLayout";
// import Input from "../../components/ui/Input";
// import Select from "../../components/ui/Select";
// import PasswordInput from "../../components/forms/PasswordInput";
// import Button from "../../components/ui/Button";

// import { DEPARTMENTS, LEVELS } from "../../constants/options";
// import { THEME } from "../../constants/theme";
// import Form from "../../components/forms/Form";

// import { registerLeftPanel } from "../../constants/authContent";
// import AuthHeader from "../../components/auth/AuthHeader";

// function Register() {
//   return (
//     <AuthLayout leftPanel={registerLeftPanel}>
//       <AuthHeader
//         title="Create your account"
//         subtitle="Fill in your details to get started"
//       />

//       <Form className={THEME.spacing.md}>
//         {/* Row 1 */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Input
//             label="Full Name"
//             leftIcon={User}
//             placeholder="Enter full name"
//           />

//           <Input
//             label="Email Address"
//             type="email"
//             leftIcon={Mail}
//             placeholder="Enter email"
//           />
//         </div>

//         {/* Row 2 */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Input
//             label="Phone Number"
//             leftIcon={Phone}
//             placeholder="Enter phone number"
//           />

//           <Input
//             label="Matric Number"
//             leftIcon={Hash}
//             placeholder="Enter matric number"
//           />
//         </div>

//         {/* Row 3 */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Select
//             label="Department"
//             options={DEPARTMENTS}
//             placeholder="Select department"
//           />

//           <Select label="Level" options={LEVELS} placeholder="Select level" />
//         </div>

//         {/* Row 4 */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <PasswordInput label="Password" />

//           <PasswordInput label="Confirm Password" />
//         </div>

//         <Button type="submit" fullWidth>
//           Create Account
//         </Button>

//         <label className="flex items-start gap-3 text-sm text-slate-600">
//           <input
//             type="checkbox"
//             className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
//             defaultChecked
//           />

//           <span>
//             I agree to the{" "}
//             <Link
//               to="/terms"
//               className="font-medium text-blue-600 hover:text-blue-700"
//             >
//               Terms of Service
//             </Link>{" "}
//             and{" "}
//             <Link
//               to="/privacy"
//               className="font-medium text-blue-600 hover:text-blue-700"
//             >
//               Privacy Policy
//             </Link>
//           </span>
//         </label>

//         <div className="text-center">
//           <p className={THEME.typography.bodySmall}>
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="font-semibold text-blue-600 hover:text-blue-700"
//             >
//               Sign In
//             </Link>
//           </p>
//         </div>
//       </Form>
//     </AuthLayout>
//   );
// }

// export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User, Phone, Hash } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import PasswordInput from "../../components/forms/PasswordInput";
import Button from "../../components/ui/Button";
import { useToast } from "../../context/ToastContext";
import authService from "../../services/authService";

import { DEPARTMENTS, LEVELS } from "../../constants/options";
import { THEME } from "../../constants/theme";
import Form from "../../components/forms/Form";

import { registerLeftPanel } from "../../constants/authContent";
import AuthHeader from "../../components/auth/AuthHeader";

function Register() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    matricNumber: "",
    department: "",
    level: "",
    password: "",
    confirmPassword: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      const msg = "Passwords do not match.";
      setError(msg);
      addToast({ title: "Validation Error", message: msg, type: "error" });
      return;
    }

    try {
      setError("");
      setSubmitting(true);

      await authService.register(formData);

      addToast({
        title: "Account Created!",
        message: "Your account has been successfully created. Please sign in.",
        type: "success",
      });

      navigate("/login");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to create account.";
      setError(msg);
      addToast({
        title: "Registration Failed",
        message: msg,
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout leftPanel={registerLeftPanel}>
      <AuthHeader
        title="Create your account"
        subtitle="Fill in your details to get started"
      />

      <Form className={THEME.spacing.md} onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            leftIcon={User}
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            leftIcon={Mail}
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            leftIcon={Phone}
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <Input
            label="Matric Number"
            leftIcon={Hash}
            placeholder="Enter matric number"
            value={formData.matricNumber}
            onChange={(e) => handleChange("matricNumber", e.target.value)}
            required
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Department"
            options={DEPARTMENTS}
            placeholder="Select department"
            value={formData.department}
            onChange={(value) => handleChange("department", value)}
          />

          <Select
            label="Level"
            options={LEVELS}
            placeholder="Select level"
            value={formData.level}
            onChange={(value) => handleChange("level", value)}
          />
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PasswordInput
            label="Password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />

          <PasswordInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" fullWidth loading={submitting}>
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
