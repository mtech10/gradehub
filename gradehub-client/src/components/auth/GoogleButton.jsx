import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";

function GoogleButton() {
  return (
    <Button variant="outline" fullWidth type="button" className="h-14">
      <span className="flex items-center justify-center gap-3">
        <FcGoogle size={22} />
        Continue with Google
      </span>
    </Button>
  );
}

export default GoogleButton;
