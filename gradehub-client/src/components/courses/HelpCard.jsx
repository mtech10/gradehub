import { HelpCircle } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

function HelpCard() {
  return (
    <Card padding="lg">
      <h3 className="text-lg font-semibold text-slate-900 mb-2">Need Help?</h3>

      <p className="text-sm leading-6 text-slate-600 mb-6">
        If you have questions about your courses or registration, visit the help
        center.
      </p>

      <Button variant="outline" fullWidth className="justify-center">
        <HelpCircle size={18} className="text-blue-600" />
        <span className="text-blue-600 font-medium">Visit Help Center</span>
      </Button>
    </Card>
  );
}

export default HelpCard;
