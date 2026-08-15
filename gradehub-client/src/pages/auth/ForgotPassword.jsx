// import { useState } from "react";
// import { Lock, Mail, IdCard, Send, ArrowLeft } from "lucide-react";
// import Form from "../../components/forms/Form";
// import AuthToggle from "../../components/auth/AuthToggle";
// import Input from "../../components/ui/Input";
// import Divider from "../../components/ui/Divider";
// import AuthLink from "../../components/auth/AuthLink";
// import Button from "../../components/ui/Button";
// import AuthLayout from "../../layouts/AuthLayout";
// import { forgotPasswordLeftPanel } from "../../constants/authContent";

// function ForgotPassword() {
//   const [method, setMethod] = useState("email");

//   return (
//     <AuthLayout leftPanel={forgotPasswordLeftPanel}>
//       <div className="space-y-8">
//         {/* Lock Icon */}

//         <div className="flex justify-center">
//           <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-blue-50">
//             <Lock size={42} className="text-blue-600" />

//             <span className="absolute -right-1 top-3 h-3 w-3 rounded-full bg-blue-400" />
//             <span className="absolute left-0 top-1/2 h-3 w-3 rounded-full bg-blue-300" />
//           </div>
//         </div>

//         {/* Header */}

//         <div className="text-center">
//           <h2 className="text-4xl font-bold text-slate-900">
//             Forgot your password?
//           </h2>

//           <p className="mt-4 text-lg leading-8 text-slate-500">
//             Enter your email address or matric number below and we'll send you
//             instructions to reset your password.
//           </p>
//         </div>

//         <Form className="space-y-6">
//           <AuthToggle
//             value={method}
//             onChange={setMethod}
//             options={[
//               {
//                 label: "Email Address",
//                 value: "email",
//                 icon: Mail,
//               },
//               {
//                 label: "Matric Number",
//                 value: "matric",
//                 icon: IdCard,
//               },
//             ]}
//           />

//           <Input
//             label={method === "email" ? "Email Address" : "Matric Number"}
//             leftIcon={method === "email" ? Mail : IdCard}
//             placeholder={
//               method === "email"
//                 ? "Enter your email address"
//                 : "Enter your matric number"
//             }
//           />

//           <Button fullWidth size="lg">
//             <Send size={18} />
//             Send Reset Link
//           </Button>

//           <Divider />

//           <Button variant="outline" fullWidth>
//             <ArrowLeft size={18} />
//             Back to Login
//           </Button>

//           <p className="text-center text-slate-600">
//             Remember your password? <AuthLink to="/login">Login here</AuthLink>
//           </p>
//         </Form>
//       </div>
//     </AuthLayout>
//   );
// }

// export default ForgotPassword;

import { useState } from "react";
import { Lock, Mail, IdCard, Send, ArrowLeft } from "lucide-react";
import Form from "../../components/forms/Form";
import AuthToggle from "../../components/auth/AuthToggle";
import Input from "../../components/ui/Input";
import Divider from "../../components/ui/Divider";
import AuthLink from "../../components/auth/AuthLink";
import Button from "../../components/ui/Button";
import AuthLayout from "../../layouts/AuthLayout";
import { forgotPasswordLeftPanel } from "../../constants/authContent";
import { useToast } from "../../context/ToastContext";

function ForgotPassword() {
  const [method, setMethod] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      addToast({
        title: "Validation Error",
        message: `Please enter your ${method === "email" ? "email address" : "matric number"}.`,
        type: "warning",
      });
      return;
    }

    setSubmitting(true);

    // Simulate API call for password reset request
    setTimeout(() => {
      setSubmitting(false);
      addToast({
        title: "Reset Link Sent",
        message: `If an account matches that ${method}, a reset link has been sent.`,
        type: "success",
      });
      setInputValue("");
    }, 1500);
  };

  return (
    <AuthLayout leftPanel={forgotPasswordLeftPanel}>
      <div className="space-y-8">
        {/* Lock Icon */}
        <div className="flex justify-center">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-blue-50">
            <Lock size={42} className="text-blue-600" />
            <span className="absolute -right-1 top-3 h-3 w-3 rounded-full bg-blue-400" />
            <span className="absolute left-0 top-1/2 h-3 w-3 rounded-full bg-blue-300" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Forgot your password?
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-500">
            Enter your email address or matric number below and we'll send you
            instructions to reset your password.
          </p>
        </div>

        <Form className="space-y-6" onSubmit={handleSubmit}>
          <AuthToggle
            value={method}
            onChange={(val) => {
              setMethod(val);
              setInputValue("");
            }}
            options={[
              {
                label: "Email Address",
                value: "email",
                icon: Mail,
              },
              {
                label: "Matric Number",
                value: "matric",
                icon: IdCard,
              },
            ]}
          />

          <Input
            label={method === "email" ? "Email Address" : "Matric Number"}
            leftIcon={method === "email" ? Mail : IdCard}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              method === "email"
                ? "Enter your email address"
                : "Enter your matric number"
            }
          />

          <Button type="submit" fullWidth size="lg" loading={submitting}>
            <Send size={18} />
            Send Reset Link
          </Button>

          <Divider />

          <Button variant="outline" fullWidth>
            <ArrowLeft size={18} />
            Back to Login
          </Button>

          <p className="text-center text-slate-600">
            Remember your password? <AuthLink to="/login">Login here</AuthLink>
          </p>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
