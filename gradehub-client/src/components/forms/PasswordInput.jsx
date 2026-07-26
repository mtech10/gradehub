import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Input from "../ui/Input";

function PasswordInput({
  label = "Password",
  placeholder = "Enter your password",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      type={showPassword ? "text" : "password"}
      label={label}
      placeholder={placeholder}
      leftIcon={Lock}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
      {...props}
    />
  );
}

export default PasswordInput;
