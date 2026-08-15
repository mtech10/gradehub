// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// import { useAuth } from "../../context/AuthContext";

// import AuthLayout from "../../layouts/AuthLayout";

// import Input from "../../components/ui/Input";
// import Button from "../../components/ui/Button";

// import AuthHeader from "../../components/auth/AuthHeader";
// import RememberMe from "../../components/auth/RememberMe";
// import AuthLink from "../../components/auth/AuthLink";
// import GoogleButton from "../../components/auth/GoogleButton";

// import Divider from "../../components/ui/Divider";
// import Form from "../../components/forms/Form";

// import { loginLeftPanel } from "../../constants/authContent";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setError("");
//       setSubmitting(true);

//       const user = await login(formData);
//       const redirectTo = location.state?.from?.pathname;

//       if (redirectTo) {
//         navigate(redirectTo, { replace: true });
//         return;
//       }

//       if (user.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/student");
//       }
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <AuthLayout leftPanel={loginLeftPanel}>
//       <AuthHeader
//         title="Login to your account"
//         subtitle="Enter your details below to access your account."
//       />

//       <Form className="space-y-6" onSubmit={handleSubmit}>
//         <Input
//           name="email"
//           label="Email Address"
//           type="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <Input
//           name="password"
//           label="Password"
//           type="password"
//           placeholder="Enter your password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <div className="flex items-center justify-between">
//           <RememberMe />

//           <AuthLink to="/forgot-password">Forgot Password?</AuthLink>
//         </div>

//         {error && <p className="text-sm text-red-600">{error}</p>}

//         <Button type="submit" fullWidth size="lg" loading={submitting}>
//           Login
//         </Button>

//         <Divider />

//         <GoogleButton />

//         <p className="text-center text-slate-600">
//           Don't have an account?{" "}
//           <AuthLink to="/register">Create Account</AuthLink>
//         </p>
//       </Form>
//     </AuthLayout>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import AuthLayout from "../../layouts/AuthLayout";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import AuthHeader from "../../components/auth/AuthHeader";
import RememberMe from "../../components/auth/RememberMe";
import AuthLink from "../../components/auth/AuthLink";
import GoogleButton from "../../components/auth/GoogleButton";

import Divider from "../../components/ui/Divider";
import Form from "../../components/forms/Form";

import { loginLeftPanel } from "../../constants/authContent";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSubmitting(true);

      const user = await login(formData);

      // Fire success toast notification
      addToast({
        title: "Login Successful",
        message: `Welcome back, ${user.name || "User"}!`,
        type: "success",
      });

      const redirectTo = location.state?.from?.pathname;

      if (redirectTo) {
        navigate(redirectTo, { replace: true });
        return;
      }

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (error) {
      const errorMessage =
        error.message || "Failed to log in. Please check your credentials.";
      setError(errorMessage);

      // Fire error toast notification
      addToast({
        title: "Login Failed",
        message: errorMessage,
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout leftPanel={loginLeftPanel}>
      <AuthHeader
        title="Login to your account"
        subtitle="Enter your details below to access your account."
      />

      <Form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="flex items-center justify-between">
          <RememberMe />

          <AuthLink to="/forgot-password">Forgot Password?</AuthLink>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" fullWidth size="lg" loading={submitting}>
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
